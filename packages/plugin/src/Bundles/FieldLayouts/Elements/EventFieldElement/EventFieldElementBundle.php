<?php

namespace Solspace\Calendar\Bundles\FieldLayouts\Elements\EventFieldElement;

use craft\events\DefineFieldLayoutFieldsEvent;
use craft\fieldlayoutelements\TextField;
use craft\fieldlayoutelements\TitleField;
use craft\models\FieldLayout;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class EventFieldElementBundle implements BundleInterface
{
    public function __construct()
    {
        Event::on(
            FieldLayout::class,
            FieldLayout::EVENT_DEFINE_NATIVE_FIELDS,
            function (DefineFieldLayoutFieldsEvent $event) {
                /** @var FieldLayout $layout */
                $layout = $event->sender;

                if ($layout->type === CalendarEvent::class) {
                    $event->fields[] = [
                        'class' => TitleField::class,
                        'label' => 'Event Title',
                        'attribute' => 'title',
                        'required' => true,
                        'mandatory' => true,
                    ];

                    $event->fields[] = EventFieldElement::class;

                    $event->fields[] = [
                        'class' => TextField::class,
                        'label' => 'Event Description',
                        'attribute' => 'eventDescription',
                        'requirable' => true,
                        'translatable' => true,
                    ];

                    $event->fields[] = [
                        'class' => TextField::class,
                        'label' => 'Event Location',
                        'attribute' => 'eventLocation',
                        'requirable' => true,
                        'translatable' => true,
                    ];
                }
            }
        );
    }
}
