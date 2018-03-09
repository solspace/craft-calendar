<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use Solspace\Calendar\Calendar;

class SettingsModel extends Model
{
    const DEFAULT_DATE_OVERLAP_THRESHOLD   = 5;
    const DEFAULT_TIME_INTERVAL            = 30;
    const DEFAULT_DURATION                 = 60;
    const DEFAULT_ALL_DAY                  = false;
    const DEFAULT_SHOW_MINI_CAL            = true;
    const DEFAULT_SHOW_DISABLED_EVENTS     = true;
    const DEFAULT_VIEW                     = Calendar::VIEW_MONTH;
    const DEFAULT_ALLOW_QUICK_CREATE       = true;
    const DEFAULT_AUTHORED_EVENT_EDIT_ONLY = false;

    private static $overlapThresholds = [
        0 => 0,
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 5,
    ];

    private static $timeIntervals = [
        15 => 15,
        30 => 30,
        60 => 60,
    ];

    private static $eventDurations = [
        30  => 30,
        60  => 60,
        120 => 120,
    ];

    /** @var int */
    public $overlapThreshold;

    /** @var int */
    public $timeInterval;

    /** @var int */
    public $eventDuration;

    /** @var bool */
    public $allDay;

    /** @var bool */
    public $demoBannerDisabled;

    /** @var bool */
    public $showMiniCal;

    /** @var bool */
    public $showDisabledEvents;

    /** @var bool */
    public $quickCreateEnabled;

    /** @var string */
    public $defaultView;

    /** @var bool */
    public $guestAccess;

    /** @var string */
    public $descriptionFieldHandle;

    /** @var string */
    public $locationFieldHandle;

    /** @var bool */
    public $authoredEventEditOnly;

    /**
     * Setting default values upon construction
     *
     * @param null $attributes
     */
    public function __construct($attributes = null)
    {
        parent::__construct($attributes);

        $this->overlapThreshold      = self::DEFAULT_DATE_OVERLAP_THRESHOLD;
        $this->timeInterval          = self::DEFAULT_TIME_INTERVAL;
        $this->eventDuration         = self::DEFAULT_DURATION;
        $this->allDay                = self::DEFAULT_ALL_DAY;
        $this->demoBannerDisabled    = null;
        $this->showMiniCal           = self::DEFAULT_SHOW_MINI_CAL;
        $this->defaultView           = self::DEFAULT_VIEW;
        $this->guestAccess           = null;
        $this->quickCreateEnabled    = self::DEFAULT_ALLOW_QUICK_CREATE;
        $this->showDisabledEvents    = self::DEFAULT_SHOW_DISABLED_EVENTS;
        $this->authoredEventEditOnly = self::DEFAULT_AUTHORED_EVENT_EDIT_ONLY;
    }

    /**
     * @return array
     */
    public static function getOverlapThresholds(): array
    {
        return self::$overlapThresholds;
    }

    /**
     * @return array
     */
    public static function getTimeIntervals(): array
    {
        return self::$timeIntervals;
    }

    /**
     * @return array
     */
    public static function getEventDurations(): array
    {
        return self::$eventDurations;
    }

    /**
     * @return bool
     */
    public function isDemoBannerDisabled(): bool
    {
        return $this->demoBannerDisabled === true;
    }

    /**
     * @return string
     */
    public function isMiniCalEnabled(): string
    {
        return (bool) $this->showMiniCal;
    }
}
