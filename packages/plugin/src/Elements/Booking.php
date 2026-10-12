<?php

namespace Solspace\Calendar\Elements;

use craft\base\Element;
use craft\db\Query;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\helpers\Db;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\BookingQuery;
use Solspace\Calendar\Models\CalendarModel;
use yii\web\ForbiddenHttpException;

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
    public ?\DateTimeImmutable $statusChangedAt = null;
    public ?int $statusChangedById = null;
    public ?string $statusChangedByName = null;
    public ?string $statusChangeSource = null;
    public int $buffer = 0;

    public function __construct($config = [])
    {
        foreach (['startDate', 'endDate', 'statusChangedAt'] as $key) {
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
        return Calendar::getInstance()->bookings->can($this->getCalendar(), 'view', $user);
    }

    public function canSave(User $user): bool
    {
        $service = Calendar::getInstance()->bookings;
        if ($this->trashed) {
            return $service->can($this->getCalendar(), 'restore', $user);
        }
        $previous = $this->id ? (new Query())->from(self::TABLE)->where(['id' => $this->id])->one() : null;

        return $service->can($this->getCalendar(), $previous ? 'edit' : 'create', $user) && $service->canSaveChanges($this, $previous ?: null, $user);
    }

    public function canDelete(User $user): bool
    {
        return Calendar::getInstance()->bookings->can($this->getCalendar(), 'delete', $user);
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
        $previous = (new Query())
            ->from(self::TABLE)->where(['id' => $this->id])->one()
        ;
        $request = \Craft::$app->getRequest();
        $isCp = !$request->getIsConsoleRequest() && $request->getIsCpRequest();
        $user = $isCp ? \Craft::$app->getUser()->getIdentity() : null;
        if ($isCp && (!$user || !Calendar::getInstance()->bookings->canSaveChanges($this, $previous ?: null, $user))) {
            throw new ForbiddenHttpException();
        }
        Calendar::getInstance()->bookings->assertSaveAllowed($this);
        $source = $user ? 'user' : 'system';
        if (!$previous && !$request->getIsConsoleRequest() && !$isCp) {
            $source = self::CONFIRMED === $this->bookingStatus ? 'automatic' : 'customer';
        }
        $this->applyStatusChangeMetadata($previous ?: null, $user, $source, new \DateTimeImmutable('now', new \DateTimeZone('UTC')));
        Db::upsert(self::TABLE, $this->getRecordData());
        parent::afterSave($isNew);
        Calendar::getInstance()->bookings->scheduleNotification($this, $previous ?: null);
    }

    public function beforeDelete(): bool
    {
        $this->requireCpBookingAction('delete');

        return parent::beforeDelete();
    }

    public function beforeRestore(): bool
    {
        $this->requireCpBookingAction('restore');

        return parent::beforeRestore();
    }

    public function afterRestore(): void
    {
        // Craft restores elements without calling afterSave(), inside its restore transaction.
        Calendar::getInstance()->bookings->assertSaveAllowed($this, true);
        Db::update(self::TABLE, ['buffer' => $this->buffer], ['id' => $this->id]);
        parent::afterRestore();
        Calendar::getInstance()->bookings->scheduleNotification($this, $this->getRecordData(), true);
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
            'statusChangedAt' => Db::prepareDateForDb($this->statusChangedAt),
            'statusChangedById' => $this->statusChangedById,
            'statusChangedByName' => $this->statusChangedByName,
            'statusChangeSource' => $this->statusChangeSource,
            'buffer' => $this->buffer,
        ];
    }

    /** Persist the actor only for a real status change, using stored data on ordinary saves. */
    protected function applyStatusChangeMetadata(?array $previous, ?User $user, string $source, \DateTimeImmutable $now): void
    {
        if ($previous && $previous['bookingStatus'] === $this->bookingStatus) {
            $this->statusChangedAt = !empty($previous['statusChangedAt']) ? new \DateTimeImmutable($previous['statusChangedAt'], new \DateTimeZone('UTC')) : null;
            $this->statusChangedById = isset($previous['statusChangedById']) ? (int) $previous['statusChangedById'] : null;
            $this->statusChangedByName = $previous['statusChangedByName'] ?? null;
            $this->statusChangeSource = $previous['statusChangeSource'] ?? null;

            return;
        }

        $this->statusChangedAt = $now;
        $this->statusChangedById = $user?->id;
        $this->statusChangedByName = $user ? mb_substr($user->getFriendlyName(), 0, 255) : null;
        $this->statusChangeSource = $source;
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

    private function requireCpBookingAction(string $action): void
    {
        $request = \Craft::$app->getRequest();
        if (!$request->getIsConsoleRequest() && $request->getIsCpRequest()) {
            Calendar::getInstance()->bookings->assertPermission($this->getCalendar(), $action);
        }
    }
}
