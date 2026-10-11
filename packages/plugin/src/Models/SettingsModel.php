<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\helpers\App;
use Solspace\Calendar\Calendar;

class SettingsModel extends Model
{
    public const DEFAULT_DATE_OVERLAP_THRESHOLD = 5;
    public const DEFAULT_TIME_INTERVAL = 30;
    public const DEFAULT_DURATION = 60;
    public const DEFAULT_ALL_DAY = false;
    public const DEFAULT_SHOW_DISABLED_EVENTS = true;
    public const DEFAULT_VIEW = Calendar::VIEW_OVERVIEW;
    public const DEFAULT_CALENDAR_VIEW = 'month';
    public const CALENDAR_VIEWS = ['day', 'week', 'month', 'year', 'agenda'];
    public const DEFAULT_IS_DRAG_AND_DROP_ENABLED = true;
    public const DEFAULT_ALLOW_QUICK_CREATE = true;
    public const DEFAULT_AUTHORED_EVENT_EDIT_ONLY = false;
    public const DEFAULT_FIRST_DAY_OF_WEEK = -1;

    public const BOOKING_DEFAULT_ATTRIBUTES = [
        'duration', 'increment', 'buffer', 'minimumNotice', 'maximumAdvance',
        'allowOverlap', 'requireApproval', 'notificationEmail', 'hours',
    ];

    public const TIME_FORMAT_AUTO = 'auto';
    public const TIME_FORMAT_12_HOUR = '12-hour';
    public const TIME_FORMAT_24_HOUR = '24-hour';

    public ?int $overlapThreshold = null;

    public ?int $timeInterval = null;

    public ?int $eventDuration = null;

    public ?bool $allDay = null;

    public bool $showOverlapWarnings = false;

    public array|bool|null $showDisabledEvents = null;

    public bool $showCancelledEvents = true;

    public array|bool|null $quickCreateEnabled = null;
    public array|bool|null $isDragAndDropEnabled = null;

    public ?string $defaultView = null;

    public string $defaultCalendarView = self::DEFAULT_CALENDAR_VIEW;

    public array|string $enabledCalendarViews = self::CALENDAR_VIEWS;

    public array|bool|null $guestAccess = null;

    public array $bookingDefaults = [
        'duration' => 60,
        'increment' => 60,
        'buffer' => 0,
        'minimumNotice' => 24,
        'maximumAdvance' => 60,
        'allowOverlap' => false,
    ];

    // Legacy booking-only settings remain readable for existing project config.
    public ?string $captchaProvider = null;
    public ?string $captchaSiteKey = null;
    public ?string $captchaSecretKey = null;
    public bool $captchaProtectBookings = true;
    public bool $captchaProtectEvents = false;
    public float|string $recaptchaMinimumScore = 0.5;

    public string $bookingCaptchaProvider = 'none';
    public string $bookingCaptchaSiteKey = '';
    public string $bookingCaptchaSecretKey = '';

    public ?string $descriptionFieldHandle = null;

    public ?string $locationFieldHandle = null;

    public array|bool|null $authoredEventEditOnly = null;

    public ?string $pluginName = null;

    public ?string $bookingPageLabel = null;

    public string $defaultBookingView = 'bookings';

    public ?int $firstDayOfWeek = null;

    public int|string|null $timeFormat = null;

    private static array $overlapThresholds = [
        0 => 0,
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 5,
    ];

    private static array $timeIntervals = [
        5 => 5,
        10 => 10,
        15 => 15,
        30 => 30,
        60 => 60,
    ];

    private static array $eventDurations = [
        30 => 30,
        60 => 60,
        120 => 120,
    ];

