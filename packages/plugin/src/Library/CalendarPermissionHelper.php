<?php
/**
 * Created by PhpStorm.
 * User: gustavs
 * Date: 18.12.2
 * Time: 11:51.
 */

namespace Solspace\Calendar\Library;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Commons\Helpers\PermissionHelper;
use yii\web\HttpException;

class CalendarPermissionHelper extends PermissionHelper
{
    /**
     * @throws HttpException
     */
    public static function requireCalendarEditPermissions(CalendarModel $calendar)
    {
        if (!self::canEditCalendar($calendar)) {
            throw new HttpException(403);
        }
    }

    /**
     * @param CalendarModel $calendar
     */
    public static function canEditCalendar(CalendarModel $calendar = null): bool
    {
        $canManageAll = self::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

        if ($canManageAll) {
            return true;
        }

        if (null === $calendar) {
            return false;
        }

        return self::checkPermission(
            self::prepareNestedPermission(
                Calendar::PERMISSION_EVENTS_FOR,
                $calendar->uid
            )
        );
    }

    /**
     * @return bool
     */
    public static function canEditEvent(Event $event)
    {
        $canEditCalendar = self::canEditCalendar($event->getCalendar());

        if (self::isAdmin() || !Calendar::getInstance()->settings->isAuthoredEventEditOnly()) {
            return $canEditCalendar;
        }

        return $canEditCalendar && (int) $event->authorId === (int) \Craft::$app->getUser()->id;
    }
}
