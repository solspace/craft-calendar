<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\web\View;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Scheduling\BookingNotifications;
use Twig\Error\Error;
use yii\validators\EmailValidator;

class BookingNotificationSettings extends Model
{
    public const PATH = 'solspace.calendar.bookingNotificationTemplates';
    public const AUDIENCES = ['admin', 'requester'];
    public const EVENTS = ['created', 'confirmed', 'declined', 'cancelled', 'requested', 'changed', 'restored'];
    public const DELIVERY_FIELDS = ['fromEmail', 'fromName', 'replyTo', 'cc', 'bcc'];

    public array $templates = [];

    public static function fromProjectConfig(): self
    {
        $templates = \Craft::$app->getProjectConfig()->get(self::PATH);

        return new self(['templates' => \is_array($templates) ? $templates : []]);
    }

    public static function eventOptions(): array
    {
        return array_map(static fn ($label) => Calendar::t($label), [
            'created' => 'New booking submitted',
            'confirmed' => 'Booking confirmed',
            'declined' => 'Booking declined',
            'cancelled' => 'Booking cancelled',
            'requested' => 'Status changed to Requested',
            'changed' => 'Booking time or calendar changed',
            'restored' => 'Booking restored from Trash',
        ]);
    }

    /** Missing controls keep the existing notification behavior; explicit empty triggers send nothing. */
    public function getSendingSettings(string $audience): array
    {
        if (!\in_array($audience, self::AUDIENCES, true)) {
            throw new \InvalidArgumentException('Invalid notification audience.');
        }
        $template = $this->templates[$audience] ?? [];
        $template = \is_array($template) ? $template : [];
        $enabled = !\array_key_exists('enabled', $template) || \in_array($template['enabled'], [true, 1, '1'], true);
        $events = \array_key_exists('events', $template) ? $template['events'] : self::EVENTS;

        return ['enabled' => $enabled, 'events' => \is_array($events) ? array_values(array_intersect(self::EVENTS, array_filter($events, 'is_string'))) : []];
    }

    public function shouldSend(string $audience, array $events): bool
    {
        $settings = $this->getSendingSettings($audience);

        return $settings['enabled'] && (bool) array_intersect($settings['events'], $events);
    }

    public function getTemplates(): array
    {
        $templates = [];
        foreach (self::AUDIENCES as $audience) {
            $templates[$audience] = BookingNotifications::defaults($audience);
            foreach (array_merge(['subject', 'body'], self::DELIVERY_FIELDS) as $field) {
                $source = $this->templates[$audience][$field] ?? null;
                if (\is_string($source) && '' !== trim($source)) {
                    $templates[$audience][$field] = $source;
                }
            }
        }

        return $templates;
    }

    public function validateTemplates(): void
    {
        foreach ($this->templates as $audience => $template) {
            if (!\in_array($audience, self::AUDIENCES, true) || !\is_array($template)) {
                $this->addError('templates', Calendar::t('Enter valid notification templates.'));

                continue;
            }
            foreach ($template as $field => $source) {
                $attribute = 'templates.'.$audience.'.'.$field;
                if ('enabled' === $field) {
                    if (!\is_bool($source) && !\in_array($source, [0, 1, '0', '1'], true)) {
                        $this->addError($attribute, Calendar::t('Choose whether notification emails are enabled.'));
                    } else {
                        $this->templates[$audience][$field] = (bool) $source;
                    }

                    continue;
                }
                if ('events' === $field) {
                    // Craft's checkbox group posts an empty string when all boxes are unchecked.
                    if ('' === $source) {
                        $source = [];
                    }
                    if (!\is_array($source) || array_filter($source, static fn ($event) => !\is_string($event) || !\in_array($event, self::EVENTS, true))) {
                        $this->addError($attribute, Calendar::t('Choose valid booking notification triggers.'));
                    } else {
                        $this->templates[$audience][$field] = array_values(array_unique($source));
                    }

                    continue;
                }
                if (!\in_array($field, array_merge(['subject', 'body'], self::DELIVERY_FIELDS), true) || !\is_string($source)) {
                    $this->addError($attribute, Calendar::t('Enter valid notification templates.'));

                    continue;
                }
                if (\in_array($field, self::DELIVERY_FIELDS, true)) {
                    $error = $this->deliveryError($field, $source);
                    if (null !== $error) {
                        $this->addError($attribute, $error);
                    }

                    continue;
                }
                if (mb_strlen($source) > ('subject' === $field ? 1000 : 100000)) {
                    $this->addError($attribute, Calendar::t('The notification template is too long.'));

                    continue;
                }
                if ('' === trim($source)) {
                    continue;
                }

                try {
                    // Compile only: saving settings must not execute template code.
                    \Craft::$app->getView()->getTwig(View::TEMPLATE_MODE_SITE)->createTemplate(BookingNotifications::source($source, $field));
                } catch (Error $exception) {
                    $this->addError($attribute, Calendar::t('Invalid Twig template: {error}', ['error' => $exception->getRawMessage()]));
                }
            }
        }
    }

    public function getDeliverySettings(string $audience): array
    {
        $template = $this->getTemplates()[$audience];
        $settings = [];
        foreach (self::DELIVERY_FIELDS as $field) {
            // Ignore invalid imported headers rather than breaking booking delivery.
            $value = null === $this->deliveryError($field, $template[$field]) ? trim($template[$field]) : '';
            $settings[$field] = \in_array($field, ['cc', 'bcc'], true) ? $this->addresses($value) : ('' === $value ? null : $value);
        }

        return $settings;
    }

    protected function defineRules(): array
    {
        return [['templates', 'validateTemplates', 'skipOnEmpty' => false]];
    }

    private function deliveryError(string $field, string $value): ?string
    {
        if (mb_strlen($value) > (\in_array($field, ['cc', 'bcc'], true) ? 10000 : 255)) {
            return Calendar::t('The notification delivery setting is too long.');
        }
        if ('' === trim($value)) {
            return null;
        }
        if (!\in_array($field, ['cc', 'bcc'], true) && preg_match('/[\x00-\x1f\x7f]/', $value)) {
            return Calendar::t('Enter a single line without control characters.');
        }
        if ('fromName' === $field) {
            return null;
        }
        $addresses = \in_array($field, ['cc', 'bcc'], true) ? $this->addresses($value) : [trim($value)];
        if (\count($addresses) > 100) {
            return Calendar::t('Enter no more than 100 email addresses.');
        }
        $validator = new EmailValidator();
        if (!$addresses) {
            return Calendar::t('Enter valid email addresses, separated by commas or new lines.');
        }
        foreach ($addresses as $address) {
            if (!$validator->validate($address)) {
                return Calendar::t('Enter valid email addresses, separated by commas or new lines.');
            }
        }

        return null;
    }

    private function addresses(string $value): array
    {
        $addresses = array_filter(array_map('trim', preg_split('/[,\r\n]+/', $value)), static fn (string $address) => '' !== $address);
        $unique = [];
        foreach ($addresses as $address) {
            $unique[strtolower($address)] ??= $address;
        }

        return array_values($unique);
    }
}
