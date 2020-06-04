<?php

namespace Solspace\Calendar\Console\Controllers;

use craft\base\Element;
use craft\base\ElementInterface;
use craft\console\Controller;
use craft\elements\db\ElementQuery;
use craft\elements\db\ElementQueryInterface;
use craft\events\BatchElementActionEvent;
use craft\helpers\Console;
use craft\services\Elements;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use yii\console\ExitCode;

class EventsController extends Controller
{
    /**
     * @var int|string The ID(s) of the elements to resave.
     */
    public $elementId;

    /**
     * @var string The UUID(s) of the elements to resave.
     */
    public $uid;

    /**
     * @var string|null The site handle to save elements from.
     */
    public $site;

    /**
     * @var string The status(es) of elements to resave. Can be set to multiple comma-separated statuses.
     */
    public $status = 'any';

    /**
     * @var int|null The number of elements to skip.
     */
    public $offset;

    /**
     * @var int|null The number of elements to resave.
     */
    public $limit;

    /**
     * @var bool Whether to save the elements across all their enabled sites.
     */
    public $propagate = true;

    /**
     * @var bool Whether to update the search indexes for the resaved elements.
     */
    public $updateSearchIndex = false;

    public function options($actionID)
    {
        $options   = parent::options($actionID);
        $options[] = 'elementId';
        $options[] = 'uid';
        $options[] = 'site';
        $options[] = 'status';
        $options[] = 'offset';
        $options[] = 'limit';
        $options[] = 'propagate';
        $options[] = 'updateSearchIndex';

        return $options;
    }

    public function actionResave()
    {
        return $this->saveElements(Event::find());
    }

    /**
     * @param ElementQueryInterface $query
     *
     * @return int
     * @since 3.2.0
     */
    private function saveElements(ElementQueryInterface $query): int
    {
        /** @var ElementQuery|EventQuery $query */
        /** @var ElementInterface $elementType */
        $elementType = $query->elementType;

        $query->setLoadOccurrences(false);

        if ($this->elementId) {
            $query->id(is_int($this->elementId) ? $this->elementId : explode(',', $this->elementId));
        }

        if ($this->uid) {
            $query->uid(explode(',', $this->uid));
        }

        if ($this->site) {
            $query->site($this->site);
        }

        if ($this->status === 'any') {
            $query->anyStatus();
        } else if ($this->status) {
            $query->status(explode(',', $this->status));
        }

        if ($this->offset !== null) {
            $query->offset($this->offset);
        }

        if ($this->limit !== null) {
            $query->limit($this->limit);
        }

        $count = (int) $query->count();

        if ($count === 0) {
            $this->stdout('No ' . $elementType::pluralLowerDisplayName() . ' exist for that criteria.' . PHP_EOL, Console::FG_YELLOW);
            return ExitCode::OK;
        }

        $elementsText = $count === 1 ? $elementType::lowerDisplayName() : $elementType::pluralLowerDisplayName();
        $this->stdout("Resaving {$count} {$elementsText} ..." . PHP_EOL, Console::FG_YELLOW);

        $elementsService = \Craft::$app->getElements();
        $fail            = false;

        $beforeCallback = function (BatchElementActionEvent $e) use ($query) {
            if ($e->query === $query) {
                /** @var Element $element */
                $element = $e->element;
                $this->stdout("    - Resaving {$element} ({$element->id}) ... ");
            }
        };

        $afterCallback = function (BatchElementActionEvent $e) use ($query, &$fail) {
            if ($e->query === $query) {
                /** @var Element $element */
                $element = $e->element;
                if ($e->exception) {
                    $this->stderr('error: ' . $e->exception->getMessage() . PHP_EOL, Console::FG_RED);
                    $fail = true;
                } else if ($element->hasErrors()) {
                    $this->stderr('failed: ' . implode(', ', $element->getErrorSummary(true)) . PHP_EOL, Console::FG_RED);
                    $fail = true;
                } else {
                    $this->stdout('done' . PHP_EOL, Console::FG_GREEN);
                }
            }
        };

        $elementsService->on(Elements::EVENT_BEFORE_RESAVE_ELEMENT, $beforeCallback);
        $elementsService->on(Elements::EVENT_AFTER_RESAVE_ELEMENT, $afterCallback);

        $elementsService->resaveElements($query, true, true, $this->updateSearchIndex);

        $elementsService->off(Elements::EVENT_BEFORE_RESAVE_ELEMENT, $beforeCallback);
        $elementsService->off(Elements::EVENT_AFTER_RESAVE_ELEMENT, $afterCallback);

        $this->stdout("Done resaving {$elementsText}." . PHP_EOL . PHP_EOL, Console::FG_YELLOW);
        return $fail ? ExitCode::UNSPECIFIED_ERROR : ExitCode::OK;
    }
}
