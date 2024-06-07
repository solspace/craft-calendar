<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\CodePack\CodePack;
use Solspace\Calendar\Library\CodePack\Exceptions\FileObject\FileObjectException;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Resources\Bundles\CodePackBundle;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

class CodePackController extends BaseController
{
    public const FLASH_VAR_KEY = 'codepack_prefix';

    private bool $isCraft5 = true;

    /**
     * @throws ForbiddenHttpException
     */
    public function init(): void
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        $this->isCraft5 = version_compare(\Craft::$app->getVersion(), '5.0.0', '>=');

        parent::init();
    }

    /**
     * Show CodePack contents
     * Provide means to prefix the CodePack.
     */
    public function actionListContents(): Response
    {
        $this->view->registerAssetBundle(CodePackBundle::class);

        $crumbs = [
            [
                'label' => Calendar::t(Calendar::getInstance()->name),
                'url' => UrlHelper::cpUrl('calendar'),
            ],
            [
                'label' => Calendar::t('Settings'),
                'url' => UrlHelper::cpUrl('calendar/settings'),
            ],
            [
                'label' => Calendar::t('Demo Templates'),
                'url' => UrlHelper::cpUrl('calendar/settings/demo-templates'),
                'current' => true,
            ],
        ];

        $codePack = $this->getCodePack();

        $postInstallPrefix = \Craft::$app->session->getFlash(self::FLASH_VAR_KEY);
        if ($postInstallPrefix) {
            return $this->renderTemplate(
                'calendar/codepack/_post_install',
                [
                    'isCraft5' => $this->isCraft5,
                    'crumbs' => $crumbs,
                    'codePack' => $codePack,
                    'prefix' => CodePack::getCleanPrefix($postInstallPrefix),
                ]
            );
        }

        return $this->renderTemplate(
            'calendar/codepack',
            [
                'isCraft5' => $this->isCraft5,
                'crumbs' => $crumbs,
                'codePack' => $codePack,
                'prefix' => 'calendar-demo',
            ]
        );
    }

    /**
     * Perform the install feats.
     */
    public function actionInstall(): Response
    {
        $this->requirePostRequest();

        $crumbs = [
            [
                'label' => Calendar::t(Calendar::getInstance()->name),
                'url' => UrlHelper::cpUrl('calendar'),
            ],
            [
                'label' => Calendar::t('Settings'),
                'url' => UrlHelper::cpUrl('calendar/settings'),
            ],
            [
                'label' => Calendar::t('Demo Templates'),
                'url' => UrlHelper::cpUrl('calendar/settings/demo-templates'),
                'current' => true,
            ],
        ];

        $codePack = $this->getCodePack();
        $prefix = \Craft::$app->request->post('prefix');

        $prefix = preg_replace('/[^a-zA-Z_0-9-\/]/', '', $prefix);

        try {
            $codePack->install($prefix);
            Calendar::getInstance()->settings->dismissDemoBanner();
        } catch (FileObjectException $exception) {
            return $this->renderTemplate(
                'calendar/codepack',
                [
                    'isCraft5' => $this->isCraft5,
                    'crumbs' => $crumbs,
                    'codePack' => $codePack,
                    'prefix' => $prefix,
                    'exceptionMessage' => $exception->getMessage(),
                ]
            );
        }

        \Craft::$app->session->setFlash('codepack_prefix', $prefix);

        return $this->redirectToPostedUrl();
    }

    private function getCodePack(): CodePack
    {
        return new CodePack(__DIR__.'/../codepack');
    }
}
