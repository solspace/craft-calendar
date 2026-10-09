<?php

namespace Solspace\Calendar\Elements\conditions;

use craft\base\conditions\BaseDateRangeConditionRule;
use craft\base\ElementInterface;
use craft\elements\conditions\ElementConditionRuleInterface;
use craft\elements\db\ElementQueryInterface;

class ExpiryDateConditionRule extends BaseDateRangeConditionRule implements ElementConditionRuleInterface
{
    public function getLabel(): string
    {
        return \Craft::t('app', 'Expiry Date');
    }

    public function getExclusiveQueryParams(): array
    {
        return ['expiryDate'];
    }

    public function modifyQuery(ElementQueryInterface $query): void
    {
        $query->expiryDate($this->queryParamValue());
    }

    public function matchElement(ElementInterface $element): bool
    {
        return $this->matchValue($element->expiryDate);
    }
}
