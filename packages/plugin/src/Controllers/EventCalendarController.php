<?php

namespace Solspace\Calendar\Controllers;

use craft\errors\InvalidElementException;
use craft\helpers\Json;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Events\CalendarFieldMapper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Resources\Bundles\EventEditBundle;
use Solspace\Calendar\Services\EventCalendarTransfer;
use yii\base\InvalidArgumentException;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class EventCalendarController extends BaseController
{
    public function beforeAction($action): bool
    {
        $this->requireLogin();
        $this->requireCpRequest();

        return parent::beforeAction($action);
    }

    public function actionEdit(): Response
    {
        [$event, $target] = $this->resolveTransfer();
        $mapper = new CalendarFieldMapper();
        $source = $mapper->fields($event->getFieldLayout());
        $destinations = $mapper->fields($target->getFieldLayout());
        $suggested = $mapper->suggest($event->getFieldLayout(), $target->getFieldLayout());
        $rows = [];
        foreach ($destinations as $uid => $field) {
            $options = [['label' => Calendar::t('Do not map'), 'value' => '']];
            foreach ($source as $sourceUid => $sourceField) {
                if ($mapper->compatible($sourceField, $field)) {
                    $options[] = ['label' => $mapper->label($sourceField).' ('.$sourceField->handle.')', 'value' => $sourceUid];
                }
            }
            $rows[] = [
                'uid' => $uid,
                'label' => $mapper->label($field),
                'handle' => $field->handle,
                'type' => $field::displayName(),
                'required' => (bool) $field->layoutElement->required,
                'options' => $options,
                'value' => $suggested[$uid] ?? '',
            ];
        }
        $populated = [];
        // Include data from other sites and customized occurrences in the loss warning.
        foreach (Event::find()->id($event->id)->siteId('*')->drafts(null)->provisionalDrafts(null)->status(null)->setAllowedCalendarsOnly(false)->all() as $localized) {
            foreach ($source as $uid => $field) {
                if (!$field->isValueEmpty($localized->getFieldValue($field->handle), $localized)) {
                    $populated[$uid] = $mapper->label($field).' ('.$field->handle.')';
                }
            }
            foreach (Calendar::getInstance()->occurrences->getOverrides($localized) as $override) {
                foreach ($source as $uid => $field) {
                    if ($override->isFieldOverridden($field->handle)) {
                        $populated[$uid] = $mapper->label($field).' ('.$field->handle.')';
                    }
                }
            }
        }

        $blockers = (new EventCalendarTransfer())->blockers($event, $target);
        $view = \Craft::$app->getView();
        $view->registerAssetBundle(EventEditBundle::class);
        $view->registerTranslations('calendar', ['Each source field can only be mapped once.']);

        return $this->asCpScreen()
            ->title(Calendar::t('Change calendar'))
            ->action($blockers ? null : 'calendar/event-calendar/save')
            ->submitButtonLabel(Calendar::t('Change calendar'))
            ->contentTemplate('calendar/event-calendar/_edit', [
                'event' => $event,
                'target' => $target,
                'rows' => $rows,
                'populated' => $populated,
                'blockers' => $blockers,
                'reviewToken' => $this->reviewToken($event, $target),
            ])
        ;
    }

    public function actionSave(): ?Response
    {
        $this->requirePostRequest();
        [$event, $target] = $this->resolveTransfer();
        $request = \Craft::$app->getRequest();
        if (!hash_equals($this->reviewToken($event, $target), (string) $request->getBodyParam('reviewToken'))) {
            return $this->asFailure(Calendar::t('The event or field layouts changed. Close this panel and review the mapping again.'));
        }
        if (!$request->getBodyParam('confirmTransfer')) {
            return $this->asFailure(Calendar::t('Confirm that you have reviewed the field mapping.'));
        }

        try {
            (new EventCalendarTransfer())->transfer($event, $target, (array) $request->getBodyParam('mapping', []));
        } catch (InvalidArgumentException $exception) {
            return $this->asFailure(Calendar::t($exception->getMessage()));
        } catch (InvalidElementException $exception) {
            return $this->asFailure(Calendar::t('Couldn’t change the calendar.'), ['errors' => $exception->element->getErrors()]);
        }

        return $this->asSuccess(Calendar::t('Calendar changed in the draft.'), ['url' => $event->getCpEditUrl()]);
    }

    private function resolveTransfer(): array
    {
        $request = \Craft::$app->getRequest();
        $user = static::currentUser();
        $siteId = $this->resolveEventSiteId($request->getParam('siteId'));
        $event = Event::find()->id((int) $request->getRequiredParam('eventId'))->siteId($siteId)
            ->drafts(null)->provisionalDrafts(null)->status(null)->setAllowedCalendarsOnly(false)->one()
        ;
        if (!$event) {
            throw new NotFoundHttpException(Calendar::t('Event could not be found'));
        }
        if (!$event->getIsDraft() || $event->getIsRevision()) {
            throw new BadRequestHttpException('Save the pending changes in a draft before changing calendars.');
        }
        $this->getEventsService()->requireEventEditPermissions($event);
        if (($event->isProvisionalDraft && $event->creatorId !== $user->id) || !\Craft::$app->getElements()->canSave($event, $user)) {
            throw new ForbiddenHttpException('User not authorized to save this event.');
        }
        $target = $this->resolveEventCalendar($request->getRequiredParam('targetCalendarId'), $siteId);
        if (!PermissionHelper::canEditCalendar($target)) {
            throw new ForbiddenHttpException('User not authorized to edit events in the destination calendar.');
        }
        if ($event->calendarId === $target->id) {
            throw new BadRequestHttpException('The event already belongs to this calendar.');
        }
        foreach ($event->getCalendar()->getSiteSettings() as $settings) {
            $site = \Craft::$app->getSites()->getSiteById($settings->siteId);
            if (\Craft::$app->getIsMultiSite() && !$user->can("editSite:{$site->uid}")) {
                throw new ForbiddenHttpException('User not authorized to edit content for every site this event uses.');
            }
        }

        return [$event, $target];
    }

    private function reviewToken(Event $event, CalendarModel $target): string
    {
        $value = Json::encode([
            $event->id, $event->calendarId, $target->id, $event->dateUpdated?->format('U.u'),
            $event->getFieldLayout()?->getConfig(), $target->getFieldLayout()?->getConfig(),
            array_map(static fn ($field) => [$field::class, $field->getSettings()], $event->getFieldLayout()?->getCustomFields() ?? []),
            array_map(static fn ($field) => [$field::class, $field->getSettings()], $target->getFieldLayout()?->getCustomFields() ?? []),
        ]);

        return \Craft::$app->getSecurity()->hashData(hash('sha256', $value));
    }
}
