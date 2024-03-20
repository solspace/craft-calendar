<?php

namespace Solspace\Calendar\Library\CodePack;

use craft\helpers\StringHelper;
use Solspace\Calendar\Library\CodePack\Exceptions\Manifest\ManifestException;
use Solspace\Calendar\Library\CodePack\Exceptions\Manifest\ManifestNotPresentException;

class Manifest
{
    private ?string $packageName = null;

    private ?string $packageDesc = null;

    private ?string $vendor = null;

    private ?string $vendorUrl = null;

    private ?string $docsUrl = null;

    private static array $availableProperties = [
        'package_name',
        'package_desc',
        'package_version',
        'vendor',
        'vendor_url',
        'docs_url',
    ];

    private static array $requiredProperties = [
        'package_name',
        'package_version',
        'vendor',
    ];

    public function __construct(string $manifestPath)
    {
        $this->parseManifestFile($manifestPath);
    }

    public function getPackageName(): string
    {
        return $this->packageName;
    }

    public function getPackageDesc(): string
    {
        return $this->packageDesc;
    }

    public function getVendor(): string
    {
        return $this->vendor;
    }

    public function getVendorUrl(): string
    {
        return $this->vendorUrl;
    }

    public function getDocsUrl(): string
    {
        return $this->docsUrl;
    }

    /**
     * @throws ManifestException
     */
    private function parseManifestFile(string $manifestPath)
    {
        if (!file_exists($manifestPath)) {
            throw new ManifestNotPresentException(sprintf('Manifest file is not present in %s', $manifestPath));
        }

        $content = file_get_contents($manifestPath);
        $data = json_decode($content, true);

        foreach (self::$availableProperties as $property) {
            if (\in_array($property, self::$requiredProperties, true)) {
                if (!\array_key_exists($property, $data)) {
                    throw new ManifestException(
                        sprintf('Mandatory "%s" property not defined in manifest.json', $property)
                    );
                }

                if (empty($data[$property])) {
                    throw new ManifestException(
                        sprintf('Mandatory "%s" property is empty in manifest.json', $property)
                    );
                }
            }

            $camelCasedProperty = StringHelper::toCamelCase($property);
            if (property_exists($this, $camelCasedProperty)) {
                $this->{$camelCasedProperty} = $data[$property];
            }
        }
    }
}