    /**
     * Setting default values upon construction.
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->overlapThreshold = self::DEFAULT_DATE_OVERLAP_THRESHOLD;
        $this->timeInterval = self::DEFAULT_TIME_INTERVAL;
        $this->eventDuration = self::DEFAULT_DURATION;
        $this->allDay = self::DEFAULT_ALL_DAY;
        $this->defaultView = self::DEFAULT_VIEW;
        $this->guestAccess = null;
        $this->quickCreateEnabled = self::DEFAULT_ALLOW_QUICK_CREATE;
        $this->isDragAndDropEnabled = self::DEFAULT_IS_DRAG_AND_DROP_ENABLED;
        $this->showDisabledEvents = self::DEFAULT_SHOW_DISABLED_EVENTS;
        $this->authoredEventEditOnly = self::DEFAULT_AUTHORED_EVENT_EDIT_ONLY;
        $this->firstDayOfWeek = self::DEFAULT_FIRST_DAY_OF_WEEK;
        $this->timeFormat = self::TIME_FORMAT_AUTO;
    }

    public function getBookingLabel(): string
    {
        $label = trim($this->bookingPageLabel ?? '');

        return '' !== $label ? $label : Calendar::t('Bookings');
    }

    public function getBookingDefaultPath(): string
    {
        return 'schedule' === $this->defaultBookingView ? 'calendar/bookings/schedule' : 'calendar/bookings';
    }

    public static function getOverlapThresholds(): array
    {
        return self::$overlapThresholds;
    }

    public static function getTimeIntervals(): array
    {
        return self::$timeIntervals;
    }

    public static function getEventDurations(): array
    {
        return self::$eventDurations;
    }

    public function getFirstDayOfWeek(): int
    {
        return (int) $this->firstDayOfWeek;
    }

    public function getDefaultCalendarView(): string
    {
        $enabled = $this->getEnabledCalendarViews();

        if (\in_array($this->defaultCalendarView, $enabled, true)) {
            return $this->defaultCalendarView;
        }

        return \in_array(self::DEFAULT_CALENDAR_VIEW, $enabled, true)
            ? self::DEFAULT_CALENDAR_VIEW
            : $enabled[0];
    }

    public function getEnabledCalendarViews(): array
    {
        $enabled = \is_array($this->enabledCalendarViews)
            ? array_values(array_filter(self::CALENDAR_VIEWS, fn (string $view) => \in_array($view, $this->enabledCalendarViews, true)))
            : [];

        return $enabled ?: self::CALENDAR_VIEWS;
    }

    public function validateEnabledCalendarViews(string $attribute): void
    {
        if (!\is_array($this->enabledCalendarViews) || !$this->enabledCalendarViews) {
            $this->addError($attribute, Calendar::t('Select at least one calendar tab.'));

            return;
        }

        foreach ($this->enabledCalendarViews as $view) {
            if (!\in_array($view, self::CALENDAR_VIEWS, true)) {
                $this->addError($attribute, Calendar::t('Select valid calendar tabs.'));

                return;
            }
        }
    }

    public function validateDefaultCalendarView(string $attribute): void
    {
        if (!\in_array($this->defaultCalendarView, $this->getEnabledCalendarViews(), true)) {
            $this->addError($attribute, Calendar::t('Choose a default tab that is enabled.'));
        }
    }

    public function getBookingDefaults(): SchedulingSettings
    {
        $attributes = array_intersect_key($this->bookingDefaults, array_flip(self::BOOKING_DEFAULT_ATTRIBUTES));
        $attributes['timezone'] = \Craft::$app?->getTimeZone() ?? 'UTC';

        return new SchedulingSettings($attributes);
    }

    public function validateBookingDefaults(): void
    {
        foreach (['duration', 'increment', 'buffer', 'minimumNotice', 'maximumAdvance'] as $attribute) {
            if (\array_key_exists($attribute, $this->bookingDefaults) && false === filter_var($this->bookingDefaults[$attribute], \FILTER_VALIDATE_INT)) {
                $message = Calendar::t('Booking rules must use whole numbers.');
                $this->addError('bookingDefaults', $message);
                $this->addError('bookingDefaults.'.$attribute, $message);
            }
        }
        if ($this->hasErrors('bookingDefaults')) {
            return;
        }

        try {
            $defaults = $this->getBookingDefaults();
        } catch (\TypeError) {
            $this->addError('bookingDefaults', Calendar::t('Enter valid booking defaults.'));

            return;
        }
        if (!$defaults->validate()) {
            foreach ($defaults->getErrors() as $attribute => $messages) {
                foreach ($messages as $message) {
                    $this->addError('bookingDefaults', $message);
                    $this->addError('bookingDefaults.'.$attribute, $message);
                }
            }
        }
    }

    public function getBookingCaptchaSiteKey(): string
    {
        return $this->getCaptchaSiteKey();
    }

    public function getBookingCaptchaSecretKey(): string
    {
        return $this->getCaptchaSecretKey();
    }

    public function getCaptchaProvider(): string
    {
        return $this->captchaProvider ?? $this->bookingCaptchaProvider;
    }

    public function getCaptchaSiteKey(): string
    {
        return trim((string) App::parseEnv($this->captchaSiteKey ?? $this->bookingCaptchaSiteKey));
    }

    public function getCaptchaSecretKey(): string
    {
        return trim((string) App::parseEnv($this->captchaSecretKey ?? $this->bookingCaptchaSecretKey));
    }

    public function validateCaptchaKeys(): void
    {
        if ('none' === $this->getCaptchaProvider() || (!$this->captchaProtectBookings && !$this->captchaProtectEvents)) {
            return;
        }
        foreach (['SiteKey', 'SecretKey'] as $key) {
            $attribute = null !== $this->{'captcha'.$key} ? 'captcha'.$key : 'bookingCaptcha'.$key;
            if ('' === trim($this->{$attribute}) && !$this->hasErrors($attribute)) {
                $this->addError($attribute, Calendar::t('Enter both site and secret keys for the selected CAPTCHA provider.'));
            }
        }
    }

    protected function defineRules(): array
    {
        return array_merge(parent::defineRules(), [
            [['bookingPageLabel'], 'string', 'max' => 100],
            [['defaultBookingView'], 'in', 'range' => ['bookings', 'schedule'], 'skipOnEmpty' => false],
            [['bookingDefaults'], 'validateBookingDefaults', 'skipOnEmpty' => false],
            [['captchaProvider', 'bookingCaptchaProvider'], 'in', 'range' => ['none', 'turnstile', 'hcaptcha', 'recaptcha', 'recaptcha-v3'], 'skipOnEmpty' => false, 'when' => static fn ($model, $attribute) => null !== $model->{$attribute}],
            [['captchaSiteKey', 'captchaSecretKey', 'bookingCaptchaSiteKey', 'bookingCaptchaSecretKey'], 'string', 'max' => 8192],
            [['captchaProvider', 'bookingCaptchaProvider'], 'validateCaptchaKeys', 'skipOnEmpty' => false],
            [['captchaProtectBookings', 'captchaProtectEvents'], 'boolean'],
            [['recaptchaMinimumScore'], 'number', 'min' => 0, 'max' => 1, 'skipOnEmpty' => false],
            [['defaultCalendarView'], 'in', 'range' => self::CALENDAR_VIEWS, 'skipOnEmpty' => false],
            [['enabledCalendarViews'], 'validateEnabledCalendarViews', 'skipOnEmpty' => false],
            [['defaultCalendarView'], 'validateDefaultCalendarView', 'skipOnEmpty' => false],
        ]);
    }
}
