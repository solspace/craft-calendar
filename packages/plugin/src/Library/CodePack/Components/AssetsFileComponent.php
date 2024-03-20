<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use Solspace\Calendar\Library\CodePack\Exceptions\FileObject\FileNotFoundException;

class AssetsFileComponent extends AbstractFileComponent
{
    private static array $modifiableFileExtensions = [
        'css',
        'scss',
        'sass',
        'less',
        'js',
        'coffee',
    ];

    private static array $modifiableCssFiles = [
        'css',
        'scss',
        'sass',
        'less',
    ];

    /**
     * If anything has to be done with a file once it's copied over
     * This method does it.
     *
     * @throws FileNotFoundException
     */
    public function postFileCopyAction(string $newFilePath, ?string $prefix = null): void
    {
        if (!file_exists($newFilePath)) {
            throw new FileNotFoundException(
                sprintf('Could not find file: %s', $newFilePath)
            );
        }

        $extension = strtolower(pathinfo($newFilePath, \PATHINFO_EXTENSION));

        // Prevent from editing anything other than css and js files
        if (!\in_array($extension, self::$modifiableFileExtensions, true)) {
            return;
        }

        $content = file_get_contents($newFilePath);

        if (\in_array($extension, self::$modifiableCssFiles, true)) {
            $content = $this->updateImagesURL($content, $prefix);
            // $content = $this->updateRelativePaths($content, $prefix);
            $content = $this->replaceCustomPrefixCalls($content, $prefix);
        }

        file_put_contents($newFilePath, $content);
    }

    protected function getInstallDirectory(): string
    {
        return $_SERVER['DOCUMENT_ROOT'].'/assets';
    }

    protected function getTargetFilesDirectory(): string
    {
        return 'assets';
    }

    /**
     * This pattern matches all url(/images[..]) with or without surrounding quotes
     * And replaces it with the prefixed asset path.
     */
    private function updateImagesURL(string $content, string $prefix): string
    {
        $pattern = '/url\s*\(\s*([\'"]?)\/((?:images)\/[a-zA-Z1-9_\-\.\/]+)[\'"]?\s*\)/';
        $replace = 'url($1/assets/'.$prefix.'/$2$1)';

        return (string) preg_replace($pattern, $replace, $content);
    }

    /**
     * Updates all "../somePath/" urls to "../$prefix_somePath/" urls.
     */
    private function updateRelativePaths(string $content, string $prefix): string
    {
        $pattern = '/([\(\'"])\.\.\/([^"\'())]+)([\'"\)])/';
        $replace = '$1../'.$prefix.'$2$3';

        return (string) preg_replace($pattern, $replace, $content);
    }

    private function replaceCustomPrefixCalls(string $content, string $prefix): string
    {
        $pattern = '/(%prefix%)/';

        return (string) preg_replace($pattern, $prefix, $content);
    }
}
