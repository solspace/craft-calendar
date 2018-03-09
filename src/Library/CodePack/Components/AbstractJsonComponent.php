<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use Solspace\Calendar\Library\CodePack\Exceptions\CodePackException;
use Craft\IOHelper;

abstract class AbstractJsonComponent implements ComponentInterface
{
    /** @var string */
    protected $fileName;

    /** @var mixed */
    private $jsonData;

    /**
     * ComponentInterface constructor.
     *
     * @param string $location
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
     * Returns the parsed JSON data
     *
     * @return mixed
     */
    public function getData()
    {
        return $this->jsonData;
    }

    /**
     * Calls the installation of this component
     *
     * @param string $prefix
     */
    abstract public function install(string $prefix = null);

    /**
     * This is the method that sets all vital properties
     * ::$fileName
     */
    abstract protected function setProperties();

    /**
     * @param string $location
     *
     * @return bool
     * @throws CodePackException
     */
    private function parseJson(string $location): bool
    {
        $jsonFile = $location . '/' . $this->fileName;
        if (!file_exists($jsonFile)) {
            return false;
        }

        $content    = file_get_contents($jsonFile);
        $parsedData = json_decode($content);

        if (json_last_error()) {
            throw new CodepackException('Codepack JSON component: ' . json_last_error_msg());
        }

        if ($parsedData) {
            $this->jsonData = $parsedData;
        }

        return true;
    }
}
