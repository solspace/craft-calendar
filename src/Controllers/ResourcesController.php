<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\ResourcesBundle;
use yii\web\Response;

class ResourcesController extends BaseController
{
    /**
     * @return Response
     */
    public function actionIndex(): Response
    {
        return $this->redirect(UrlHelper::cpUrl('calendar/resources/community'));
    }

    /**
     * @return Response
     */
    public function actionCommunity(): Response
    {
        ResourcesBundle::register(\Craft::$app->getView());

        return $this->renderTemplate(
            'calendar/resources/community',
            [
                'icons' => $this->getIcons(['so', 'discord']),
            ]
        );
    }

    /**
     * @return Response
     */
    public function actionExplore(): Response
    {
        ResourcesBundle::register(\Craft::$app->getView());

        return $this->renderTemplate(
            'calendar/resources/explore',
            [
                'isPro' => Calendar::getInstance()->isPro(),
                'icons' => $this->getIcons(['freeform', 'calendar', 'express', 'develop']),
            ]
        );
    }

    /**
     * @return Response
     */
    public function actionSupport(): Response
    {
        ResourcesBundle::register(\Craft::$app->getView());

        return $this->renderTemplate(
            'calendar/resources/support',
            [
                'icons' => $this->getIcons(['github', 'support', 'feedback', 'newsletter']),
            ]
        );
    }

    /**
     * @param array $names
     *
     * @return array
     */
    private function getIcons(array $names): array
    {
        $path = __DIR__ . '/../Resources/Bundles/Assets/Resources/';

        $urls = [];
        foreach ($names as $name) {
            $urls[$name] = file_get_contents($path . $name . '.svg');
        }

        return $urls;
    }
}
