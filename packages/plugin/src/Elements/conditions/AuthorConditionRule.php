<?php

namespace Solspace\Calendar\Elements\conditions;

use craft\base\conditions\BaseElementSelectConditionRule;
use craft\base\ElementInterface;
use craft\elements\conditions\ElementConditionRuleInterface;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use solspace\Calendar\Elements\db\EventQuery;
use solspace\Calendar\Elements\Event;

class AuthorConditionRule extends BaseElementSelectConditionRule implements ElementConditionRuleInterface
{
    public function getLabel(): string
    {
        return \Craft::t('app', 'Author');
    }

    public function getExclusiveQueryParams(): array
    {
        return ['author', 'authorId'];
    }

    public function modifyQuery(ElementQueryInterface $query): void
    {
        // @var EventQuery $query
        $query->authorId($this->getElementId());
    }

    public function matchElement(ElementInterface $element): bool
    {
        // @var Event $element
        return $this->matchValue($element->getAuthorId());
    }

    protected function elementType(): string
    {
        return User::class;
    }

    protected function criteria(): ?array
    {
        return [];
    }
}
