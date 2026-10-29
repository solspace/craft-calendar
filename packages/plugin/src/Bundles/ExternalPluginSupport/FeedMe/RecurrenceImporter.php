<?php

namespace Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe;

use Carbon\Carbon;
use RRule\RRule;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\RRule\EventRecurrenceValidator;
use Solspace\Calendar\Library\RRule\RRuleParser;
use Solspace\Calendar\Library\RRule\RRuleStringNormalizer;

/**
 * Converts Feed Me's legacy recurrence mappings to Calendar 6 recurrence sets.
 */
final class RecurrenceImporter
{
    /**
     * Unmapped values retain the saved schedule. A mapped RRULE replaces the whole rule.
     *
     * @param array<string, mixed> $attributes  legacy RRULE parts, using RFC property names
     * @param null|Carbon[]        $selectDates null when the field wasn't mapped
     */
    public function apply(Event $event, array $attributes, bool $ruleMapped, ?string $rule, ?array $selectDates): void
    {
        if (!$ruleMapped && !$attributes && null === $selectDates) {
            return;
        }

        $source = $ruleMapped ? $rule : $event->rrule;
        if ((!$ruleMapped && $attributes) || (!$rule && 'SELECT_DATES' === ($attributes['FREQ'] ?? null))) {
            $source = $this->legacyRule($event, $attributes);
        }

        $lines = array_values(array_filter(array_map('trim', preg_split('/\R/', trim((string) $source)) ?: [])));
        if (1 === \count($lines) && str_starts_with($lines[0], 'FREQ=')) {
            $lines[0] = 'RRULE:'.$lines[0];
        }

        // The event's start date is authoritative, including for date-only imports.
        $lines = array_values(array_filter($lines, static fn (string $line) => !str_starts_with($line, 'DTSTART')));

        if (null !== $selectDates) {
            $lines = array_values(array_filter($lines, static fn (string $line) => !str_starts_with($line, 'RDATE')));
            $dates = [$event->startDate->format('Y-m-d') => $this->dateValue($event, $event->startDate)];
            foreach ($selectDates as $date) {
                $dates[$date->format('Y-m-d')] = $this->dateValue($event, $date);
            }
            $lines[] = 'RDATE:'.implode(',', array_values($dates));
        }

        if (!$lines) {
            $event->rrule = null;
            $event->repeatType = Event::REPEAT_NEVER;
            $event->repeatEndType = Event::REPEAT_END_NEVER;
            $event->until = null;

            return;
        }

        array_unshift($lines, 'DTSTART:'.$this->dateValue($event, $event->startDate));
        $rrule = implode("\n", array_map(
            static fn (string $line) => RRuleStringNormalizer::normalizeLine($line, (bool) $event->allDay),
            $lines,
        ));
        $rules = RRuleParser::parse($rrule)->getRRules();
        $parts = array_map(static fn (RRule $rule) => $rule->getRule(), $rules);
        $repeatType = match (\count($parts)) {
            0 => Event::REPEAT_NEVER,
            1 => \in_array($parts[0]['FREQ'], ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'], true) ? $parts[0]['FREQ'] : 'CUSTOM',
            default => 'CUSTOM',
        };
        $repeatEndType = Event::REPEAT_END_NEVER;
        if ($parts && \count(array_filter($parts, static fn (array $part) => null !== $part['COUNT'])) === \count($parts)) {
            $repeatEndType = 'AFTER';
        } elseif ($parts && \count(array_filter($parts, static fn (array $part) => null !== $part['UNTIL'])) === \count($parts)) {
            $repeatEndType = 'ON_DATE';
        }

        $errors = (new EventRecurrenceValidator())->validate($repeatType, $repeatEndType, $rrule);
        if ($errors) {
            throw new \InvalidArgumentException(implode(' ', array_merge(...array_values($errors))));
        }

        $event->rrule = $rrule;
        $event->repeatType = $repeatType;
        $event->repeatEndType = $repeatEndType;
        $until = $parts[0]['UNTIL'] ?? null;
        $event->until = $until ? DateHelper::parseFloatingCarbon($until) : null;
    }

    private function legacyRule(Event $event, array $attributes): ?string
    {
        $existing = $event->getRRuleObject();
        if ('SELECT_DATES' === ($attributes['FREQ'] ?? null)) {
            $dates = [$this->dateValue($event, $event->startDate)];
            foreach ($existing?->getDates() ?? [] as $date) {
                $dates[] = $this->dateValue($event, $date);
            }

            return 'RDATE:'.implode(',', array_unique($dates));
        }

        $parts = ($existing?->getRRules()[0] ?? null)?->getRule() ?? [];
        $parts = array_replace($parts, $attributes);
        if (empty($parts['FREQ'])) {
            return null;
        }

        $parts['INTERVAL'] = max(1, (int) ($parts['INTERVAL'] ?? 1));
        $parts['DTSTART'] = DateHelper::parseFloatingCarbon($event->startDate);
        if (!empty($attributes['COUNT'])) {
            $parts['UNTIL'] = null;
        } elseif (!empty($attributes['UNTIL'])) {
            $parts['COUNT'] = null;
        }

        return (new RRule($parts))->rfcString();
    }

    private function dateValue(Event $event, \DateTimeInterface $date): string
    {
        if ($event->allDay) {
            return $date->format('Ymd');
        }

        return $date->format('Ymd').'T'.$event->startDate->format('His');
    }
}
