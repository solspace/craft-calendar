<?php

namespace Solspace\Calendar\migrations;

use Carbon\Carbon;
use craft\db\Migration;
use craft\db\Query;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\SelectDateRecord;

/**
 * m180628_091905_MigrateSelectDates migration.
 */
class m180628_091905_MigrateSelectDates extends Migration
{
    public function safeUp(): void
    {
        $table = SelectDateRecord::tableName();
        $query = (new Query())
            ->select('*')
            ->from($table)
            ->orderBy(['date' => \SORT_ASC])
            ->all()
        ;

        foreach ($query as $data) {
            $date = $data['date'];
            $carb = new Carbon($date, DateHelper::UTC);
            $carb->setTimezone(date_default_timezone_get());

            $string = $carb->toDateTimeString();

            $this->update(
                $table,
                ['date' => $string],
                ['id' => $data['id']]
            );
        }
    }

    public function safeDown(): bool
    {
        echo "m180628_091905_MigrateSelectDates cannot be reverted.\n";

        return false;
    }
}
