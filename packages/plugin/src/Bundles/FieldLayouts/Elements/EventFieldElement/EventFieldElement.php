<?php

namespace Solspace\Calendar\Bundles\FieldLayouts\Elements\EventFieldElement;

use craft\base\ElementInterface;
use craft\fieldlayoutelements\BaseField;
use craft\helpers\Html;
use Solspace\Calendar\Calendar;

class EventFieldElement extends BaseField
{
    protected function defaultLabel(?ElementInterface $element = null, bool $static = false): ?string
    {
        return Calendar::t('Calendar Event');
    }

    public function mandatory(): bool
    {
        return true;
    }

    public function isMultiInstance(): bool
    {
        return false;
    }

    public function hasSettings(): bool
    {
        return false;
    }

    public function thumbable(): bool
    {
        return true;
    }

    public function thumbHtml(ElementInterface $element, int $size): ?string
    {
        return Html::tag('div', 'THIS IS GOING TO BE A THUMBNAIL OF THE EVENT');
    }

    public function previewable(): bool
    {
        return true;
    }

    public function previewHtml(ElementInterface $element): string
    {
        return Html::tag('div', 'THIS IS GOING TO BE A PREVIEW OF THE EVENT');
    }

    public function attribute(): string
    {
        return 'calendarEvent';
    }

    protected function selectorLabel(): ?string
    {
        return Calendar::t('Calendar Event');
    }

    protected function selectorIcon(): ?string
    {
        return \Craft::getAlias('@calendar/icon-mask.svg');
    }

    protected function conditional(): bool
    {
        return false;
    }

    protected function inputHtml(?ElementInterface $element = null, bool $static = false): ?string
    {
        return \Craft::$app->view->renderTemplate(
            'calendar/elements/event-field/input',
            [
                'attribute' => $this->attribute(),
                'element' => $element,
                'static' => $static,
            ],
        );
    }

    protected function selectorIndicators(): array
    {
        $indicators = parent::selectorIndicators();
        $indicators[] = [
            'label' => Calendar::t('This field is required'),
            'icon' => 'asterisk',
            'iconColor' => 'rose',
        ];

        return $indicators;
    }
}
