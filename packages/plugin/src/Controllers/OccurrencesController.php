<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\ElementContainerFieldInterface;
use craft\base\FieldLayoutElement;
use craft\fieldlayoutelements\BaseUiElement;
use craft\fieldlayoutelements\CustomField;
use craft\fieldlayoutelements\TitleField;
use craft\helpers\DateTimeHelper;
use craft\i18n\Locale;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Resources\Bundles\OccurrenceEditorBundle;
use Solspace\Calendar\Services\OccurrencesService;
use yii\web\BadRequestHttpException;
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

        $override = $this->getOccurrencesService()->getOverride($event, $recurrenceId);
        $occurrence = $this->getOccurrencesService()->describeOccurrence($event, $recurrenceId, $override);

        return $this->asCpScreen()
            ->title(Calendar::t('{event} on {date}', [
                'event' => $override?->isFieldOverridden(OccurrenceOverride::TITLE) ? $override->title : $event->title,
                'date' => $this->formatDate($occurrence['startDate'], $occurrence['allDay']),
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

        if ($request->getBodyParam('reset')) {
            if (!$service->resetOverride($event, $recurrenceId)) {
                return $this->asFailure(Calendar::t('Couldn’t reset the occurrence.'));
            }

            return $this->asSuccess(Calendar::t('Occurrence reset.'));
        }

        $override = $service->getOrCreateOverride($event, $recurrenceId);
        $this->applyContent($override);

        if (!$this->applyTimes($override)) {
            return $this->asFailure(Calendar::t('Couldn’t save the occurrence.'), ['errors' => $override->getErrors()]);
        }

        $override->cancelled = (bool) $request->getBodyParam('cancelled');
        $override->slug = trim((string) $request->getBodyParam('slug')) ?: null;

        // Nothing left that differs from the event
        if (!$override->hasChanges()) {
            if ($override->id && !$service->resetOverride($event, $recurrenceId)) {
                return $this->asFailure(Calendar::t('Couldn’t save the occurrence.'));
            }

            return $this->asSuccess(Calendar::t('Occurrence saved.'));
        }

        if (!$service->saveOverride($override)) {
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
                'title' => $override->isFieldOverridden(OccurrenceOverride::TITLE) ? $override->title : null,
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

    private function requireEvent(): Event
    {
        $request = \Craft::$app->getRequest();
        $siteId = $this->resolveEventSiteId($request->getParam('siteId'));

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
        $override ??= $this->createOverride($event, $recurrenceId);

        // Fields the occurrence doesn't override are edited from a copy of the event's value
        $prefilled = $this->createOverride($event, $recurrenceId);
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
            'startDate' => $this->toFormDate($occurrence['startDate']),
            'endDate' => $this->toFormDate($occurrence['endDate']),
            'allDay' => $occurrence['allDay'],
            'seriesTimes' => $this->formatRange($series['startDate'], $series['endDate'], $series['allDay']),
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

    private function applyContent(OccurrenceOverride $override): void
    {
        $request = \Craft::$app->getRequest();
        $toggles = (array) $request->getBodyParam('overrides', []);
        $values = (array) $request->getBodyParam('fields', []);

        foreach ($toggles as $key => $on) {
            $key = (string) $key;

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
            $changes[] = Calendar::t('Date and time');
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
     * An unsaved override, only used for rendering. Saving goes through OccurrencesService::getOrCreateOverride().
     */
    private function createOverride(Event $event, string $recurrenceId): OccurrenceOverride
    {
        $override = new OccurrenceOverride();
        $override->siteId = $event->siteId;
        $override->recurrenceId = RecurrenceId::toCarbon($recurrenceId);
        $override->fieldLayoutId = $event->getFieldLayout()?->id;
        $override->setPrimaryOwner($event);
        $override->setOwner($event);

        return $override;
    }

    /**
     * Occurrence times are floating, so date inputs get the same wall-clock time in the CP's timezone.
     */
    private function toFormDate(Carbon $date): \DateTime
    {
        return new \DateTime($date->format('Y-m-d H:i:s'), new \DateTimeZone(\Craft::$app->getTimeZone()));
    }

    private function fromFormDate(mixed $value): ?Carbon
    {
        // Without a posted timezone, Craft would read the date and time as UTC
        $date = DateTimeHelper::toDateTime($value, true);

        return $date ? new Carbon($date->format('Y-m-d H:i:s'), DateHelper::UTC) : null;
    }

    private function formatDate(Carbon $date, bool $allDay): string
    {
        $formatter = \Craft::$app->getFormatter();

        return $allDay
            ? $formatter->asDate($this->toFormDate($date), Locale::LENGTH_MEDIUM)
            : $formatter->asDatetime($this->toFormDate($date), Locale::LENGTH_SHORT);
    }

    private function formatRange(Carbon $startDate, Carbon $endDate, bool $allDay): string
    {
        if ($startDate->isSameDay($endDate)) {
            return $allDay
                ? $this->formatDate($startDate, true)
                : $this->formatDate($startDate, false).' – '.\Craft::$app->getFormatter()->asTime($this->toFormDate($endDate), Locale::LENGTH_SHORT);
        }

        return $this->formatDate($startDate, $allDay).' – '.$this->formatDate($endDate, $allDay);
    }

    private function getOccurrencesService(): OccurrencesService
    {
        return Calendar::getInstance()->occurrences;
    }
}
