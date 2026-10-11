<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use Solspace\Calendar\Library\Scheduling\Availability;

class SchedulingSettings extends Model
{
    public bool $active = true;
    public ?string $availableFrom = null;
    public ?string $availableUntil = null;
    public string $timezone = 'UTC';
    public int $duration = 30;
    public int $increment = 15;
    public int $buffer = 0;
    public int $minimumNotice = 0;
    public int $maximumAdvance = 90;
    public bool $allowOverlap = false;
    public bool $allowGuests = false;
    public bool $requireApproval = true;
    public string $notificationEmail = '';
    public array $hours = [
        ['day' => 7, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 1, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 2, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 3, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 4, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 5, 'start' => '08:00', 'end' => '21:00'],
        ['day' => 6, 'start' => '08:00', 'end' => '21:00'],
    ];
    public array $exceptions = [];

    /** Show Sunday first, preserving split-period order and the saved configuration. */
    public function getHoursForDisplay(): array
    {
        $hours = $this->hours;
        $weekday = static function ($row): int {
            $day = \is_array($row) ? filter_var($row['day'] ?? null, \FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 7]]) : false;

            return false === $day ? 7 : $day % 7;
        };
        usort($hours, static fn ($a, $b) => $weekday($a) <=> $weekday($b));

        return $hours;
    }

    public function validateAvailability(): void
    {
        foreach (Availability::configurationErrors($this->toArray()) as $attribute => $messages) {
            foreach ($messages as $message) {
                $this->addError($attribute, \Craft::t('calendar', $message));
            }
        }
    }

    protected function defineRules(): array
    {
        return [
            [['timezone'], 'required'],
            [['timezone'], 'in', 'range' => \DateTimeZone::listIdentifiers()],
            [['duration', 'increment'], 'integer', 'min' => 1, 'max' => 1440],
            [['buffer'], 'integer', 'min' => 0, 'max' => 1440],
            [['minimumNotice'], 'integer', 'min' => 0, 'max' => 8760],
            [['maximumAdvance'], 'integer', 'min' => 1, 'max' => 730],
            [['notificationEmail'], 'email'],
            [['hours'], 'validateAvailability', 'skipOnEmpty' => false],
        ];
    }
}
