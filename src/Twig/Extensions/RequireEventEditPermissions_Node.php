<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig_Compiler;

class RequireEventEditPermissions_Node extends \Twig_Node
{
    public function compile(Twig_Compiler $compiler)
    {
        $compiler
            ->addDebugInfo($this)
            ->write('\Solspace\Calendar\Calendar::getInstance()->events->requireEventEditPermissions(')
            ->subcompile($this->getNode('event'))
            ->write(");\n")
        ;
    }
}
