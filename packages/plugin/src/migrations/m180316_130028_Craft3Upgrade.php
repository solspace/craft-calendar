<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use Solspace\Calendar\FieldTypes\EventFieldType;
use Solspace\Calendar\Library\Migrations\ForeignKey;
use Solspace\Calendar\Library\Migrations\Table;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;

/**
 * m180316_130028_Craft3Upgrade migration.
 */
class m180316_130028_Craft3Upgrade extends Migration
{
    public function safeUp(): bool
    {
        $calendar = (new Query())
            ->select(['id', 'version'])
            ->from(\craft\db\Table::PLUGINS)
            ->where([
                'handle' => 'calendar',
            ])
            ->one()
        ;

        if (!$calendar) {
            return true;
        }

        $version = $calendar['version'];

        // Only touch version below the 2.0
        if (version_compare($version, '2.0.0-dev', '>=')) {
            return true;
        }

        $this->update(
            \craft\db\Table::FIELDS,
            ['type' => EventFieldType::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $calTable = CalendarRecord::tableName();
        $calSitesTable = CalendarSiteSettingsRecord::tableName();

        $table = (new Table($calSitesTable))
            ->addField('id', $this->primaryKey())
            ->addField('calendarId', $this->integer())
            ->addField('siteId', $this->integer())
            ->addField('enabledByDefault', $this->boolean()->defaultValue(true))
            ->addField('hasUrls', $this->boolean()->defaultValue(false))
            ->addField('uriFormat', $this->string())
            ->addField('template', $this->string())
            ->addForeignKey('siteId', \craft\db\Table::SITES, 'id', ForeignKey::CASCADE)
            ->addForeignKey('calendarId', $calTable, 'id', ForeignKey::CASCADE)
            ->addIndex(['calendarId', 'siteId'], true)
            ->addField('dateCreated', $this->dateTime()->notNull())
            ->addField('dateUpdated', $this->dateTime()->notNull())
            ->addField('uid', $this->uid())
        ;

        $this->createTable($table->getDatabaseName(), $table->getFieldArray(), $table->getOptions());

        foreach ($table->getIndexes() as $index) {
            $this->createIndex(
                $index->getName(),
                $table->getDatabaseName(),
                $index->getColumns(),
                $index->isUnique()
            );
        }

        foreach ($table->getForeignKeys() as $foreignKey) {
            $this->addForeignKey(
                $foreignKey->getName(),
                $table->getDatabaseName(),
                $foreignKey->getColumn(),
                $foreignKey->getDatabaseReferenceTableName(),
                $foreignKey->getReferenceColumn(),
                $foreignKey->getOnDelete(),
                $foreignKey->getOnUpdate()
            );
        }

        $calI18nTable = '{{%calendar_calendars_i18n}}';
        $i18nResults = (new Query())
            ->select(
                [
                    $calI18nTable.'.[[id]]',
                    $calI18nTable.'.[[calendarId]]',
                    $calI18nTable.'.[[locale__siteId]]',
                    $calI18nTable.'.[[enabledByDefault]]',
                    $calI18nTable.'.[[eventUrlFormat]]',
                    $calTable.'.[[hasUrls]]',
                    $calTable.'.[[eventTemplate]]',
                ]
            )
            ->from($calI18nTable)
            ->innerJoin($calTable, $calTable.'.[[id]] = {{%calendar_calendars_i18n}}.[[calendarId]]')
            ->all()
        ;

        foreach ($i18nResults as $i18n) {
            $this->insert(
                $calSitesTable,
                [
                    'calendarId' => $i18n['calendarId'],
                    'siteId' => $i18n['locale__siteId'],
                    'enabledByDefault' => $i18n['enabledByDefault'],
                    'hasUrls' => $i18n['hasUrls'],
                    'uriFormat' => $i18n['eventUrlFormat'],
                    'template' => $i18n['eventTemplate'],
                ]
            );
        }

        $this->dropTable($calI18nTable);

        $this->dropColumn($calTable, 'hasUrls');
        $this->dropColumn($calTable, 'eventTemplate');

        return true;
    }

    public function safeDown(): bool
    {
        return true;
    }
}
