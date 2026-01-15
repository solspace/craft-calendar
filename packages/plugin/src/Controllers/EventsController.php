<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use craft\db\Query;
use craft\db\Table;
use craft\elements\User;
use craft\errors\SiteNotFoundException;
use craft\events\ElementEvent;
use craft\helpers\Cp;
use craft\helpers\DateTimeHelper;
use craft\helpers\ElementHelper;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Exceptions\EventException;
use Solspace\Calendar\Library\Helpers\CpHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\SitesHelper;
use Solspace\Calendar\Library\Transformers\EventToUiDataTransformer;
use Solspace\Calendar\Library\Transformers\UiDataToEventTransformer;
use Solspace\Calendar\Resources\Bundles\EventEditBundle;
use Solspace\Calendar\Resources\Bundles\EventIndexBundle;
use yii\base\InvalidConfigException;
use yii\db\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

class EventsController extends BaseController
{
    public const EVENT_FIELD_NAME = 'calendarEvent';
    public const EVENT_PREVIEW_EVENT = 'previewEvent';

    protected array|bool|int $allowAnonymous = ['save-event', 'view-shared-event'];

    public function actionEventsIndex(): Response
    {
        $this->requireEventPermission();

        \Craft::$app->view->registerAssetBundle(EventIndexBundle::class);

        $isCraft5 = version_compare(\Craft::$app->getVersion(), '5.0.0', '>=');

        $crumbs = [
            [
                'label' => Calendar::t(Calendar::getInstance()->name),
                'url' => UrlHelper::cpUrl('calendar'),
            ],
            [
                'label' => Calendar::t('Events'),
                'url' => UrlHelper::cpUrl('calendar/events'),
                'current' => true,
            ],
        ];

        return $this->renderTemplate(
            'calendar/events',
            [
                'isCraft5' => $isCraft5,
                'crumbs' => $crumbs,
                'calendars' => Calendar::getInstance()->calendars->getAllAllowedCalendars(),
                'elementType' => Event::class,
            ]
        );
    }

    /**
     * @throws HttpException
     * @throws SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws InvalidConfigException
     */
    public function actionCreateEvent(?string $handle = null): Response
    {
        $request = \Craft::$app->getRequest();
        $siteId = (int) $request->getParam('siteId');
        $siteHandle = (string) $request->getParam('site');

        $site = $siteId ? \Craft::$app->sites->getSiteById($siteId) : null;
        if (!$site && $siteHandle) {
            $site = \Craft::$app->sites->getSiteByHandle($siteHandle);
        }

        $site ??= \Craft::$app->sites->currentSite;

        if ($handle) {
            $calendar = $this->getCalendarService()->getCalendarByHandle($handle);
            if (!$calendar) {
                throw new HttpException(
                    404,
                    Calendar::t('Calendar with a handle "{handle}" could not be found', ['handle' => $handle])
                );
            }
        } else {
            $calendar = $this->getCalendarService()->getCalendarById(
                $this->getCalendarService()->getFirstCalendarId()
            );
        }

        if (!$calendar) {
            throw new HttpException(404, Calendar::t('No calendars are available.'));
        }

        PermissionHelper::requireCalendarEditPermissions($calendar);

        $locale = $site->language;
        $locale = str_replace('_', '-', strtolower($locale));
        EventEditBundle::$locale = $locale;

        $event = Event::create($site->id, $calendar->id);
        $event->setScenario(Element::SCENARIO_ESSENTIALS);
        $success = \Craft::$app->getDrafts()->saveElementAsDraft(
            $event,
            \Craft::$app->getUser()->getIdentity()->id,
            markAsSaved: false
        );

        if (!$success) {
            throw new ServerErrorHttpException(Calendar::t('Couldn’t create event.'));
        }

        $editUrl = $event->getCpEditUrl();

        return $this->redirect(UrlHelper::urlWithParams($editUrl, ['fresh' => 1]));
    }

    /**
     * Triggers a 404 if there are no event edit permissions for the current user.
     */
    private function requireEventPermission(): void
    {
        $hasPermission = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true);

        if (!$hasPermission) {
            PermissionHelper::requirePermission('trigger-calendar-event-access-denied');
        }
    }
}
