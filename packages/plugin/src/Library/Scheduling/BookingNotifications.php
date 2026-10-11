<?php

namespace Solspace\Calendar\Library\Scheduling;

use craft\web\View;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Models\BookingNotificationSettings;
use Solspace\Calendar\Models\CalendarModel;

class BookingNotifications
{
    public static function defaults(string $audience): array
    {
        if (!\in_array($audience, BookingNotificationSettings::AUDIENCES, true)) {
            throw new \InvalidArgumentException('Invalid notification audience.');
        }

        return [
            'subject' => '{{ calendar.name }} — {{ status }}',
            'body' => file_get_contents(__DIR__.'/../../templates/bookings/notifications/_'.$audience.'.twig'),
        ];
    }

    public static function variables(Booking $booking, CalendarModel $calendar, string $audience): array
    {
        $timezone = $calendar->getSchedulingSettings()->timezone;
        $zone = new \DateTimeZone($timezone);

        return [
            'booking' => $booking,
            'calendar' => $calendar,
            'status' => Booking::statusOptions()[$booking->bookingStatus],
            'statusHandle' => $booking->bookingStatus,
            'date' => $booking->startDate->setTimezone($zone)->format('Y-m-d'),
            'startTime' => $booking->startDate->setTimezone($zone)->format('H:i'),
            'endTime' => $booking->endDate->setTimezone($zone)->format('H:i'),
            'timezone' => $timezone,
            'cpEditUrl' => 'admin' === $audience ? $booking->getCpEditUrl() : null,
        ];
    }

    public static function sampleVariables(string $audience, string $bookingStatus = Booking::REQUESTED): array
    {
        return [
            'booking' => ['id' => 123, 'customerName' => 'Alex Morgan', 'customerEmail' => 'alex@example.com', 'notes' => Calendar::t('Sample booking notes.'), 'bookingStatus' => $bookingStatus, 'startDate' => new \DateTimeImmutable('2026-10-13 09:00', new \DateTimeZone(\Craft::$app->getTimeZone())), 'endDate' => new \DateTimeImmutable('2026-10-13 10:00', new \DateTimeZone(\Craft::$app->getTimeZone()))],
            'calendar' => ['name' => Calendar::t('Example Calendar')],
            'status' => Booking::statusOptions()[$bookingStatus],
            'statusHandle' => $bookingStatus,
            'date' => '2026-10-13', 'startTime' => '09:00', 'endTime' => '10:00', 'timezone' => \Craft::$app->getTimeZone(),
            'cpEditUrl' => 'admin' === $audience ? '#' : null,
        ];
    }

    public static function render(array $template, array $variables): array
    {
        $view = \Craft::$app->getView();
        $subject = $view->renderString(self::source($template['subject'], 'subject'), $variables, View::TEMPLATE_MODE_SITE);
        $subject = trim(preg_replace('/[\r\n]+/', ' ', strip_tags($subject)));
        if ('' === $subject) {
            throw new \RuntimeException('The notification subject is empty.');
        }
        // Only the administrator's saved source is Twig. Booking values remain data.
        $html = $view->renderString(self::source($template['body'], 'body'), $variables, View::TEMPLATE_MODE_SITE, true);
        if ('' === trim($html)) {
            throw new \RuntimeException('The notification body is empty.');
        }
        $text = preg_replace_callback('/<a\b[^>]*\bhref=(["\'])(.*?)\1[^>]*>(.*?)<\/a>/is', static fn (array $match) => $match[3].' ('.$match[2].')', $html);
        $text = preg_replace('/<\s*br\s*\/?\s*>|<\/\s*(?:p|div|h[1-6]|tr|table|li)\s*>/i', "\n", $text);
        $text = trim(html_entity_decode(strip_tags($text), \ENT_QUOTES | \ENT_HTML5, 'UTF-8'));

        return ['subject' => $subject, 'body' => $text, 'htmlBody' => $html];
    }

    public static function source(string $source, string $field): string
    {
        // Explicit strategies also prevent Twig's compiled-string cache from reusing
        // an unescaped subject when the body happens to have identical source text.
        return '{% autoescape '.('body' === $field ? "'html'" : 'false').' %}'.$source.'{% endautoescape %}';
    }

    public static function renderForBooking(Booking $booking, CalendarModel $calendar, string $audience, BookingNotificationSettings $settings): array
    {
        $variables = self::variables($booking, $calendar, $audience);

        try {
            return self::render($settings->getTemplates()[$audience], $variables);
        } catch (\Throwable) {
            // Imported configuration or a removed custom field can invalidate a saved template.
            // Do not include customer data or rendered template contents in the warning.
            \Craft::warning('Could not render the '.$audience.' booking notification template. Using the default template.', __METHOD__);

            return self::render(self::defaults($audience), $variables);
        }
    }
}
