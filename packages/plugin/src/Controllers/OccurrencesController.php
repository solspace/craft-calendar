<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\ElementContainerFieldInterface;
use craft\base\FieldLayoutElement;
use craft\errors\InvalidElementException;
use craft\fieldlayoutelements\BaseUiElement;
use craft\fieldlayoutelements\CustomField;
use craft\fieldlayoutelements\TitleField;
use craft\helpers\DateTimeHelper;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Resources\Bundles\OccurrenceEditorBundle;
use Solspace\Calendar\Services\OccurrencesService;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

/**
 * Edits single occurrences in the control panel: the occurrence slideout, and the
 * list of edited occurrences in the event editor.
 *
 * The event can be a draft, in which case changes are saved into that draft.
 */
class OccurrencesController extends BaseController
{
    public function beforeAction($action): bool
    {
        $this->requireCpRequest();

        return parent::beforeAction($action);
    }

    public function actionEdit(): Response
    {
        [$event, $recurrenceId] = $this->requireOccurrence();
        $service = $this->getOccurrencesService();

        $override = $service->getOverride($event, $recurrenceId);
        if ($override && $event->getIsDraft() && $this->hasOverriddenNestedElements($override)) {
            // Nested entries are saved as soon as they're edited, so a draft needs its own copy first
            $override = $service->forOwner($override, $event);
        }

        $occurrence = $service->describeOccurrence($event, $recurrenceId, $override);

        return $this->asCpScreen()
            ->title(Calendar::t('{event} on {date}', [
                'event' => $override?->isFieldOverridden(OccurrenceOverride::TITLE) ? $override->title : $event->title,
                'date' => DateHelper::formatFloating($occurrence['startDate'], $occurrence['allDay']),
            ]))
            ->action('calendar/occurrences/save')
            ->tabs($this->tabMenu($event))
            ->contentHtml(fn () => $this->contentHtml($event, $recurrenceId, $override, $occurrence))
        ;
    }

    public function actionSave(): ?Response
    {
        $this->requirePostRequest();

        [$event, $recurrenceId] = $this->requireOccurrence();
        $service = $this->getOccurrencesService();
        $request = \Craft::$app->getRequest();

        $override = $service->getOrCreateOverride($event, $recurrenceId);
        $this->applyContent($override, $event);

        if (!$this->applyTimes($override)) {
            return $this->asFailure(Calendar::t('Couldn’t save the occurrence.'), ['errors' => $override->getErrors()]);
        }

        $override->cancelled = (bool) $request->getBodyParam('cancelled');
        $override->slug = trim((string) $request->getBodyParam('slug')) ?: null;

        try {
            $service->saveOrRemoveOverride($override);
        } catch (InvalidElementException) {
            return $this->asFailure(Calendar::t('Couldn’t save the occurrence.'), ['errors' => $override->getErrors()]);
        }

        return $this->asSuccess(Calendar::t('Occurrence saved.'));
    }

    /**
     * Removes everything an occurrence changes, inside a draft if the event is one.
     */
    public function actionReset(): ?Response
    {
        $this->requirePostRequest();

        [$event, $recurrenceId] = $this->requireOccurrence();

        if (!$this->getOccurrencesService()->resetOverride($event, $recurrenceId)) {
            return $this->asFailure(Calendar::t('Couldn’t reset the occurrence.'));
        }

        return $this->asSuccess(Calendar::t('Occurrence reset.'));
    }

    /**
     * What saving the posted schedule would do to the event's edited occurrences, so the event editor
     * can say which ones would no longer be on the schedule before anything is saved.
     */
    public function actionCheckSchedule(): Response
    {
        $this->requirePostRequest();

        $changed = clone $this->requireEvent();
        $changed->setScheduleFromRequest(\Craft::$app->getRequest()->getBodyParams());

        return $this->asJson($this->getOccurrencesService()->previewSchedule($changed));
    }

