<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use Solspace\Calendar\Library\CodePack\Components\FileObject\FileObject;
use Solspace\Calendar\Library\CodePack\Components\FileObject\Folder;
use Solspace\Calendar\Library\CodePack\Exceptions\CodePackException;

abstract class AbstractFileComponent implements ComponentInterface
{
    protected ?string $installDirectory = null;

    protected ?string $targetFilesDirectory = null;

    protected null|FileObject|Folder $contents = null;

    private ?string $location = null;

    /**
     * @param string $location - the location of files
     *
     * @throws CodePackException
     */
    final public function __construct(string $location)
    {
        $this->location = $location;
        $this->contents = $this->locateFiles();
    }

    /**
     * Installs the component files into the $installDirectory.
     */
    public function install(?string $prefix = null): void
    {
        $installDirectory = $this->getInstallDirectory();
        $installDirectory = rtrim($installDirectory, '/');
        $installDirectory .= '/'.$prefix.'/';
        $installDirectory .= ltrim($this->getSubInstallDirectory($prefix), '/');

        foreach ($this->contents as $file) {
            $file->copy($installDirectory, $prefix, [$this, 'postFileCopyAction']);
        }
    }

    /**
     * If anything has to be done with a file once it's copied over
     * This method does it.
     */
    public function postFileCopyAction(string $newFilePath, ?string $prefix = null) {}

    public function getContents(): null|FileObject|Folder
    {
        return $this->contents;
    }

    abstract protected function getInstallDirectory(): string;

    abstract protected function getTargetFilesDirectory(): string;

    /**
     * If anything must come after /{install_directory}/{prefix}demo/{???}
     * It is returned here.
     */
    protected function getSubInstallDirectory(string $prefix): string
    {
        return '';
    }

    /**
     * @throws CodePackException
     */
    private function locateFiles(): FileObject
    {
        $directory = FileObject::createFromPath($this->getFileLocation());

        if (!$directory instanceof Folder) {
            throw new CodePackException('Target directory is not a directory: '.$this->getFileLocation());
        }

        return $directory;
    }

    private function getFileLocation(): string
    {
        return $this->location.'/'.$this->getTargetFilesDirectory();
    }
}
