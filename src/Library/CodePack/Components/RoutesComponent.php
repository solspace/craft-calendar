<?php

namespace Solspace\Calendar\Library\CodePack\Components;

class RoutesComponent extends AbstractJsonComponent
{
    /**
     * Calls the installation of this component
     *
     * @param string $prefix
     */
    public function install(string $prefix = null)
    {
        $routeService = \Craft::$app->routes;

        $data       = $this->getData();
        $demoFolder = $prefix . '/';

        foreach ($data as $route) {
            if (isset($route->urlParts, $route->template) && \is_array($route->urlParts)) {
                $urlParts = $route->urlParts;

                array_walk_recursive($urlParts, function(&$value) {
                    $value = stripslashes($value);
                });

                $urlParts[0] = $demoFolder . $urlParts[0];

                $pattern  = "/(\/?)(.*)/";
                $template = preg_replace($pattern, "$1$demoFolder$2", $route->template, 1);

                $routeService->saveRoute($urlParts, $template);
            }
        }
    }

    /**
     * This is the method that sets all vital properties
     * ::$fileName
     */
    protected function setProperties()
    {
        $this->fileName = 'routes.json';
    }
}
