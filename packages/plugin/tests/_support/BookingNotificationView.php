<?php

namespace Solspace\Tests\Unit\Calendar\Support;

use craft\web\twig\Environment;
use craft\web\View;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;

/** Uses Craft's real string-rendering and escaping with a small template environment. */
class BookingNotificationView extends View
{
    private Environment $environment;
    private string $mode = self::TEMPLATE_MODE_CP;

    public function init(): void
    {
        $this->environment = new Environment(new ArrayLoader(), ['strict_variables' => true]);
        $this->environment->addFilter(new TwigFilter('t', static fn ($text, $category, $params = []) => \Craft::t($category, $text, $params)));
    }

    public function getTwig(?string $templateMode = null): Environment
    {
        return $this->environment;
    }

    public function getTemplateMode(): string
    {
        return $this->mode;
    }

    public function setTemplateMode(string $templateMode): void
    {
        $this->mode = $templateMode;
    }
}
