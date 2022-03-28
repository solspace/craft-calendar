<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig\Token;

class RequireEventEditPermissions_TokenParser extends \Twig\TokenParser\AbstractTokenParser
{
    public function parse(\Twig\Token $token)
    {
        $lineNumber = $token->getLine();
        $parser = $this->parser;

        $event = $parser->getExpressionParser()->parseExpression();

        $parser->getStream()->expect(\Twig\Token::BLOCK_END_TYPE);

        return new RequireEventEditPermissions_Node(['event' => $event], [], $lineNumber, $this->getTag());
    }

    public function getTag()
    {
        return 'requireEventEditPermissions';
    }
}
