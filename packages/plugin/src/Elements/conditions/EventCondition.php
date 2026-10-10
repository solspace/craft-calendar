<?php

namespace Solspace\Calendar\Elements\conditions;

use craft\elements\conditions\ElementCondition;

class EventCondition extends ElementCondition
{
    // Craft 4
    protected function conditionRuleTypes(): array
    {
        $conditions = parent::conditionRuleTypes();
        $conditions[] = ExpiryDateConditionRule::class;

        // Hide Author Conditions from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            return $conditions;
        }

        return array_merge($conditions, [
            AuthorConditionRule::class,
        ]);
    }

    // Craft 5
    protected function selectableConditionRules(): array
    {
        $conditions = parent::selectableConditionRules();
        $conditions[] = ExpiryDateConditionRule::class;

        // Hide Author Conditions from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            return $conditions;
        }

        return array_merge($conditions, [
            AuthorConditionRule::class,
        ]);
    }
}
