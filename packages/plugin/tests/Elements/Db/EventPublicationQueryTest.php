<?php

namespace Solspace\Tests\Unit\Calendar\Elements\Db;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use yii\db\Connection;
use yii\db\Query;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Elements\Db\EventQuery
 */
class EventPublicationQueryTest extends TestCase
{
    public function testPublicationStatusesSelectTheExpectedEvents(): void
    {
        if (!class_exists(\SQLite3::class)) {
            self::markTestSkipped('SQLite3 is required to exercise the publication conditions.');
        }

        $query = $this->getMockBuilder(EventQuery::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $condition = new \ReflectionMethod(EventQuery::class, 'statusCondition');
        $live = $condition->invoke($query, Event::STATUS_LIVE);
        $now = $live[2][2];
        $before = (new \DateTime($now, new \DateTimeZone('UTC')))->modify('-1 second')->format('Y-m-d H:i:s');
        $after = (new \DateTime($now, new \DateTimeZone('UTC')))->modify('+1 second')->format('Y-m-d H:i:s');
        $db = new \SQLite3(':memory:');
        $db->exec('CREATE TABLE calendar_events (id INTEGER, postDate TEXT, expiryDate TEXT)');
        $db->exec('CREATE TABLE elements (id INTEGER, enabled INTEGER)');
        $db->exec('CREATE TABLE elements_sites (elementId INTEGER, enabled INTEGER)');
        $rows = [
            [1, $before, null, true, true],
            [2, $before, $after, true, true],
            [3, $before, $now, true, true],
            [4, $before, $before, true, true],
            [5, $after, null, true, true],
            [6, $before, null, false, true],
            [7, $before, null, true, false],
        ];
        foreach ($rows as [$id, $postDate, $expiryDate, $enabled, $siteEnabled]) {
            $statement = $db->prepare('INSERT INTO calendar_events VALUES (:id, :post, :expiry)');
            $statement->bindValue(':id', $id, \SQLITE3_INTEGER);
            $statement->bindValue(':post', $postDate, \SQLITE3_TEXT);
            $statement->bindValue(':expiry', $expiryDate, null === $expiryDate ? \SQLITE3_NULL : \SQLITE3_TEXT);
            $statement->execute();
            $db->exec('INSERT INTO elements VALUES ('.$id.', '.(int) $enabled.')');
            $db->exec('INSERT INTO elements_sites VALUES ('.$id.', '.(int) $siteEnabled.')');
        }
        $builder = (new Connection(['dsn' => 'sqlite::memory:']))->getQueryBuilder();
        foreach ([Event::STATUS_LIVE => [1, 2], Event::STATUS_ENABLED => [1, 2], Event::STATUS_PENDING => [5], Event::STATUS_EXPIRED => [3, 4]] as $status => $expected) {
            [$sql, $params] = $builder->build((new Query())
                ->select('calendar_events.id')
                ->from('calendar_events')
                ->innerJoin('elements', 'elements.id = calendar_events.id')
                ->innerJoin('elements_sites', 'elements_sites.elementId = calendar_events.id')
                ->where($condition->invoke($query, $status))
                ->orderBy('calendar_events.id'));
            $statement = $db->prepare($sql);
            foreach ($params as $name => $value) {
                $statement->bindValue($name, $value, \is_bool($value) ? \SQLITE3_INTEGER : \SQLITE3_TEXT);
            }
            $result = $statement->execute();
            $ids = [];
            while ($row = $result->fetchArray(\SQLITE3_ASSOC)) {
                $ids[] = $row['id'];
            }
            self::assertSame($expected, $ids, $status);
        }
        $db->close();
    }

    public function testExpiryQuerySupportsDateRangesAndEmptyDates(): void
    {
        $query = $this->getMockBuilder(EventQuery::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $range = ['and', '>= 2026-10-01', '< 2026-11-01'];
        self::assertSame($query, $query->expiryDate($range));
        self::assertSame($range, $query->expiryDate);
        $query->setExpiryDate(':empty:');
        self::assertSame(':empty:', $query->expiryDate);
        $query->status(null);
        self::assertNull($query->status);
    }
}
