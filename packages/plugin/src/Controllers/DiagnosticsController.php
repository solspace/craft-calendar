<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Resources\Bundles\DiagnosticsBundle;
use yii\web\Response;

class DiagnosticsController extends BaseController
{
    public function actionIndex(): Response
    {
        $this->requireCpRequest();
        $this->requireLogin();
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        \Craft::$app->getView()->registerAssetBundle(DiagnosticsBundle::class);

        return $this->renderTemplate('calendar/settings/_diagnostics', [
            ...Calendar::getInstance()->diagnostics->getDiagnostics(),
            'title' => Calendar::t('Diagnostics'),
            'crumbs' => [
                ['label' => Calendar::getInstance()->name, 'url' => UrlHelper::cpUrl('calendar')],
                ['label' => Calendar::t('Diagnostics'), 'url' => UrlHelper::cpUrl('calendar/settings/diagnostics')],
            ],
        ]);
    }
}
