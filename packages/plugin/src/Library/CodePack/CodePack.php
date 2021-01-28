<?php

namespace Solspace\Calendar\Library\CodePack;

use Solspace\Calendar\Library\CodePack\Components\AssetsFileComponent;
use Solspace\Calendar\Library\CodePack\Components\RoutesComponent;
use Solspace\Calendar\Library\CodePack\Components\TemplatesFileComponent;
use Solspace\Calendar\Library\CodePack\Exceptions\CodePackException;

class CodePack
{
    const MANIFEST_NAME = 'manifest.json';

    /** @var string */
    private $location;

    /** @var Manifest */
    private $manifest;

    /** @var TemplatesFileComponent */
    private $templates;

    /** @var AssetsFileComponent */
    private $assets;

    /** @var RoutesComponent */
    private $routes;

    /**
     * CodePack constructor.
     *
     * @param string $location
     *
     * @throws CodePackException
     */
    public function __construct($location)
    {
        if (!file_exists($location)) {
            throw new CodePackException(
                sprintf(
                    "CodePack folder does not exist in '%s'",
                    $location
                )
            );
        }

        $this->location = $location;
        $this->manifest = $this->assembleManifest();
        $this->templates = $this->assembleTemplates();
        $this->assets = $this->assembleAssets();
        $this->routes = $this->assembleRoutes();
    }

    public static function getCleanPrefix(string $prefix): string
    {
        $prefix = (string) preg_replace('/\\/+/', '/', $prefix);

        return trim($prefix, '/');
    }

    /**
     * @param string $prefix
     */
    public function install($prefix)
    {
        $prefix = self::getCleanPrefix($prefix);

        $this->templates->install($prefix);
        $this->assets->install($prefix);
        $this->routes->install($prefix);
    }

    public function getManifest(): Manifest
    {
        return $this->manifest;
    }

    public function getTemplates(): TemplatesFileComponent
    {
        return $this->templates;
    }

    public function getAssets(): AssetsFileComponent
    {
        return $this->assets;
    }

    public function getRoutes(): RoutesComponent
    {
        return $this->routes;
    }

    /**
     * Assembles a Manifest object based on the manifest file.
     */
    private function assembleManifest(): Manifest
    {
        return new Manifest($this->location.'/'.self::MANIFEST_NAME);
    }

    /**
     * Gets a TemplatesComponent object with all installable templates found.
     */
    private function assembleTemplates(): TemplatesFileComponent
    {
        return new TemplatesFileComponent($this->location);
    }

    /**
     * Gets an AssetsComponent object with all installable assets found.
     */
    private function assembleAssets(): AssetsFileComponent
    {
        return new AssetsFileComponent($this->location);
    }

    /**
     * Gets a RoutesComponent object with all installable routes.
     */
    private function assembleRoutes(): RoutesComponent
    {
        return new RoutesComponent($this->location);
    }
}
