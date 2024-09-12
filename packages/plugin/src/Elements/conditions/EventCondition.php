<?php

namespace Solspace\Calendar\Elements\conditions;

use craft\elements\conditions\ElementCondition;

class EventCondition extends ElementCondition
{
    // Craft 4
    protected function conditionRuleTypes(): array
    {
        return array_merge(parent::conditionRuleTypes(), [
            AuthorConditionRule::class,
        ]);
    }

    // Craft 5
    protected function selectableConditionRules(): array
    {
        return array_merge(parent::selectableConditionRules(), [
            AuthorConditionRule::class,
        ]);
    }
}
