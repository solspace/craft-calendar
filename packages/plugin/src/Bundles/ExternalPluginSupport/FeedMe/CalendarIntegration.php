<?php

namespace Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe;

use Cake\Utility\Hash;
use Carbon\Carbon;
use craft\base\ElementInterface;
use craft\elements\User as UserElement;
use craft\feedme\base\Element;
use craft\feedme\events\FeedProcessEvent;
use craft\feedme\Plugin;
use craft\feedme\services\Process;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event as EventElement;
use Solspace\Calendar\Library\Helpers\DateHelper;
use yii\base\Event;

if (class_exists('craft\feedme\base\Element')) {
    class CalendarIntegration extends Element
    {
        public const RRULE_MAP = [
            'BYMONTH' => 'byMonth',
            'BYYEARDAY' => 'byYearDay',
            'BYMONTHDAY' => 'byMonthDay',
            'BYDAY' => 'byDay',
            'UNTIL' => 'until',
            'INTERVAL' => 'interval',
            'FREQ' => 'freq',
            'COUNT' => 'count',
        ];

        public static string $name = 'Solspace Calendar Event (official)';

        public static string $class = EventElement::class;

        public $element;

        private bool $ruleMapped = false;

        private ?string $rule = null;

        private array $recurrenceAttributes = [];

        private ?array $selectDates = null;

        public function getGroupsTemplate(): string
        {
            return 'feed-me/_includes/elements/calendar-events/groups';
        }

        public function getColumnTemplate(): string
        {
            return 'feed-me/_includes/elements/calendar-events/column';
        }

        public function getMappingTemplate(): string
        {
            return 'feed-me/_includes/elements/calendar-events/map';
        }

        public function init(): void
        {
            parent::init();

            Event::on(
                Process::class,
                Process::EVENT_STEP_BEFORE_ELEMENT_SAVE,
                function (FeedProcessEvent $event) {
                    if (EventElement::class === $event->feed['elementType']) {
                        $this->_onBeforeElementSave($event);
                    }
                }
            );
        }

        public function getGroups(): array
        {
            if (Calendar::getInstance()) {
                return Calendar::getInstance()->calendars->getAllAllowedCalendars();
            }

            return [];
        }

        public function getQuery($settings, $params = []): mixed
        {
            $query = EventElement::find()
                ->status(null)
                ->setCalendarId($settings['elementGroup'][EventElement::class])
                ->siteId(Hash::get($settings, 'siteId') ?: \Craft::$app->getSites()->getPrimarySite()->id)
            ;
            \Craft::configure($query, $params);

            return $query;
        }

        public function setModel($settings): ElementInterface
        {
            $siteId = (int) Hash::get($settings, 'siteId');
            $calendarId = $settings['elementGroup'][EventElement::class];

            $this->resetRecurrenceData();
            $this->element = EventElement::create($siteId, $calendarId);

            return $this->element;
        }

        protected function parseStartDate($feedData, $fieldInfo): Carbon
        {
            return $this->_parseDate($feedData, $fieldInfo);
        }

        protected function parseEndDate($feedData, $fieldInfo): ?Carbon
        {
            return $this->_parseDate($feedData, $fieldInfo);
        }

        protected function parseUntil($feedData, $fieldInfo): ?Carbon
        {
            $this->recurrenceAttributes['UNTIL'] = $this->_parseDate($feedData, $fieldInfo);

            return null;
        }

        protected function parseAuthorId($feedData, $fieldInfo): ?int
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $match = Hash::get($fieldInfo, 'options.match');
            $create = Hash::get($fieldInfo, 'options.create');

            // Element lookups must have a value to match against
            if (null === $value || '' === $value) {
                return null;
            }

            if (\is_array($value)) {
                $value = $value[0];
            }

            if ('fullName' === $match) {
                $element = UserElement::findOne(['search' => $value, 'status' => null]);
            } else {
                $element = UserElement::find()->status(null)->andWhere(['=', $match, $value])->one();
            }

            if ($element) {
                return $element->id;
            }

            // Check if we should create the element. But only if email is provided (for the moment)
            if ($create && 'email' === $match) {
                $element = new UserElement();
                $element->username = $value;
                $element->email = $value;

                if (!\Craft::$app->getElements()->saveElement($element)) {
                    Plugin::error(
                        'Event error: Could not create author - `{e}`.',
                        ['e' => json_encode($element->getErrors())]
                    );
                } else {
                    Plugin::info('Author `#{id}` added.', ['id' => $element->id]);
                }

                return $element->id;
            }

            return null;
        }

        protected function parseRrule($feedData, $fieldInfo)
        {
            $this->ruleMapped = true;
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->rule = $value ? trim((string) $value) : null;

            return null;
        }

        protected function parseSelectDates($feedData, $fieldInfo)
        {
            $formatting = Hash::get($fieldInfo, 'options.match') ?? 'auto';
            $this->selectDates = [];

            foreach ($this->fetchArrayValue($feedData, $fieldInfo) ?? [] as $value) {
                $date = $this->parseDateAttribute($value, $formatting);
                if ($date) {
                    $this->selectDates[] = DateHelper::parseFloatingCarbon($date);
                }
            }

            return null;
        }

        protected function parseFreq($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['FREQ'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseInterval($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['INTERVAL'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseCount($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['COUNT'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseByMonth($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['BYMONTH'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseByYearDay($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['BYYEARDAY'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseByMonthDay($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['BYMONTHDAY'] = '' === $value ? null : $value;

            return null;
        }

        protected function parseByDay($feedData, $fieldInfo)
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $this->recurrenceAttributes['BYDAY'] = '' === $value ? null : $value;

            return null;
        }

        private function _onBeforeElementSave(FeedProcessEvent $event): void
        {
            $attributes = $this->recurrenceAttributes;
            $ruleMapped = $this->ruleMapped;
            $rule = $this->rule;
            $dates = $this->selectDates;
            $this->resetRecurrenceData();

            (new RecurrenceImporter())->apply($event->element, $attributes, $ruleMapped, $rule, $dates);
            foreach (['rrule', 'repeatType', 'repeatEndType', 'until'] as $attribute) {
                $event->contentData[$attribute] = $event->element->{$attribute};
            }
        }

        private function resetRecurrenceData(): void
        {
            $this->recurrenceAttributes = [];
            $this->ruleMapped = false;
            $this->rule = null;
            $this->selectDates = null;
        }

        private function _parseDate($feedData, $fieldInfo): ?Carbon
        {
            $value = $this->fetchSimpleValue($feedData, $fieldInfo);
            $formatting = Hash::get($fieldInfo, 'options.match');

            $date = $this->parseDateAttribute($value, $formatting);

            // Calendar expects dates as Carbon object, not DateTime
            if ($date) {
                return new Carbon($date->format('Y-m-d H:i:s') ?? 'now', DateHelper::UTC);
            }

            return null;
        }
    }
} else {
    class CalendarIntegration {}
}
