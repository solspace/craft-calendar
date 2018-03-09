<?php

namespace Solspace\Calendar\Library\CodePack\Components;

interface ComponentInterface
{
    /**
     * ComponentInterface constructor.
     *
     * @param string $location
     */
    public function __construct(string $location);

    /**
     * Calls the installation of this component
     *
     * @param string $prefix
     */
    public function install(string $prefix = null);
}
