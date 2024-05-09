<?php

namespace Solspace\Calendar\Console\Controllers\Fix;

use craft\db\Query;
use craft\migrations\BaseContentRefactorMigration;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;

class TitleFixMigration extends BaseContentRefactorMigration
{
    protected bool $preserveOldData = true;

    public function run(): void
    {
        $calendars = Calendar::getInstance()->calendars->getAllCalendars();
        foreach ($calendars as $calendar) {
            $fieldLayout = $calendar->getFieldLayout();

            // update users
            $this->updateElements(
                (new Query())->from(Event::TABLE),
                $fieldLayout,
            );
        }
    }
}