    /**
     * The event's overrides, for the event editor. Includes overrides whose date the schedule no longer produces.
     */
    public function actionList(): Response
    {
        $event = $this->requireEvent();
        $service = $this->getOccurrencesService();
        $occurrences = [];

        foreach ($service->getOverrides($event) as $override) {
            $occurrence = $service->describeOccurrence($event, $override->recurrenceId, $override);

            $occurrences[] = [
                'recurrenceId' => $override->recurrenceId->format(RecurrenceId::FORMAT),
                'start' => $occurrence['startDate']->timestamp,
                'end' => $occurrence['endDate']->timestamp,
                'allDay' => $occurrence['allDay'],
                'title' => $override->isFieldOverridden(OccurrenceOverride::TITLE) ? $override->title : $event->title,
                'changes' => $this->describeChanges($override),
                'cancelled' => $override->cancelled,
                'orphaned' => !$service->hasOccurrence($event, $override->recurrenceId),
            ];
        }

        return $this->asJson(['occurrences' => $occurrences]);
    }

    /**
     * @return array{0: Event, 1: string} the event the occurrence is edited for, and the occurrence's recurrence ID
     */
    private function requireOccurrence(): array
    {
        $event = $this->requireEvent();

        $recurrenceId = RecurrenceId::normalize(\Craft::$app->getRequest()->getRequiredParam('recurrenceId'))
            ?? throw new BadRequestHttpException('Invalid recurrence ID.');

        $service = $this->getOccurrencesService();
        if (!$service->getOverride($event, $recurrenceId) && !$service->hasOccurrence($event, $recurrenceId)) {
            throw new NotFoundHttpException(Calendar::t('Occurrence could not be found'));
        }

        return [$event, $recurrenceId];
    }

    /**
     * The event, or draft of it, the request edits occurrences for. Needs the same permissions as editing the event
     * in that site; another user's provisional draft holds their unsaved changes, so only they can edit through it.
     */
    private function requireEvent(): Event
    {
        $request = \Craft::$app->getRequest();
        $user = static::currentUser();
        $siteId = $this->resolveEventSiteId($request->getParam('siteId'));
        $site = \Craft::$app->getSites()->getSiteById($siteId);

        if (\Craft::$app->getIsMultiSite() && !$user?->can("editSite:{$site->uid}")) {
            throw new ForbiddenHttpException('User not authorized to edit content for this site.');
        }

        $event = Event::find()
            ->id((int) $request->getRequiredParam('eventId'))
            ->siteId($siteId)
            ->drafts(null)
            ->provisionalDrafts(null)
            ->status(null)
            ->setAllowedCalendarsOnly(false)
            ->one()
        ;

        if (!$event) {
            throw new NotFoundHttpException(Calendar::t('Event could not be found'));
        }

        $this->getEventsService()->requireEventEditPermissions($event);

        if (
            ($event->isProvisionalDraft && $event->creatorId !== $user?->id)
            || !\Craft::$app->getElements()->canSave($event, $user)
        ) {
            throw new ForbiddenHttpException('User not authorized to save this event.');
        }

        return $event;
    }

    /**
     * @param array{startDate: Carbon, endDate: Carbon, allDay: bool, cancelled: bool} $occurrence
     */
    private function contentHtml(Event $event, string $recurrenceId, ?OccurrenceOverride $override, array $occurrence): string
    {
        $view = \Craft::$app->getView();
        $view->registerAssetBundle(OccurrenceEditorBundle::class);
        $view->registerTranslations('calendar', ['Remove everything this occurrence changes?']);
        $view->registerJsWithVars(
            static fn (string $id) => "new Craft.Calendar.OccurrenceEditor({$id});",
            [$view->namespaceInputId('calendar-occurrence-editor')],
        );

        $meta = $this->metaVariables($event, $recurrenceId, $override, $occurrence);
        $override ??= $this->getOccurrencesService()->createOverride($event, $recurrenceId);

        // Fields the occurrence doesn't override are edited from a copy of the event's value
        $prefilled = $this->getOccurrencesService()->createOverride($event, $recurrenceId);
        $prefilled->title = $event->title;

        $tabs = [];
        foreach ($event->getFieldLayout()?->getTabs() ?? [] as $tab) {
            $rows = [];

            foreach ($tab->getElements() as $layoutElement) {
                if (!$layoutElement->showInForm($event)) {
                    continue;
                }

                if ($layoutElement instanceof BaseUiElement) {
                    $rows[] = ['html' => $layoutElement->formHtml($event)];

                    continue;
                }

                $row = $this->fieldRow($layoutElement, $event, $override, $prefilled);
                if ($row) {
                    $rows[] = $row;
                }
            }

            if ($rows) {
                $tabs[] = ['id' => $tab->getHtmlId(), 'uid' => $tab->uid, 'rows' => $rows];
            }
        }

        return $view->renderTemplate('calendar/occurrences/_edit', [
            'id' => 'calendar-occurrence-editor',
            'meta' => $meta,
            'event' => $event,
            'recurrenceId' => $recurrenceId,
            'tabs' => $tabs,
            'isDraft' => (bool) $event->getIsDraft(),
            'isOrphaned' => !$this->getOccurrencesService()->hasOccurrence($event, $recurrenceId),
        ]);
    }

