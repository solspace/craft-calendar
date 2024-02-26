<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig\Compiler;
use Twig\Node\Node;

class RequireEventEditPermissions_Node extends Node
{
    public function compile(Compiler $compiler)
    {
        $compiler
            ->addDebugInfo($this)
            ->write('\Solspace\Calendar\Calendar::getInstance()->events->requireEventEditPermissions(')
            ->subcompile($this->getNode('event'))
            ->write(");\n")
        ;
    }
}
