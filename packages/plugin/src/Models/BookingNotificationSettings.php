<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\web\View;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Scheduling\BookingNotifications;
use Twig\Error\Error;

class BookingNotificationSettings extends Model
{
    public const PATH = 'solspace.calendar.bookingNotificationTemplates';
    public const AUDIENCES = ['admin', 'requester'];

    public array $templates = [];

    public static function fromProjectConfig(): self
    {
        $templates = \Craft::$app->getProjectConfig()->get(self::PATH);

        return new self(['templates' => \is_array($templates) ? $templates : []]);
    }

    public function getTemplates(): array
    {
        $templates = [];
        foreach (self::AUDIENCES as $audience) {
            $templates[$audience] = BookingNotifications::defaults($audience);
            foreach (['subject', 'body'] as $field) {
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
                if (!\in_array($field, ['subject', 'body'], true) || !\is_string($source)) {
                    $this->addError($attribute, Calendar::t('Enter valid notification templates.'));

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

    protected function defineRules(): array
    {
        return [['templates', 'validateTemplates', 'skipOnEmpty' => false]];
    }
}
