<?php

namespace Solspace\Calendar\Elements;

use craft\base\Element;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\helpers\Db;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\BookingQuery;
use Solspace\Calendar\Models\CalendarModel;

class Booking extends Element
{
    public const TABLE = '{{%calendar_bookings}}';
    public const REQUESTED = 'requested';
    public const CONFIRMED = 'confirmed';
    public const DECLINED = 'declined';
    public const CANCELLED = 'cancelled';

    public ?int $calendarId = null;
    public ?\DateTimeImmutable $startDate = null;
    public ?\DateTimeImmutable $endDate = null;
    public string $customerName = '';
    public string $customerEmail = '';
    public string $notes = '';
    public string $bookingStatus = self::REQUESTED;
    public int $buffer = 0;

    public function __construct($config = [])
    {
        foreach (['startDate', 'endDate'] as $key) {
            if (isset($config[$key]) && \is_string($config[$key])) {
                $config[$key] = new \DateTimeImmutable($config[$key], new \DateTimeZone('UTC'));
            }
        }
        parent::__construct($config);
    }

    public function init(): void
    {
        parent::init();
        $this->siteId = \Craft::$app->getSites()->getPrimarySite()->id;
    }

    public static function displayName(): string
    {
        return Calendar::t('Booking');
    }

    public static function lowerDisplayName(): string
    {
        return Calendar::t('booking');
    }

    public static function pluralDisplayName(): string
    {
        return Calendar::t('Bookings');
    }

    public static function pluralLowerDisplayName(): string
    {
        return Calendar::t('bookings');
    }

    public static function hasTitles(): bool
    {
        return true;
    }

    public static function hasContent(): bool
    {
        return true;
    }

    public static function find(): ElementQueryInterface
    {
        return new BookingQuery(static::class);
    }

    public static function statusOptions(): array
    {
        return [self::REQUESTED => Calendar::t('Requested'), self::CONFIRMED => Calendar::t('Confirmed'), self::DECLINED => Calendar::t('Declined'), self::CANCELLED => Calendar::t('Cancelled')];
    }

    public function getCalendar(): ?CalendarModel
    {
        return Calendar::getInstance()->calendars->getCalendarById($this->calendarId);
    }

    public function getFieldLayout(): ?FieldLayout
    {
        return Calendar::getInstance()->bookings->getFieldLayout();
    }

    public function getCpEditUrl(): ?string
    {
        return UrlHelper::cpUrl('calendar/bookings/'.$this->id);
    }

    public function canView(User $user): bool
    {
        return Calendar::getInstance()->bookings->canManage($this->getCalendar(), $user);
    }

    public function canSave(User $user): bool
    {
        return $this->canView($user);
    }

    public function canDelete(User $user): bool
    {
        return $this->canView($user);
    }

    public function canDuplicate(User $user): bool
    {
        return false;
    }

    public function canCreateDrafts(User $user): bool
    {
        return false;
    }

    public function beforeSave(bool $isNew): bool
    {
        $this->fieldLayoutId = $this->getFieldLayout()?->id;
        $this->title = mb_substr($this->customerName.' — '.$this->startDate?->format('Y-m-d H:i'), 0, 255);

        return parent::beforeSave($isNew);
    }

    public function afterSave(bool $isNew): void
    {
        // This runs inside Craft's element transaction, including saves through native APIs.
        Calendar::getInstance()->bookings->assertSaveAllowed($this);
        Db::upsert(self::TABLE, $this->getRecordData());
        parent::afterSave($isNew);
    }

    public function getRecordData(): array
    {
        return [
            'id' => $this->id,
            'calendarId' => $this->calendarId,
            'startDate' => Db::prepareDateForDb($this->startDate),
            'endDate' => Db::prepareDateForDb($this->endDate),
            'customerName' => $this->customerName,
            'customerEmail' => $this->customerEmail,
            'notes' => $this->notes,
            'bookingStatus' => $this->bookingStatus,
            'buffer' => $this->buffer,
        ];
    }

    protected function defineRules(): array
    {
        return array_merge(parent::defineRules(), [
            [['calendarId', 'startDate', 'endDate', 'customerName', 'customerEmail'], 'required'],
            [['customerName', 'customerEmail'], 'string', 'max' => 255],
            [['customerEmail'], 'email'],
            [['notes'], 'string', 'max' => 10000],
            [['bookingStatus'], 'in', 'range' => array_keys(self::statusOptions())],
        ]);
    }
}
