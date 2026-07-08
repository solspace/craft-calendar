<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use craft\db\Query;
use craft\helpers\Json;
use craft\services\ProjectConfig;

class RoutesComponent extends AbstractJsonComponent
{
    /**
     * Calls the installation of this component.
     */
    public function install(?string $prefix = null): void
    {
        $routeService = \Craft::$app->routes;

        $existingRoutes = [];
        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
            /** @var ProjectConfig $config */
            $config = \Craft::$app->getProjectConfig();
            $existingRoutes = $config->get('routes');
        }

        $data = $this->getData();
        $demoFolder = $prefix.'/';

        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=') && $existingRoutes) {
            $this->deleteExistingCodePackRoutes($data, $existingRoutes);
            $existingRoutes = $config->get('routes');
        }

        foreach ($data as $route) {
            if (isset($route->urlParts, $route->template) && \is_array($route->urlParts)) {
                $urlParts = $route->urlParts;

                array_walk_recursive($urlParts, static function (&$value) {
                    $value = stripslashes($value);
                });

                $urlParts[0] = $demoFolder.$urlParts[0];

                $pattern = '/(\/?)(.*)/';
                $template = preg_replace($pattern, "$1{$demoFolder}$2", $route->template, 1);

                // Compile the URI parts into a regex pattern
                $uriPattern = '';
                $uriParts = array_filter($urlParts);
                $subpatternNameCounts = [];

                foreach ($uriParts as $part) {
                    if (\is_string($part)) {
                        $uriPattern .= preg_quote($part, '/');
                    } elseif (\is_array($part)) {
                        // Is the name a valid handle?
                        if (preg_match('/^[a-zA-Z]\w*$/', $part[0])) {
                            $subpatternName = $part[0];
                        } else {
                            $subpatternName = 'any';
                        }

                        // Make sure it's unique
                        if (isset($subpatternNameCounts[$subpatternName])) {
                            ++$subpatternNameCounts[$subpatternName];

                            // Append the count to the end of the name
                            $subpatternName .= $subpatternNameCounts[$subpatternName];
                        } else {
                            $subpatternNameCounts[$subpatternName] = 1;
                        }

                        // Add the var as a named subpattern
                        $uriPattern .= '<'.preg_quote($subpatternName, '/').':'.$part[1].'>';
                    }
                }

                if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
                    $uuid = $this->findExistingRoute($uriParts, $existingRoutes);
                    $routeService->saveRoute($urlParts, $template, null, $uuid);
                } else {
                    $id = (new Query())
                        ->select('id')
                        ->from('{{%routes}}')
                        ->where(['uriParts' => Json::encode($uriParts)])
                        ->scalar()
                    ;

                    $routeService->saveRoute($urlParts, $template, null, $id ?: null);
                }
            }
        }
    }

    /**
     * This is the method that sets all vital properties
     * ::$fileName.
     */
    protected function setProperties(): void
    {
        $this->fileName = 'routes.json';
    }

    private function findExistingRoute(array $uriParts, ?array $existingRoutes = null): int|string|null
    {
        if (!$existingRoutes) {
            return null;
        }

        foreach ($existingRoutes as $uuid => $route) {
            if (Json::encode($route['uriParts']) === Json::encode($uriParts)) {
                return $uuid;
            }
        }

        return null;
    }

    private function deleteExistingCodePackRoutes(array $codePackRoutes, array $existingRoutes): void
    {
        $routeService = \Craft::$app->routes;
        $codePackRoutes[] = (object) [
            'urlParts' => ['resources\/event_data\/', ['number', '\\\d+']],
            'template' => '/resources/event_data',
        ];

        foreach ($existingRoutes as $uuid => $existingRoute) {
            foreach ($codePackRoutes as $codePackRoute) {
                if ($this->isCodePackRoute($existingRoute, $codePackRoute)) {
                    $routeService->deleteRouteByUid($uuid);

                    break;
                }
            }
        }
    }

    private function isCodePackRoute(array $existingRoute, object $codePackRoute): bool
    {
        if (
            !isset($existingRoute['uriParts'], $existingRoute['template'], $codePackRoute->urlParts, $codePackRoute->template)
            || !\is_array($existingRoute['uriParts'])
            || !\is_array($codePackRoute->urlParts)
        ) {
            return false;
        }

        $codePackUriParts = $codePackRoute->urlParts;
        array_walk_recursive($codePackUriParts, static function (&$value) {
            $value = stripslashes($value);
        });

        $existingUriParts = $existingRoute['uriParts'];
        $existingFirstPart = array_shift($existingUriParts);
        $codePackFirstPart = array_shift($codePackUriParts);

        if (!\is_string($existingFirstPart) || !\is_string($codePackFirstPart)) {
            return false;
        }

        $existingTemplate = (string) $existingRoute['template'];
        $codePackTemplate = (string) $codePackRoute->template;

        return str_ends_with($existingFirstPart, $codePackFirstPart)
            && Json::encode($existingUriParts) === Json::encode($codePackUriParts)
            && str_ends_with($existingTemplate, $codePackTemplate);
    }
}
