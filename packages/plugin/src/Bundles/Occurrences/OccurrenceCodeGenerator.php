<?php

namespace Solspace\Calendar\Bundles\Occurrences;

/**
 * Generates occurrence codes: short, URL-safe and unique across the install.
 */
class OccurrenceCodeGenerator
{
    public const LENGTH = 5;

    // No vowels, so a random code can't spell out a word in a public URL
    public const ALPHABET = '0123456789bcdfghjklmnpqrstvwxyz';

    private const MAX_ATTEMPTS = 20;

    /**
     * @param callable(string[]): string[] $findTaken returns the given codes that are already in use
     *
     * @return string[] codes that are unique among themselves and weren't reported as taken
     */
    public function generateUnique(int $count, callable $findTaken): array
    {
        $codes = [];

        for ($attempt = 1; \count($codes) < $count; ++$attempt) {
            if ($attempt > self::MAX_ATTEMPTS) {
                throw new \RuntimeException('Could not generate unique occurrence codes');
            }

            $candidates = [];
            while (\count($codes) + \count($candidates) < $count) {
                $candidate = $this->generate();
                if (!isset($codes[$candidate]) && !isset($candidates[$candidate])) {
                    $candidates[$candidate] = true;
                }
            }

            $candidates = array_map('strval', array_keys($candidates));
            $taken = array_flip(array_map('strval', $findTaken($candidates)));

            foreach ($candidates as $candidate) {
                if (!isset($taken[$candidate])) {
                    $codes[$candidate] = true;
                }
            }
        }

        return array_map('strval', array_keys($codes));
    }

    public function generate(): string
    {
        $max = \strlen(self::ALPHABET) - 1;

        $code = '';
        for ($i = 0; $i < self::LENGTH; ++$i) {
            $code .= self::ALPHABET[random_int(0, $max)];
        }

        return $code;
    }
}
