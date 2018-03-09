<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig_Token;

class RequireEventEditPermissions_TokenParser extends \Twig_TokenParser
{
    public function parse(Twig_Token $token)
    {
        $lineNumber = $token->getLine();
        $parser     = $this->parser;

        $event = $parser->getExpressionParser()->parseExpression();

        $parser->getStream()->expect(Twig_Token::BLOCK_END_TYPE);

        return new RequireEventEditPermissions_Node(array('event' => $event), array(), $lineNumber, $this->getTag());
    }

    public function getTag()
    {
        return 'requireEventEditPermissions';
    }

}
