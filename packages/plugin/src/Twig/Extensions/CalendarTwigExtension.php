<?php

namespace Solspace\Calendar\Twig\Extensions;

class CalendarTwigExtension extends \Twig\Extension\AbstractExtension
{
    /**
     * @deprecated since 1.26 (to be removed in 2.0), not used anymore internally
     */
    public function getName()
    {
        return static::class;
    }

    /**
     * @return \Twig\TokenParser\AbstractTokenParser[]
     */
    public function getTokenParsers()
    {
        return [
            new RequireEventEditPermissions_TokenParser(),
        ];
    }
}
