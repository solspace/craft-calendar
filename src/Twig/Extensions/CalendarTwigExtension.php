<?php

namespace Solspace\Calendar\Twig\Extensions;

class CalendarTwigExtension extends \Twig_Extension
{
    /**
     * @deprecated since 1.26 (to be removed in 2.0), not used anymore internally
     */
    public function getName()
    {
        return get_class($this);
    }

    /**
     * @return \Twig_TokenParser[]
     */
    public function getTokenParsers()
    {
        return array(
            new RequireEventEditPermissions_TokenParser(),
        );
    }

}
