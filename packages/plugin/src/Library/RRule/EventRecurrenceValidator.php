<?php

namespace Solspace\Calendar\Library\RRule;

use RRule\RRule;

final class EventRecurrenceValidator
{
    private const REPEAT_TYPES = ['NEVER', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM'];
    private const REPEAT_END_TYPES = ['NEVER', 'AFTER', 'ON_DATE'];

    /**
     * @return array<string, string[]>
     */
    public function validate(?string $repeatType, ?string $repeatEndType, ?string $rrule): array
    {
        $errors = [];
        $validRepeatType = \in_array($repeatType, self::REPEAT_TYPES, true);
        $validRepeatEndType = \in_array($repeatEndType, self::REPEAT_END_TYPES, true);

        if (!$validRepeatType) {
            $errors['repeatType'][] = 'Repeat type is invalid.';
        }

        if (!$validRepeatEndType) {
            $errors['repeatEndType'][] = 'Repeat end type is invalid.';
        }

        $rrule = trim((string) $rrule);
        $rules = [];
        if ($rrule) {
            if (!preg_match('/^DTSTART(?:;[^:\r\n]*)?:[^\r\n]+/mi', $rrule)) {
                $errors['rrule'][] = 'Recurrence rule must include a start date.';
            }

            try {
                $rules = RRule::createFromRfcString($rrule, true)->getRRules();
            } catch (\Throwable) {
                $errors['rrule'][] = 'Recurrence rule is invalid.';
            }
        }

        if (!$validRepeatType || !$validRepeatEndType || isset($errors['rrule'])) {
            return $errors;
        }

        if ('NEVER' === $repeatType) {
            if ('NEVER' !== $repeatEndType) {
                $errors['repeatEndType'][] = 'A non-repeating event cannot have a repeat end type.';
            }

            if ($rules) {
                $errors['repeatType'][] = 'Repeat type does not match the recurrence rule.';
            }

            if ($rrule && !$rules) {
                if (!$this->hasValidSelectedDates($rrule)) {
                    $errors['rrule'][] = 'A non-repeating recurrence set must include valid dates.';
                }
            }

            return $errors;
        }

        if (!$rules) {
            $errors['rrule'][] = 'A recurrence rule is required when the event repeats.';

            return $errors;
        }

        if ('CUSTOM' !== $repeatType) {
            foreach ($rules as $rule) {
                if ($repeatType !== strtoupper((string) ($rule->getRule()['FREQ'] ?? ''))) {
                    $errors['repeatType'][] = 'Repeat type does not match the recurrence rule frequency.';

                    break;
                }
            }
        }

        $rulesWithCount = 0;
        $rulesWithUntil = 0;
        foreach ($rules as $rule) {
            $parts = $rule->getRule();
            if (isset($parts['COUNT'])) {
                ++$rulesWithCount;
            }

            if (isset($parts['UNTIL'])) {
                ++$rulesWithUntil;
            }
        }

        $endTypeMatches = match ($repeatEndType) {
            'AFTER' => \count($rules) === $rulesWithCount && 0 === $rulesWithUntil,
            'ON_DATE' => \count($rules) === $rulesWithUntil && 0 === $rulesWithCount,
            default => 0 === $rulesWithCount && 0 === $rulesWithUntil,
        };

        if (!$endTypeMatches) {
            $errors['repeatEndType'][] = 'Repeat end type does not match the recurrence rule.';
        }

        return $errors;
    }

    private function hasValidSelectedDates(string $rrule): bool
    {
        preg_match_all('/^RDATE(?:;[^:]*)?:(.*)$/m', $rrule, $matches);
        if (!$matches[1]) {
            return false;
        }

        foreach ($matches[1] as $values) {
            foreach (explode(',', $values) as $value) {
                if (!trim($value)) {
                    return false;
                }
            }
        }

        return true;
    }
}
