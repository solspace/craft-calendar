<?php

namespace Solspace\Calendar\Elements\Db;

use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use Solspace\Calendar\Calendar;

class BookingQuery extends ElementQuery
{
    public mixed $calendarId = null;
    public mixed $bookingStatus = null;

    public function init(): void
    {
        parent::init();
        $this->siteId = \Craft::$app->getSites()->getPrimarySite()->id;
    }

    public function calendarId(mixed $value): static
    {
        $this->calendarId = $value;

        return $this;
    }

    public function bookingStatus(mixed $value): static
    {
        $this->bookingStatus = $value;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        $this->joinElementTable('calendar_bookings');
        $request = \Craft::$app->getRequest();
        if (!$request->getIsConsoleRequest() && $request->getIsCpRequest()) {
            $ids = array_keys(Calendar::getInstance()->bookings->getManageableCalendars());
            if (!$ids) {
                return false;
            }
            $this->subQuery->andWhere(['calendar_bookings.calendarId' => $ids]);
        }
        $this->query->addSelect(['calendar_bookings.calendarId', 'calendar_bookings.startDate', 'calendar_bookings.endDate', 'calendar_bookings.customerName', 'calendar_bookings.customerEmail', 'calendar_bookings.notes', 'calendar_bookings.bookingStatus', 'calendar_bookings.buffer']);
        $this->query->addSelect(['calendar_bookings.statusChangedAt', 'calendar_bookings.statusChangedById', 'calendar_bookings.statusChangedByName', 'calendar_bookings.statusChangeSource']);
        foreach (['calendarId', 'bookingStatus'] as $key) {
            if (null !== $this->{$key}) {
                $this->subQuery->andWhere(Db::parseParam('calendar_bookings.'.$key, $this->{$key}));
            }
        }

        return parent::beforePrepare();
    }
}