    /**
     * @return null|array{key: string, overridden: bool, copiedOnSave: bool, ownHtml: string, inheritedHtml: string}
     */
    private function fieldRow(FieldLayoutElement $layoutElement, Event $event, OccurrenceOverride $override, OccurrenceOverride $prefilled): ?array
    {
        $view = \Craft::$app->getView();

        if ($layoutElement instanceof TitleField) {
            $key = OccurrenceOverride::TITLE;
            $nested = false;
        } elseif ($layoutElement instanceof CustomField) {
            $field = $layoutElement->getField();
            $key = $field->handle;
            $nested = $field instanceof ElementContainerFieldInterface;
        } else {
            // Anything else, like the event builder, belongs to the event
            return null;
        }

        $overridden = $override->isFieldOverridden($key);

        if ($overridden) {
            $ownHtml = $layoutElement->formHtml($override);
        } elseif ($nested) {
            // Nested entries need an owner with an ID, so the copies are made once the occurrence is saved
            $ownHtml = $view->renderTemplate('calendar/occurrences/_nested-copy-notice');
        } else {
            if ($layoutElement instanceof CustomField) {
                $layoutElement->getField()->copyValue($event, $prefilled);
            }

            $ownHtml = $layoutElement->formHtml($prefilled);
        }

        return [
            'key' => $key,
            'overridden' => $overridden,
            'copiedOnSave' => $nested && !$overridden,
            'ownHtml' => (string) $ownHtml,
            // Namespaced separately, so its IDs don't clash with the editable copy of the field
            'inheritedHtml' => $view->namespaceInputs(static fn () => (string) $layoutElement->formHtml($event, true), 'inherited'),
        ];
    }

    /**
     * Times, cancellation and slug.
     *
     * @param array{startDate: Carbon, endDate: Carbon, allDay: bool, cancelled: bool} $occurrence
     */
    private function metaVariables(Event $event, string $recurrenceId, ?OccurrenceOverride $override, array $occurrence): array
    {
        $service = $this->getOccurrencesService();
        $series = $service->describeOccurrence($event, $recurrenceId);
        $code = $service->getCode($event, $recurrenceId);

        return [
            'ownTimes' => (bool) $override?->hasOwnTimes(),
            'startDate' => DateHelper::floatingToLocal($occurrence['startDate']),
            'endDate' => DateHelper::floatingToLocal($occurrence['endDate']),
            'allDay' => $occurrence['allDay'],
            'seriesStartDate' => DateHelper::floatingToLocal($series['startDate']),
            'seriesEndDate' => DateHelper::floatingToLocal($series['endDate']),
            'seriesAllDay' => $series['allDay'],
            'cancelled' => (bool) $override?->cancelled,
            'slug' => $override?->hasCustomSlug() ? $override->slug : null,
            'generatedSlug' => $code ? $occurrence['startDate']->format('Y-m-d').'-'.$code : null,
            'code' => $code,
            'canReset' => null !== $override,
        ];
    }

    /**
     * @return array<string, array{label: string, url: string}>
     */
    private function tabMenu(Event $event): array
    {
        $tabs = [];
        foreach ($event->getFieldLayout()?->getTabs() ?? [] as $tab) {
            $tabs[$tab->getHtmlId()] = [
                'label' => \Craft::t('site', (string) $tab->name),
                'url' => '#'.$tab->getHtmlId(),
            ];
        }

        return $tabs;
    }

