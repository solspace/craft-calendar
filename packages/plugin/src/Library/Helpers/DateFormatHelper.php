<?php

namespace Solspace\Calendar\Library\Helpers;

class DateFormatHelper
{
    public static function toJsDateFormat(string $phpFormat): array
    {
        $format = [];

        foreach (str_split($phpFormat) as $character) {
            switch ($character) {
                case 'Y':
                    $format['year'] = 'numeric';

                    break;

                case 'y':
                    $format['year'] = '2-digit';

                    break;

                case 'F':
                    $format['month'] = 'long';

                    break;

                case 'M':
                    $format['month'] = 'short';

                    break;

                case 'm':
                    $format['month'] = '2-digit';

                    break;

                case 'n':
                    $format['month'] = 'numeric';

                    break;

                case 'd':
                    $format['day'] = '2-digit';

                    break;

                case 'j':
                    $format['day'] = 'numeric';

                    break;

                case 'l':
                    $format['weekday'] = 'long';

                    break;

                case 'D':
                    $format['weekday'] = 'short';

                    break;

                case 'H':
                    $format['hour'] = '2-digit';
                    $format['hour12'] = false;

                    break;

                case 'G':
                    $format['hour'] = 'numeric';
                    $format['hour12'] = false;

                    break;

                case 'h':
                    $format['hour'] = '2-digit';
                    $format['hour12'] = true;

                    break;

                case 'g':
                    $format['hour'] = 'numeric';
                    $format['hour12'] = true;

                    break;

                case 'i':
                    $format['minute'] = '2-digit';

                    break;

                case 's':
                    $format['second'] = '2-digit';

                    break;

                case 'A':
                    $format['meridiem'] = 'short';

                    break;

                case 'a':
                    $format['meridiem'] = 'lowercase';

                    break;
            }
        }

        return $format;
    }

    public static function toDatePickerFormat(string $phpFormat): string
    {
        $tokens = [
            'd' => 'dd',
            'D' => 'EEE',
            'j' => 'd',
            'l' => 'EEEE',
            'N' => 'i',
            'w' => 'e',
            'z' => 'DDD',
            'W' => 'II',
            'F' => 'MMMM',
            'm' => 'MM',
            'M' => 'MMM',
            'n' => 'M',
            'o' => 'RRRR',
            'Y' => 'yyyy',
            'y' => 'yy',
            'a' => 'aaa',
            'A' => 'aa',
            'g' => 'h',
            'G' => 'H',
            'h' => 'hh',
            'H' => 'HH',
            'i' => 'mm',
            's' => 'ss',
            'u' => 'SSSSSS',
            'v' => 'SSS',
            'O' => 'xx',
            'P' => 'xxx',
            'T' => 'zzz',
            'c' => "yyyy-MM-dd'T'HH:mm:ssxxx",
            'r' => 'EEE, dd MMM yyyy HH:mm:ss xx',
            'U' => 't',
        ];

        $format = '';
        $literal = '';
        $isEscaped = false;
        $skipNextCharacter = false;
        $characters = str_split($phpFormat);

        foreach ($characters as $index => $character) {
            if ($skipNextCharacter) {
                $skipNextCharacter = false;

                continue;
            }

            if ($isEscaped) {
                $literal .= $character;
                $isEscaped = false;

                continue;
            }

            if ('\\' === $character) {
                $isEscaped = true;

                continue;
            }

            if (('d' === $character || 'j' === $character) && 'S' === ($characters[$index + 1] ?? null)) {
                $format .= self::escapeDatePickerLiteral($literal);
                $literal = '';
                $format .= 'do';
                $skipNextCharacter = true;

                continue;
            }

            if (isset($tokens[$character])) {
                $format .= self::escapeDatePickerLiteral($literal);
                $literal = '';
                $format .= $tokens[$character];

                continue;
            }

            $format .= self::escapeDatePickerLiteral($literal);
            $literal = '';
            $format .= self::escapeDatePickerLiteral($character);
        }

        return $format.self::escapeDatePickerLiteral($literal);
    }

    private static function escapeDatePickerLiteral(string $literal): string
    {
        if ('' === $literal) {
            return '';
        }

        if (preg_match('/[A-Za-z]/', $literal)) {
            return "'".str_replace("'", "''", $literal)."'";
        }

        return $literal;
    }
}
