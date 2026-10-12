<?php

namespace Solspace\Calendar\Library\Scheduling;

use craft\helpers\Db;
use craft\helpers\StringHelper;
use yii\db\Expression;

/** One atomic counter per IP/hour, shared by every application worker. */
class BookingRateLimit
{
    public const TABLE = '{{%calendar_booking_rate_limits}}';

    public function consume(string $ip, ?int $now = null): bool
    {
        $now ??= time();
        $window = intdiv($now, 3600);
        $id = hash('sha256', $ip.':'.$window);
        $db = \Craft::$app->getDb();
        $db->createCommand()->upsert(self::TABLE, [
            'id' => $id,
            'attempts' => 0,
            'expiresAt' => Db::prepareDateForDb(new \DateTimeImmutable('@'.(($window + 1) * 3600))),
            'dateCreated' => Db::prepareDateForDb(new \DateTimeImmutable('@'.$now)),
            'dateUpdated' => Db::prepareDateForDb(new \DateTimeImmutable('@'.$now)),
            'uid' => StringHelper::UUID(),
        ], false)->execute();
        $accepted = 1 === $db->createCommand()->update(self::TABLE, [
            'attempts' => new Expression('[[attempts]] + 1'),
        ], ['and', ['id' => $id], ['<', 'attempts', 20]])->execute();
        if (1 === random_int(1, 100)) {
            $this->prune($now);
        }

        return $accepted;
    }

    public function prune(?int $now = null): void
    {
        \Craft::$app->getDb()->createCommand()->delete(self::TABLE, ['<=', 'expiresAt', Db::prepareDateForDb(new \DateTimeImmutable('@'.($now ?? time())))])->execute();
    }
}
