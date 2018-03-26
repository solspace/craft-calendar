<?php

namespace Solspace\Calendar\migrations;

use Solspace\Commons\Migrations\ForeignKey;
use Solspace\Commons\Migrations\StreamlinedInstallMigration;
use Solspace\Commons\Migrations\Table;

/**
 * Install migration.
 */
class Install extends StreamlinedInstallMigration
{
    /**
     * @return array
     */
    protected function defineTableData(): array
    {
        return [
            (new Table('calendar_calendars'))
                ->addField('id', $this->primaryKey())
                ->addField('name', $this->string(100)->notNull())
                ->addField('handle', $this->string(100)->notNull()->unique())
                ->addField('description', $this->text())
                ->addField('color', $this->string(10)->notNull())
                ->addField('fieldLayoutId', $this->integer())
                ->addField('titleFormat', $this->string())
                ->addField('titleLabel', $this->string()->defaultValue('Title'))
                ->addField('hasTitleField', $this->boolean()->notNull()->defaultValue(true))
                ->addField('descriptionFieldHandle', $this->string())
                ->addField('locationFieldHandle', $this->string())
                ->addField('icsHash', $this->string())
                ->addForeignKey('fieldLayoutId', 'fieldlayouts', 'id', ForeignKey::SET_NULL)
                ->addIndex(['name'], true)
                ->addIndex(['handle'], true)
                ->addIndex(['icsHash'], true),

            (new Table('calendar_calendar_sites'))
                ->addField('id', $this->primaryKey())
                ->addField('calendarId', $this->integer())
                ->addField('siteId', $this->integer())
                ->addField('enabledByDefault', $this->boolean()->defaultValue(true))
                ->addField('hasUrls', $this->boolean()->defaultValue(false))
                ->addField('uriFormat', $this->string())
                ->addField('template', $this->string())
                ->addForeignKey('siteId', 'sites', 'id', ForeignKey::CASCADE)
                ->addForeignKey('calendarId', 'calendar_calendars', 'id', ForeignKey::CASCADE)
                ->addIndex(['calendarId', 'siteId'], true),

            (new Table('calendar_events'))
                ->addField('id', $this->integer()->notNull())
                ->addField('calendarId', $this->integer())
                ->addField('authorId', $this->integer())
                ->addField('startDate', $this->dateTime()->notNull())
                ->addField('endDate', $this->dateTime()->notNull())
                ->addField('allDay', $this->boolean())
                ->addField('rrule', $this->string())
                ->addField('freq', $this->string())
                ->addField('interval', $this->integer())
                ->addField('count', $this->integer())
                ->addField('until', $this->dateTime())
                ->addField('byMonth', $this->string())
                ->addField('byYearDay', $this->string())
                ->addField('byMonthDay', $this->string())
                ->addField('byDay', $this->string())
                ->addForeignKey('id', 'elements', 'id', ForeignKey::CASCADE)
                ->addForeignKey('calendarId', 'calendar_calendars', 'id', ForeignKey::CASCADE)
                ->addForeignKey('authorId', 'users', 'id', ForeignKey::SET_NULL)
                ->addIndex(['id'], true)
                ->addIndex(['calendarId'])
                ->addIndex(['authorId'])
                ->addIndex(['startDate'])
                ->addIndex(['endDate'])
                ->addIndex(['startDate', 'endDate'])
                ->addIndex(['until']),

            (new Table('calendar_exceptions'))
                ->addField('id', $this->primaryKey())
                ->addField('date', $this->dateTime()->notNull())
                ->addField('eventId', $this->integer()->notNull())
                ->addForeignKey('eventId', 'calendar_events', 'id', ForeignKey::CASCADE)
                ->addIndex(['eventId', 'date'], false, 'exceptions_'),

            (new Table('calendar_select_dates'))
                ->addField('id', $this->primaryKey())
                ->addField('date', $this->dateTime()->notNull())
                ->addField('eventId', $this->integer()->notNull())
                ->addForeignKey('eventId', 'calendar_events', 'id', ForeignKey::CASCADE)
                ->addIndex(['eventId', 'date'], false, 'select_dates_'),
        ];
    }
}
