<?php

namespace Solspace\Calendar\Console\Controllers\Fix;

use craft\db\Query;
use craft\helpers\App;
use craft\migrations\BaseContentRefactorMigration;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;

class ContentFixMigration extends BaseContentRefactorMigration
{
    protected bool $preserveOldData = true;

    public function run(): void
    {
        App::maxPowerCaptain();

        $calendars = Calendar::getInstance()->calendars->getAllCalendars();
        foreach ($calendars as $calendar) {
            $fieldLayout = $calendar->getFieldLayout();

            $this->updateElements(
                (new Query())->from(Event::tableName())->where(['calendarId' => $calendar->id]),
                $fieldLayout,
            );
        }
    }
}
