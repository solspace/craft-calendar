<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use Solspace\Calendar\Library\CodePack\Exceptions\CodePackException;

abstract class AbstractJsonComponent implements ComponentInterface
{
    protected ?string $fileName = null;

    private mixed $jsonData = null;

    /**
     * ComponentInterface constructor.
     *
     * @throws CodePackException
     */
    final public function __construct(string $location)
    {
        $this->setProperties();

        if (null === $this->fileName) {
            throw new CodePackException('JSON file name not specified');
        }

        $this->parseJson($location);
    }

    /**
     * Returns the parsed JSON data.
     */
    public function getData(): mixed
    {
        return $this->jsonData;
    }

    /**
     * Calls the installation of this component.
     */
    abstract public function install(?string $prefix = null);

    /**
     * This is the method that sets all vital properties
     * ::$fileName.
     */
    abstract protected function setProperties();

    /**
     * @throws CodePackException
     */
    private function parseJson(string $location): bool
    {
        $jsonFile = $location.'/'.$this->fileName;
        if (!file_exists($jsonFile)) {
            return false;
        }

        $content = file_get_contents($jsonFile);
        $parsedData = json_decode($content);

        if (json_last_error()) {
            throw new CodePackException('Codepack JSON component: '.json_last_error_msg());
        }

        if ($parsedData) {
            $this->jsonData = $parsedData;
        }

        return true;
    }
}
