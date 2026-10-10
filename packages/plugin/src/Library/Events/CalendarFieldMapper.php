<?php

namespace Solspace\Calendar\Library\Events;

use craft\base\ElementContainerFieldInterface;
use craft\base\FieldInterface;
use craft\fields\BaseRelationField;
use craft\fields\PlainText;
use craft\models\FieldLayout;
use yii\base\InvalidArgumentException;

/** Maps layout instances, rather than display names or Craft's content storage keys. */
class CalendarFieldMapper
{
    /** @return array<string, FieldInterface> */
    public function fields(?FieldLayout $layout): array
    {
        $fields = [];
        foreach ($layout?->getCustomFields() ?? [] as $field) {
            $fields[$field->layoutElement->uid] = $field;
        }

        return $fields;
    }

    public function compatible(FieldInterface $source, FieldInterface $target): bool
    {
        if ($source::class !== $target::class) {
            return false;
        }
        if ($source->id === $target->id && $source->id) {
            return true;
        }
        // Ownership and relation restrictions belong to the actual field, not its name.
        if ($source instanceof ElementContainerFieldInterface || $source instanceof BaseRelationField) {
            return false;
        }

        return $source instanceof PlainText || $source->getSettings() === $target->getSettings();
    }

    /** @return array<string, string> destination layout UID => source layout UID */
    public function suggest(?FieldLayout $sourceLayout, ?FieldLayout $targetLayout): array
    {
        $source = $this->fields($sourceLayout);
        $target = $this->fields($targetLayout);
        $mapping = [];
        $used = [];
        // Reserve identities before handles, and handles before labels. Ambiguous matches stay empty.
        foreach (['identity', 'handle', 'label'] as $match) {
            $proposals = [];
            $sourceCounts = [];
            foreach ($target as $targetUid => $targetField) {
                if (isset($mapping[$targetUid])) {
                    continue;
                }
                $candidates = [];
                foreach ($source as $sourceUid => $sourceField) {
                    if (isset($used[$sourceUid]) || !$this->compatible($sourceField, $targetField)) {
                        continue;
                    }
                    $matches = match ($match) {
                        'identity' => $sourceField->id && $sourceField->id === $targetField->id,
                        'handle' => $sourceField->handle === $targetField->handle,
                        'label' => mb_strtolower(trim($this->label($sourceField))) === mb_strtolower(trim($this->label($targetField))),
                    };
                    if ($matches) {
                        $candidates[] = $sourceUid;
                        $sourceCounts[$sourceUid] = ($sourceCounts[$sourceUid] ?? 0) + 1;
                    }
                }
                if (1 === \count($candidates)) {
                    $proposals[$targetUid] = $candidates[0];
                }
            }
            foreach ($proposals as $targetUid => $sourceUid) {
                if (1 === $sourceCounts[$sourceUid]) {
                    $mapping[$targetUid] = $sourceUid;
                    $used[$sourceUid] = true;
                }
            }
        }

        return $mapping;
    }

    /** Reject tampered/incompatible mappings; no source can be silently used twice. */
    public function validate(array $mapping, ?FieldLayout $sourceLayout, ?FieldLayout $targetLayout): array
    {
        $source = $this->fields($sourceLayout);
        $target = $this->fields($targetLayout);
        $validated = [];
        foreach ($mapping as $targetUid => $sourceUid) {
            if ('' === $sourceUid) {
                continue;
            }
            if (!\is_string($sourceUid) || !isset($target[$targetUid], $source[$sourceUid]) || !$this->compatible($source[$sourceUid], $target[$targetUid])) {
                throw new InvalidArgumentException('The selected field mapping is not compatible.');
            }
            if (\in_array($sourceUid, $validated, true)) {
                throw new InvalidArgumentException('Each source field can only be mapped once.');
            }
            $validated[$targetUid] = $sourceUid;
        }

        return $validated;
    }

    public function label(FieldInterface $field): string
    {
        return $field->layoutElement?->label() ?? $field->name;
    }
}
