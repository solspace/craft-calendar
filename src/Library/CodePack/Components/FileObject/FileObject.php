<?php

namespace Solspace\Calendar\Library\CodePack\Components\FileObject;

use Solspace\Calendar\Library\CodePack\Exceptions\FileObject\FileNotFoundException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

abstract class FileObject
{
    /** @var string */
    protected $name;

    /** @var string */
    protected $path;

    /** @var bool */
    protected $folder;

    /**
     * @param string $path
     *
     * @return FileObject
     * @throws FileNotFoundException
     */
    public static function createFromPath(string $path): FileObject
    {
        $realPath = realpath($path);

        if (!$realPath) {
            throw new FileNotFoundException(
                sprintf('Path points to nothing: "%s"', $path)
            );
        }

        $isFolder = is_dir($path);

        return $isFolder ? new Folder($path) : new File($path);
    }

    /**
     * @param $path
     */
    abstract protected function __construct(string $path);

    /**
     * Copy the file or directory to $target location
     *
     * @param string              $target
     * @param string|null         $prefix
     * @param array|callable|null $callable
     * @param string|null         $filePrefix
     *
     * @return void
     */
    abstract public function copy(
        string $target,
        string $prefix = null,
        callable $callable = null,
        string $filePrefix = null
    );

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * @return boolean
     */
    public function isFolder(): bool
    {
        return $this->folder;
    }

    /**
     * @return Filesystem
     */
    protected function getFileSystem(): Filesystem
    {
        static $fileSystem;

        if (null === $fileSystem) {
            $fileSystem = new Filesystem();
        }

        return $fileSystem;
    }

    /**
     * @return Finder
     */
    protected function getFinder(): Finder
    {
        return new Finder();
    }
}
