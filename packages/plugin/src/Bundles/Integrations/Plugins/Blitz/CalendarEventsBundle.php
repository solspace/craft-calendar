<?php

namespace Solspace\Calendar\Bundles\Integrations\Plugins\Blitz;

use craft\base\Element;
use craft\console\Application as ConsoleApplication;
use craft\events\ModelEvent;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\ActionEvent;
use yii\base\Event;
use yii\base\Module;

class CalendarEventsBundle implements BundleInterface
{
    public function __construct()
    {
        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_SAVE,
            function (ModelEvent $event) {
                /**
                 * @var CalendarEvent $element
                 */
                $element = $event->sender;

                if (!$this->isBlitzAvailable()) {
                    return;
                }

                $this->purgeCalendarEventForBlitz($element);
            }
        );

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_RESTORE,
            function (Event $event) {
                /**
                 * @var CalendarEvent $element
                 */
                $element = $event->sender;

                if (!$this->isBlitzAvailable()) {
                    return;
                }

                $this->purgeCalendarEventForBlitz($element);
            }
        );

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_DELETE,
            function (Event $event) {
                /**
                 * @var CalendarEvent $element
                 */
                $element = $event->sender;

                if (!$this->isBlitzAvailable()) {
                    return;
                }

                $this->purgeCalendarEventForBlitz($element);
            }
        );

        // Hook refresh-expired to queue all expired events.
        if (\Craft::$app->getRequest()->getIsConsoleRequest()) {
            Event::on(
                ConsoleApplication::class,
                Module::EVENT_AFTER_ACTION,
                function (ActionEvent $event) {
                    if ($event->action && 'blitz/cache/refresh-expired' === $event->action->uniqueId) {
                        $this->queueExpiredCalendarEventsForBlitz();
                    }
                }
            );
        }
    }

    private function isBlitzAvailable(): bool
    {
        $plugins = \Craft::$app->getPlugins();
        $blitzInfo = $plugins->getStoredPluginInfo('blitz');

        return $plugins->isPluginInstalled('blitz')
            && $plugins->isPluginEnabled('blitz')
            && $blitzInfo
            && !empty($info['enabled'])
            && !empty($info['settings'])
            && !empty($info['settings']['cachingEnabled'])
            && class_exists('putyourlightson\blitz\Blitz', false); // don't autoload
    }

    private function purgeCalendarEventForBlitz(CalendarEvent $element): void
    {
        $tags = [
            'calendar',
            'calendar:'.$element->calendarId,
            'calendar:event:'.$element->id,
        ];

        $blitzClass = 'putyourlightson\blitz\Blitz';
        $blitzClass::$plugin->refreshCache->addElement($element);
        $blitzClass::$plugin->refreshCache->refreshCacheTags($tags);
        $blitzClass::$plugin->refreshCache->refresh();
    }

    private function queueExpiredCalendarEventsForBlitz(): void
    {
        $timezone = \Craft::$app->getTimeZone() ?: 'UTC';
        $now = (new \DateTime('now', new \DateTimeZone($timezone)))->format('Y-m-d H:i:s');

        $query = CalendarEvent::find()->site('*')->status(null)->limit(null);

        if (method_exists($query, 'endsBeforeOrAt')) {
            $query->endsBeforeOrAt($now);
        } else {
            $query->andWhere(['<=', 'calendar_events.endDate', $now]); // alias
        }

        $ids = array_values(array_unique($query->ids()));
        if (!$ids) {
            return;
        }

        $blitzClass = 'putyourlightson\blitz\Blitz';

        $primarySiteId = \Craft::$app->sites->getPrimarySite()->id;

        foreach ($ids as $id) {
            $event = CalendarEvent::find()->id($id)->siteId($primarySiteId)->status(null)->one();
            if ($event) {
                $tags = [
                    'calendar',
                    'calendar:'.$event->calendarId,
                    'calendar:event:'.$event->id,
                ];

                $blitzClass::$plugin->refreshCache->addElement($event);
                $blitzClass::$plugin->refreshCache->refreshCacheTags($tags);
            }
        }

        $blitzClass::$plugin->refreshCache->refresh();
    }
}