    /**
     * Only fields the slideout shows as editable can be overridden or inherited, like in the event editor.
     */
    private function applyContent(OccurrenceOverride $override, Event $event): void
    {
        $request = \Craft::$app->getRequest();
        $toggles = (array) $request->getBodyParam('overrides', []);
        $values = (array) $request->getBodyParam('fields', []);
        $editable = $this->getEditableKeys($event);

        foreach ($toggles as $key => $on) {
            $key = (string) $key;
            if (!isset($editable[$key])) {
                continue;
            }

            if (!$on) {
                if ($this->isOverridden($override, $key)) {
                    $override->inheritField($key);
                }

                continue;
            }

            if (OccurrenceOverride::TITLE === $key) {
                $override->overrideField($key, (string) $request->getBodyParam('title'));

                continue;
            }

            $field = $override->getFieldLayout()?->getFieldByHandle($key);
            if (!$field) {
                continue;
            }

            if (\array_key_exists($key, $values)) {
                $override->setFieldValueFromRequest($key, $values[$key]);
                $override->overrideField($key, $override->getFieldValue($key));
            } elseif (!$override->isFieldOverridden($key)) {
                $override->overrideFieldWithSeriesValue($key);
            }
        }
    }

    /**
     * @return bool whether the posted times could be read
     */
    private function applyTimes(OccurrenceOverride $override): bool
    {
        $request = \Craft::$app->getRequest();

        if (!$request->getBodyParam('ownTimes')) {
            $override->inheritTimes();

            return true;
        }

        $startDate = $this->fromFormDate($request->getBodyParam('startDate'));
        $endDate = $this->fromFormDate($request->getBodyParam('endDate'));

        if (!$startDate || !$endDate) {
            $override->addError($startDate ? 'endDate' : 'startDate', Calendar::t('An occurrence needs both a start and an end date.'));

            return false;
        }

        $override->reschedule($startDate, $endDate, (bool) $request->getBodyParam('allDay'));

        return true;
    }

    /**
     * `title` and the handles of the custom fields the event's layout shows the user as editable.
     *
     * @return array<string, true>
     */
    private function getEditableKeys(Event $event): array
    {
        $layout = $event->getFieldLayout();
        $keys = [];

        if ($layout?->getFirstVisibleElementByType(TitleField::class, $event)) {
            $keys[OccurrenceOverride::TITLE] = true;
        }

        foreach ($layout?->getEditableCustomFields($event) ?? [] as $field) {
            $keys[$field->handle] = true;
        }

        return $keys;
    }

    private function hasOverriddenNestedElements(OccurrenceOverride $override): bool
    {
        foreach ($override->getOverriddenFieldHandles() as $handle) {
            if ($override->getFieldLayout()?->getFieldByHandle($handle) instanceof ElementContainerFieldInterface) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return string[] labels of what the occurrence changes
     */
    private function describeChanges(OccurrenceOverride $override): array
    {
        $changes = [];
        $layout = $override->getFieldLayout();

        foreach ($override->getOverriddenFieldHandles() as $handle) {
            $field = $layout?->getFieldByHandle($handle);
            $changes[] = OccurrenceOverride::TITLE === $handle
                ? \Craft::t('app', 'Title')
                : ($field?->layoutElement?->label() ?? $field?->name ?? $handle);
        }

        if ($override->hasOwnTimes()) {
            $changes[] = Calendar::t('Date/Time');
        }

        if ($override->hasCustomSlug()) {
            $changes[] = \Craft::t('app', 'Slug');
        }

        return $changes;
    }

    private function isOverridden(OccurrenceOverride $override, string $key): bool
    {
        if (OccurrenceOverride::TITLE !== $key && !$override->getFieldLayout()?->getFieldByHandle($key)) {
            return false;
        }

        return $override->isFieldOverridden($key);
    }

    /**
     * Occurrence times are floating, so date inputs show and post the same wall-clock time in the CP's timezone.
     */
    private function fromFormDate(mixed $value): ?Carbon
    {
        // Without a posted timezone, Craft would read the date and time as UTC
        $date = DateTimeHelper::toDateTime($value, true);

        return $date ? DateHelper::parseFloatingCarbon($date) : null;
    }

    private function getOccurrencesService(): OccurrencesService
    {
        return Calendar::getInstance()->occurrences;
    }
}
