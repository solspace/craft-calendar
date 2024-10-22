<?php

namespace Solspace\Calendar\Console\Controllers;

use craft\console\Controller;
use craft\db\Query;
use craft\helpers\Console;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use yii\console\ExitCode;

class CalendarsController extends Controller
{
    /**
     * @var bool whether to rebuild project config
     */
    public bool $rebuildProjectConfig = false;

    public function options($actionID): array
    {
        $options = parent::options($actionID);
        $options[] = 'rebuildProjectConfig';

        return $options;
    }

    /**
     * Fixes any duplicate UUIDs found within field layout tabs elements.
     */
    public function actionFixFieldLayoutTabsElementsUids(): int
    {
        $this->stdout("Looking for duplicate UUIDs ...\n");
        $count = 0;
        $this->_fixUids($count);

        if ($count) {
            $summary = sprintf('Fixed %s duplicate %s.', $count, 1 === $count ? 'UUID' : 'UUIDs');
        } else {
            $summary = 'No duplicate UUIDs were found.';
        }

        $this->stdout('Done. ', Console::FG_GREEN);
        $this->stdout("{$summary}\n");

        if ($count && $this->rebuildProjectConfig) {
            $this->stdout("Rebuilding project config ...\n");

            \Craft::$app->projectConfig->rebuild();

            $this->stdout('Done. ', Console::FG_GREEN);
        }

        return ExitCode::OK;
    }

    private function _fixUids(int &$count, array &$uids = []): void
    {
        if (version_compare(\Craft::$app->getVersion(), '5', '<')) {
            $fieldLayouts = (new Query())
                ->select(['fieldLayoutId'])
                ->from('{{%calendar_calendars}}')
                ->all()
            ;

            foreach ($fieldLayouts as $fieldLayout) {
                $fieldLayoutTabsTable = '{{%fieldlayouttabs}}';

                $fieldLayoutTabs = (new Query())
                    ->select(['id', 'elements'])
                    ->from($fieldLayoutTabsTable)
                    ->where(['layoutId' => $fieldLayout['fieldLayoutId']])
                    ->all()
                ;

                foreach ($fieldLayoutTabs as $fieldLayoutTab) {
                    if (!empty($fieldLayoutTab['elements'])) {
                        $this->stdout('    > Looking at field layout tabs ID '.$fieldLayoutTab['id']."\n");

                        $modified = false;

                        $elements = json_decode($fieldLayoutTab['elements']);
                        if (\is_array($elements)) {
                            foreach ($elements as &$element) {
                                $uid = $element->uid;

                                $this->stdout('        > Looking at element UUID '.$uid."\n");

                                if (\in_array($uid, $uids)) {
                                    $element->uid = StringHelper::UUID();

                                    $this->stdout('            > Duplicate UUID found at '.$uid."\n");
                                    $this->stdout('            > Setting to '.$element->uid."\n");

                                    ++$count;
                                    $modified = true;

                                    continue;
                                }

                                $uids[] = $uid;
                            }

                            if ($modified) {
                                Db::update(
                                    $fieldLayoutTabsTable,
                                    ['elements' => json_encode($elements)],
                                    ['id' => $fieldLayoutTab['id']],
                                    [],
                                    false,
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}
