<?php

namespace Solspace\Calendar\Elements\Actions;

use craft\base\ElementAction;
use craft\elements\actions\DeleteActionInterface;
use craft\elements\db\ElementQueryInterface;
use craft\helpers\Html;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\PermissionHelper;

class DeleteEventAction extends ElementAction implements DeleteActionInterface
{
    public bool $hard = false;

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
        \Craft::$app->getView()->registerJsWithVars(static fn ($type) => <<<JS
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

        if ($this->hard) {
            return Html::tag('div', $this->getTriggerLabel(), [
                'class' => ['btn', 'formsubmit'],
            ]);
        }

        return null;
    }

    public function getTriggerLabel(): string
    {
        if ($this->hard) {
            return \Craft::t('app', 'Delete permanently');
        }

        return Calendar::t('Delete');
    }

    public function canHardDelete(): bool
    {
        return true;
    }

    public function setHardDelete(): void
    {
        $this->hard = true;
    }

    public static function isDestructive(): bool
    {
        return true;
    }

    public function getConfirmationMessage(): ?string
    {
        if ($this->hard) {
            return \Craft::t('app', 'Are you sure you want to permanently delete the selected {type}?', [
                'type' => Event::pluralLowerDisplayName(),
            ]);
        }

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
                Calendar::getInstance()->events->deleteEvent($element, $this->hard);
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
