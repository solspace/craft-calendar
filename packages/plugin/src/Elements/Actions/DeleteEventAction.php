<?php

namespace Solspace\Calendar\Elements\Actions;

use craft\base\ElementAction;
use craft\elements\db\ElementQueryInterface;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\PermissionHelper;

class DeleteEventAction extends ElementAction
{
    /**
     * @var null|string The confirmation message that should be shown before the elements get deleted
     */
    public ?string $confirmationMessage = null;

    /**
     * @var null|string The message that should be shown after the elements get deleted
     */
    public ?string $successMessage = null;

    public function getTriggerHtml(): ?string
    {
        // Only enable for deletable elements, per canDelete()
        \Craft::$app->getView()->registerJsWithVars(fn ($type) => <<<JS
            (() => {
                new Craft.ElementActionTrigger({
                    type: {$type},
                    validateSelection: \$selectedItems => {
                        for (let i = 0; i < \$selectedItems.length; i++) {
                            if (!Garnish.hasAttr(\$selectedItems.eq(i).find('.element'), 'data-deletable')) {
                                return false;
                            }
                        }
                        return true;
                    },
                });
            })();
            JS, [static::class]);

        return null;
    }

    public function getTriggerLabel(): string
    {
        return Calendar::t('Delete');
    }

    public static function isDestructive(): bool
    {
        return true;
    }

    public function getConfirmationMessage(): ?string
    {
        if (isset($this->confirmationMessage)) {
            return $this->confirmationMessage;
        }

        return \Craft::t('app', 'Are you sure you want to delete the selected {type}?', [
            'type' => 'Event',
        ]);
    }

    /**
     * Performs the action on any elements that match the given criteria.
     */
    public function performAction(ElementQueryInterface $query): bool
    {
        /** @var Event $element */
        foreach ($query->all() as $element) {
            if (PermissionHelper::canEditEvent($element)) {
                Calendar::getInstance()->events->deleteEvent($element);
            }
        }

        if (isset($this->successMessage)) {
            $this->setMessage($this->successMessage);
        } else {
            $this->setMessage(\Craft::t('app', '{type} deleted.', [
                'type' => 'Event',
            ]));
        }

        return true;
    }
}
