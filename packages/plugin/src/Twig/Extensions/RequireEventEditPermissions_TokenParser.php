<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig\Token;
use Twig\TokenParser\AbstractTokenParser;

class RequireEventEditPermissions_TokenParser extends AbstractTokenParser
{
    public function parse(Token $token)
    {
        $lineNumber = $token->getLine();
        $parser = $this->parser;

        $event = $parser->getExpressionParser()->parseExpression();

        $parser->getStream()->expect(Token::BLOCK_END_TYPE);

        return new RequireEventEditPermissions_Node(['event' => $event], [], $lineNumber, $this->getTag());
    }

    public function getTag()
    {
        return 'requireEventEditPermissions';
    }
}
