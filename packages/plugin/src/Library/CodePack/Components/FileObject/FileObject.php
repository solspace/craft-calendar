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
     * @param $path
     */
    abstract protected function __construct(string $path);

    /**
     * @throws FileNotFoundException
     */
    public static function createFromPath(string $path): self
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
     * Copy the file or directory to $target location.
     *
     * @param null|array|callable $callable
     */
    abstract public function copy(
        string $target,
        string $prefix = null,
        callable $callable = null,
        string $filePrefix = null
    );

    public function getName(): string
    {
        return $this->name;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function isFolder(): bool
    {
        return $this->folder;
    }

    protected function getFileSystem(): Filesystem
    {
        static $fileSystem;

        if (null === $fileSystem) {
            $fileSystem = new Filesystem();
        }

        return $fileSystem;
    }

    protected function getFinder(): Finder
    {
        return new Finder();
    }
}
