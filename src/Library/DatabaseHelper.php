<?php

namespace Solspace\Calendar\Library;


use craft\db\Query;
use craft\helpers\ElementHelper;

class DatabaseHelper
{
    const OPERATOR_EQUALS    = '=';
    const OPERATOR_NOT_EQUAL = '!=';
    const OPERATOR_NOT_IN    = 'not';
    const OPERATOR_IN        = 'in';

    private static $operatorList = [
        self::OPERATOR_NOT_EQUAL,
        self::OPERATOR_NOT_IN,
    ];

    /**
     * Looks through the database to see if a given $slug has been used
     * If it has - increment it with "-1" and try again, up until 100
     *
     * @param string $slug
     *
     * @return string
     */
    public static function getSuitableSlug($slug): string
    {
        $baseSlug = $slug = ElementHelper::createSlug($slug ?? '');
        $iterator = 1;
        while ($iterator <= 100) {
            $result = (new Query())
                ->select(['id'])
                ->from('{{%elements_sites}}')
                ->where(['slug' => $slug])
                ->scalar();

            if ($result) {
                break;
            }

            $slug = $baseSlug . '-' . $iterator++;
        }

        return $slug;
    }

    /**
     * Examine the $value and output an operator and value without the operator in it
     * E.g. - "not 2,3,4" would output ["not", ["2","3","4"]]
     *      - "5" would output ["=", "5"]
     *      - "!= string" would output ["!=", "string"]
     *
     * @param string|array $value
     *
     * @return array - [operator, value]
     */
    public static function prepareOperator($value): array
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
            if (0 === strpos($value, $searchableOperator)) {
                $operator = $searchableOperator;
                $value    = substr($value, $length + 1);

                if ($operator === self::OPERATOR_NOT_IN) {
                    $value = explode(',', $value);
                }

                return [$operator, $value];
            }
        }

        return [$operator, $value];
    }
}
