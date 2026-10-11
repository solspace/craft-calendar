<?php

namespace Solspace\Calendar\Library\Scheduling;

use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Models\CalendarModel;

class Schedule
{
    /** Canonical calendar order also keeps columns and browser history stable. */
    public static function calendarIds(array $calendars, mixed $selection): array
    {
        if ('all' === $selection) {
            return array_keys($calendars);
        }
        if (!\is_string($selection) || !preg_match('/^[1-9][0-9]*(,[1-9][0-9]*)*$/D', $selection)) {
            throw new \InvalidArgumentException('Invalid calendar selection.');
        }
        $ids = array_unique(array_map('intval', explode(',', $selection)));
        if (array_diff($ids, array_keys($calendars))) {
            throw new \OutOfBoundsException('Calendar access denied.');
        }

        return array_values(array_intersect(array_keys($calendars), $ids));
    }

    /** Align a displayed week with Calendar's effective first day (Sunday = 0). */
    public static function weekStart(\DateTimeImmutable $day, int $firstDay): \DateTimeImmutable
    {
        $offset = ((int) $day->format('w') - $firstDay + 7) % 7;

        return $day->modify('-'.$offset.' days');
    }

    /** Project one resource onto a day in the shared display timezone. */
    public static function column(CalendarModel $calendar, \DateTimeImmutable $day, array $bookings, callable $availableSlots): array
    {
        $zone = $day->getTimezone();
        $end = $day->modify('+1 day');
        $dayBookings = [];
        foreach ($bookings as $booking) {
            if ((int) $booking->calendarId !== (int) $calendar->id || $booking->startDate >= $end || $booking->endDate <= $day) {
                continue;
            }
            $localStart = $booking->startDate->setTimezone($zone);
            $localEnd = $booking->endDate->setTimezone($zone);
            $minute = $localStart < $day ? 0 : self::minute($localStart);
            $finish = $localEnd >= $end ? 1440 : self::minute($localEnd);
            $dayBookings[] = ['booking' => $booking, 'minute' => $minute, 'length' => min(1440 - $minute, max(15, $finish - $minute)), 'label' => DateFormatHelper::formatTimeRange($localStart, $localEnd, $zone->getName())];
        }
        $lanes = [];
        foreach ($dayBookings as &$item) {
            $lane = 0;
            while (isset($lanes[$lane]) && $lanes[$lane] > $item['minute']) {
                ++$lane;
            }
            $lanes[$lane] = $item['minute'] + $item['length'];
            $item['lane'] = $lane;
        }
        unset($item);

        $settings = $calendar->getSchedulingSettings();
        $resourceZone = new \DateTimeZone($settings->timezone);
        $lastDate = $end->modify('-1 second')->setTimezone($resourceZone)->format('Y-m-d');
        $slotGroups = [];
        for ($localDay = $day->setTimezone($resourceZone)->setTime(0, 0); $localDay->format('Y-m-d') <= $lastDate; $localDay = $localDay->modify('+1 day')) {
            foreach ($availableSlots($calendar, $localDay->format('Y-m-d')) as $slot) {
                $localStart = (new \DateTimeImmutable($slot['start']))->setTimezone($zone);
                if ($localStart < $day || $localStart >= $end) {
                    continue;
                }
                $localEnd = (new \DateTimeImmutable($slot['end']))->setTimezone($zone);
                $minute = self::minute($localStart);
                $finish = $localEnd >= $end ? 1440 : self::minute($localEnd);
                $slot['length'] = min(1440 - $minute, $finish > $minute ? $finish - $minute : $settings->duration);
                $slot['label'] = DateFormatHelper::formatTimeRange($localStart, $localEnd, $zone->getName());
                // Both occurrences of an autumn DST time remain independently selectable.
                $slotGroups[$minute][] = $slot;
            }
        }

        return ['calendar' => $calendar, 'bookings' => $dayBookings, 'lanes' => max(1, \count($lanes)), 'slots' => $slotGroups];
    }

    /** Merge resources without treating bookings in different calendars as conflicts. */
    public static function combined(array $columns): array
    {
        $bookings = [];
        $slots = [];
        foreach ($columns as $column) {
            $calendar = $column['calendar'];
            foreach ($column['bookings'] as $item) {
                $bookings[] = $item + ['calendar' => $calendar];
            }
            foreach ($column['slots'] as $minute => $options) {
                foreach ($options as $slot) {
                    $slots[$minute]['options'][] = $slot + ['calendar' => $calendar];
                }
                $slots[$minute]['height'] = max($slots[$minute]['height'] ?? 0, $calendar->getSchedulingSettings()->increment);
            }
        }
        ksort($slots);
        $minutes = array_keys($slots);
        foreach ($minutes as $index => $minute) {
            // Never cover a later start offered by another resource.
            $slots[$minute]['height'] = min($slots[$minute]['height'], ($minutes[$index + 1] ?? 1440) - $minute);
        }
        usort($bookings, static fn ($a, $b) => [$a['minute'], -$a['length'], $a['booking']->id] <=> [$b['minute'], -$b['length'], $b['booking']->id]);
        $groups = [];
        foreach ($bookings as $item) {
            $last = \count($groups) - 1;
            if ($last < 0 || $item['minute'] >= $groups[$last]['end']) {
                $groups[] = ['minute' => $item['minute'], 'end' => $item['minute'] + $item['length'], 'items' => []];
                ++$last;
            }
            $groups[$last]['items'][] = $item;
            $groups[$last]['end'] = max($groups[$last]['end'], $item['minute'] + $item['length']);
        }
        $visible = [];
        $overflow = [];
        foreach ($groups as $group) {
            $lanes = [];
            foreach ($group['items'] as &$item) {
                $lane = 0;
                while (isset($lanes[$lane]) && $lanes[$lane] > $item['minute']) {
                    ++$lane;
                }
                $lanes[$lane] = $item['minute'] + $item['length'];
                $item['lane'] = $lane;
            }
            unset($item);
            $count = \count($lanes);
            $hidden = [];
            foreach ($group['items'] as $item) {
                $item['lanes'] = min(3, $count);
                if ($count > 3 && $item['lane'] >= 2) {
                    $hidden[] = $item;
                } else {
                    $visible[] = $item;
                }
            }
            if ($hidden) {
                $overflow[] = ['minute' => $group['minute'], 'length' => $group['end'] - $group['minute'], 'items' => $hidden];
            }
        }

        return ['bookings' => $visible, 'overflow' => $overflow, 'slots' => $slots];
    }

    public static function moveStart(string $date, mixed $minute, mixed $timezone): \DateTimeImmutable
    {
        $minute = filter_var($minute, \FILTER_VALIDATE_INT);
        if (!Availability::validDate($date) || false === $minute || $minute < 0 || $minute >= 1440 || !\is_string($timezone) || !\in_array($timezone, \DateTimeZone::listIdentifiers(\DateTimeZone::ALL_WITH_BC), true)) {
            throw new \InvalidArgumentException('Invalid schedule time.');
        }
        $value = $date.' '.\sprintf('%02d:%02d', intdiv($minute, 60), $minute % 60);
        $start = new \DateTimeImmutable($value, new \DateTimeZone($timezone));
        if ($start->format('Y-m-d H:i') !== $value) {
            throw new \InvalidArgumentException('Invalid schedule time.');
        }

        return $start;
    }

    private static function minute(\DateTimeImmutable $time): int
    {
        return (int) $time->format('G') * 60 + (int) $time->format('i');
    }
}
