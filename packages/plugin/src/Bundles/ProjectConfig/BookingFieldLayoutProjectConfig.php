<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Table;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\helpers\ProjectConfig;
use craft\models\FieldLayout;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Bundles\BundleInterface;

class BookingFieldLayoutProjectConfig implements BundleInterface
{
    public const PATH = 'solspace.calendar.bookingFieldLayout';

    public function __construct()
    {
        \Craft::$app->projectConfig->onAdd(self::PATH, [$this, 'handleChange'])->onUpdate(self::PATH, [$this, 'handleChange'])->onRemove(self::PATH, [$this, 'handleChange']);
    }

    public function handleChange(ConfigEvent $event): void
    {
        ProjectConfig::ensureAllFieldsProcessed();
        if (!$event->newValue) {
            \Craft::$app->fields->deleteLayoutsByType(Booking::class);

            return;
        }
        $layout = FieldLayout::createFromConfig($event->newValue);
        $layout->uid = $event->newValue['uid'];
        $layout->id = Db::idByUid(Table::FIELDLAYOUTS, $layout->uid);
        $layout->type = Booking::class;
        \Craft::$app->fields->saveLayout($layout);
    }
}
