<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig\Compiler;

class RequireEventEditPermissions_Node extends \Twig\Node\Node
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
