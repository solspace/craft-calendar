<?php

namespace Solspace\Calendar\Library\Helpers;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\ElementHelper;

class DatabaseHelper
{
    public const OPERATOR_EQUALS = '=';
    public const OPERATOR_NOT_EQUAL = '!=';
    public const OPERATOR_NOT_IN = 'not';
    public const OPERATOR_IN = 'in';

    private static array $operatorList = [
        self::OPERATOR_NOT_EQUAL,
        self::OPERATOR_NOT_IN,
    ];

    /**
     * Looks through the database to see if a given $slug has been used
     * If it has - increment it with "-1" and try again, up until 100.
     */
    public static function getSuitableSlug(string $slug): string
    {
        $baseSlug = $slug = ElementHelper::normalizeSlug($slug);
        $iterator = 1;
        while ($iterator <= 100) {
            $result = (new Query())
                ->select(['id'])
                ->from(Table::ELEMENTS_SITES)
                ->where(['slug' => $slug])
                ->scalar()
            ;

            if ($result) {
                break;
            }

            $slug = $baseSlug.'-'.$iterator++;
        }

        return $slug;
    }

    /**
     * Examine the $value and output an operator and value without the operator in it
     * E.g. - "not 2,3,4" would output ["not", ["2","3","4"]]
     *      - "5" would output ["=", "5"]
     *      - "!= string" would output ["!=", "string"].
     *
     * @return array - [operator, value]
     */
    public static function prepareOperator(array|string $value): array
    {
        if (\is_array($value)) {
            $firstValue = reset($value);

            if (\in_array($firstValue, self::$operatorList, true)) {
                $operator = array_shift($value);
            } else {
                $operator = self::OPERATOR_IN;
            }

            return [$operator, $value];
        }

        $operator = self::OPERATOR_EQUALS;
        foreach (self::$operatorList as $searchableOperator) {
            $length = \strlen($searchableOperator);
            if (str_starts_with($value, $searchableOperator)) {
                $operator = $searchableOperator;
                $value = substr($value, $length + 1);

                if (self::OPERATOR_NOT_IN === $operator) {
                    $operator = 'NOT IN';
                    $value = explode(',', $value);
                }

                return [$operator, $value];
            }
        }

        return [$operator, $value];
    }
}
