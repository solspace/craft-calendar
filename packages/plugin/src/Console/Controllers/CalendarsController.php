<?php

namespace Solspace\Calendar\Console\Controllers;

use craft\console\Controller;
use craft\db\Query;
use craft\db\Table;
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
            $query = (new Query());
            $query->select(['field_layout_tabs.id', 'field_layout_tabs.elements']);
            $query->from(Table::FIELDLAYOUTTABS.' field_layout_tabs');
            $query->innerJoin(Table::FIELDLAYOUTS.' field_layouts', 'field_layout_tabs.[[layoutId]] = field_layouts.[[id]]');
            $query->where(['field_layouts.[[type]]' => 'Solspace\Calendar\Elements\Event']);

            $rows = $query->all();

            foreach ($rows as $row) {
                if (!empty($row['elements'])) {
                    $this->stdout('    > Looking at field layout tabs ID '.$row['id']."\n");

                    $modified = false;

                    $elements = json_decode($row['elements']);
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
                            $this->stdout('    > Updated field layout tabs ID '.$row['id']."\n");

                            Db::update(
                                Table::FIELDLAYOUTTABS,
                                ['elements' => json_encode($elements)],
                                ['id' => $row['id']],
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
