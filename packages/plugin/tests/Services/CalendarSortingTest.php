<?php

namespace Solspace\Tests\Unit\Calendar\Services;

use craft\db\Query;
use GraphQL\Error\UserError;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Services\CalendarsService;
use yii\base\Event;
use yii\db\Connection;
use yii\db\QueryBuilder;

/**
 * @internal
 *
 * @coversNothing
 */
class CalendarSortingTest extends TestCase
{
    private ?Query $query = null;
    private \Closure $queryHandler;

    protected function setUp(): void
    {
        if (!class_exists(\Yii::class)) {
            require \dirname((new \ReflectionClass(Event::class))->getFileName()).'/../Yii.php';
        }

        // Capture the real service query without opening a database connection.
        $this->queryHandler = function (Event $event): void {
            $this->query = $event->sender;
            $this->query->emulateExecution = true;
        };
        Event::on(Query::class, Query::EVENT_INIT, $this->queryHandler);
    }

    protected function tearDown(): void
    {
        Event::off(Query::class, Query::EVENT_INIT, $this->queryHandler);
    }

    /** @dataProvider unsafeOrderProvider */
    public function testUnsafeOrderingIsRejectedBeforeBuildingAQuery(mixed $orderBy): void
    {
        $this->expectException(UserError::class);
        $this->expectExceptionMessage('Invalid calendar orderBy property.');

        try {
            (new CalendarsService())->getResolvedCalendars(['orderBy' => $orderBy]);
        } finally {
            self::assertNull($this->query);
        }
    }

    public static function unsafeOrderProvider(): array
    {
        return [
            'boolean oracle' => ["(CASE WHEN (SELECT SUBSTRING(password,1,1) FROM users WHERE id=1)='a' THEN id ELSE name END)"],
            'MySQL delay' => ['(SELECT SLEEP(1))'],
            'PostgreSQL delay' => ['(SELECT pg_sleep(1))'],
            'column quoting bypass' => ['[[name]]'],
            'qualified quoting bypass' => ['calendar.[[name]]'],
            'SQL direction' => ['name DESC'],
            'multiple columns' => ['name, id'],
            'SQL comment' => ['name--'],
            'other table' => ['users.password'],
            'unknown property' => ['notAColumn'],
            'empty property' => [''],
            'array' => [['name']],
            'integer' => [1],
        ];
    }

    /** @dataProvider safeOrderProvider */
    public function testSafeOrderingUsesQuotedCalendarColumns(string $driver, array $arguments, string $column, int $direction): void
    {
        $arguments += ['uid' => ['allowed-calendar'], 'limit' => 2, 'offset' => 1];
        self::assertSame([], (new CalendarsService())->getResolvedCalendars($arguments));
        self::assertNotNull($this->query);
        self::assertSame(['calendar.'.$column => $direction], $this->query->orderBy);
        self::assertSame(['uid' => ['allowed-calendar']], $this->query->where);
        self::assertSame(2, $this->query->limit);
        self::assertSame(1, $this->query->offset);

        $db = $this->getMockBuilder(Connection::class)
            ->onlyMethods(['open'])
            ->getMock()
        ;
        $db->dsn = $driver.':host=unused;dbname=unused';
        $db->expects(self::never())->method('open');
        $quote = 'mysql' === $driver ? '`' : '"';
        $expected = 'ORDER BY '.$quote.'calendar'.$quote.'.'.$quote.$column.$quote;
        if (\SORT_DESC === $direction) {
            $expected .= ' DESC';
        }

        self::assertSame($expected, (new QueryBuilder($db))->buildOrderBy($this->query->orderBy));
    }

    public static function safeOrderProvider(): array
    {
        $cases = [
            'default' => [[], 'id', \SORT_ASC],
            'null default' => [['orderBy' => null], 'id', \SORT_ASC],
            'name ascending' => [['orderBy' => 'name'], 'name', \SORT_ASC],
            'handle descending' => [['orderBy' => 'handle', 'sort' => 'desc'], 'handle', \SORT_DESC],
            'uid descending' => [['orderBy' => 'uid', 'sort' => 'DESC'], 'uid', \SORT_DESC],
            'qualified name' => [['orderBy' => 'calendar.name'], 'name', \SORT_ASC],
            'sort remains sanitized' => [['orderBy' => 'id', 'sort' => 'desc; SELECT 1'], 'id', \SORT_ASC],
            'existing property' => [['orderBy' => 'titleTranslationMethod'], 'titleTranslationMethod', \SORT_ASC],
            'calendar type' => [['orderBy' => 'type'], 'type', \SORT_ASC],
            'created date' => [['orderBy' => 'dateCreated'], 'dateCreated', \SORT_ASC],
        ];

        $data = [];
        foreach (['mysql', 'pgsql'] as $driver) {
            foreach ($cases as $name => $case) {
                $data[$driver.' '.$name] = [$driver, ...$case];
            }
        }

        return $data;
    }
}
