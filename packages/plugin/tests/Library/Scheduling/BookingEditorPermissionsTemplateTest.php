<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Booking;
use Twig\TwigFilter;
use Twig\TwigFunction;

/** @coversNothing */
class BookingEditorPermissionsTemplateTest extends TestCase
{
    public function testViewerAndDetailsOnlyEditorCannotChangeTimeOrStatus(): void
    {
        require_once __DIR__.'/RequestQueueTemplateTest.php';
        $fixture = new RequestQueueTemplateTest('testEmptyQueueHasNoModerationControlsAndHidesZeroCount');
        $twig = $fixture->environment();
        $twig->addFilter(new TwigFilter('datetime', static fn ($date) => $date->format('c')));
        $loader = $twig->getLoader();
        foreach (['edit', '_status-card', '_status-meta', '_status-relative-js', '_confirm-delete-js', '_confirm-delete-css'] as $name) {
            $loader->setTemplate('calendar/bookings/'.$name, str_replace(['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'], ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'], file_get_contents(__DIR__.'/../../../src/templates/bookings/'.$name.'.twig')));
        }
        $loader->setTemplate('calendar/layouts/_layoutWithoutSettings', '{% block actionButton %}{% endblock %}{% block content %}{% endblock %}<script>{% block scripts %}{% endblock %}</script><style>{% block styles %}{% endblock %}</style>');
        $loader->setTemplate('_includes/forms', <<<'TWIG'
            {% macro select(config) %}<select id="{{ config.id }}" name="{{ config.name }}"{{ config.disabled ? ' disabled' }}>{% for value,label in config.options %}<option value="{{ value }}"{{ value == config.value ? ' selected' }}>{{ label }}</option>{% endfor %}</select>{% endmacro %}
            {% macro selectField(config) %}<select id="{{ config.id }}" name="{{ config.name }}"{{ config.disabled ? ' disabled' }}>{% for option in config.options %}<option value="{{ option.value }}"{{ option.value == config.value ? ' selected' }}>{{ option.label }}</option>{% endfor %}</select>{% endmacro %}
            {% macro textField(config) %}<input id="{{ config.id ?? '' }}" name="{{ config.name }}" value="{{ config.value }}"{{ (config.disabled ?? false) ? ' disabled' }}>{% endmacro %}
            {% macro textareaField(config) %}<textarea name="{{ config.name }}">{{ config.value }}</textarea>{% endmacro %}
            {% macro errorList(errors) %}{% endmacro %}
            {% macro checkbox(config) %}<input id="{{ config.id }}" type="checkbox">{% endmacro %}
            TWIG);
        foreach (['actionInput', 'csrfInput', 'redirectInput'] as $name) {
            $twig->addFunction(new TwigFunction($name, static fn (...$args) => ''));
        }
        $twig->addFunction(new TwigFunction('hiddenInput', static fn ($name, $value) => '<input type="hidden" name="'.$name.'" value="'.htmlspecialchars($value).'">', ['is_safe' => ['html']]));
        $booking = new class {
            public int $id = 1;
            public int $calendarId = 7;
            public string $bookingStatus = Booking::REQUESTED;
            public \DateTimeImmutable $startDate;
            public \DateTimeImmutable $endDate;
            public ?\DateTimeImmutable $statusChangedAt = null;
            public string $customerName = 'Customer';
            public string $customerEmail = 'customer@example.test';
            public string $notes = '';

            public function __construct()
            {
                $this->startDate = new \DateTimeImmutable('2026-10-12T14:00:00Z');
                $this->endDate = new \DateTimeImmutable('2026-10-12T14:30:00Z');
            }

            public function getErrors($attribute): array
            {
                return [];
            }

            public function hasErrors($attribute): bool
            {
                return false;
            }
        };
        $field = new class {
            public bool $static;

            public function formHtml($booking, $static): string
            {
                $this->static = $static;

                return '<div>Custom field</div>';
            }
        };
        foreach ([false, true] as $canEdit) {
            $variables = $fixture->variables() + ['booking' => $booking, 'now' => new \DateTimeImmutable(), 'statusOptions' => Booking::statusOptions(), 'fieldLayout' => ['tabs' => [['name' => 'Details', 'elements' => [$field]]]], 'canSaveBooking' => $canEdit, 'canChooseTime' => false, 'canChangeStatus' => false, 'canDeleteBooking' => false];
            $output = $twig->render('calendar/bookings/edit', $variables);
            $dom = new \DOMDocument();
            @$dom->loadHTML($output);
            $xpath = new \DOMXPath($dom);
            self::assertSame(1, $xpath->query('//select[@id="booking-status"][@disabled]')->length);
            self::assertSame(1, $xpath->query('//select[@id="booking-calendar"][@disabled]')->length);
            self::assertSame(1, $xpath->query('//input[@name="calendarId"][@type="hidden"][@value="7"]')->length);
            self::assertSame(1, $xpath->query('//input[@name="bookingStatus"][@type="hidden"][@value="requested"]')->length);
            self::assertSame($canEdit ? 1 : 2, $xpath->query('//fieldset[@disabled]')->length);
            self::assertSame($canEdit ? 1 : 0, $xpath->query('//button[@type="submit"]')->length);
            self::assertSame(0, $xpath->query('//button[@id="booking-delete"]')->length);
            self::assertSame(!$canEdit, $field->static);
        }
    }
}
