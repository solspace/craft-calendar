<?php

namespace Solspace\Calendar\Library\CodePack\Components;

use Solspace\Calendar\Library\CodePack\Exceptions\FileObject\FileNotFoundException;

class TemplatesFileComponent extends AbstractFileComponent
{
    private $modifiableFileExtensions = [
        'html',
        'twig',
    ];

    /**
     * If anything has to be done with a file once it's copied over
     * This method does it.
     *
     * @param string      $newFilePath
     * @param null|string $prefix
     *
     * @throws FileNotFoundException
     */
    public function postFileCopyAction($newFilePath, $prefix = null)
    {
        if (!file_exists($newFilePath)) {
            throw new FileNotFoundException(
                sprintf('Could not find file: %s', $newFilePath)
            );
        }

        $extension = strtolower(pathinfo($newFilePath, \PATHINFO_EXTENSION));

        // Prevent from editing anything other than css and js files
        if (!\in_array($extension, $this->modifiableFileExtensions, true)) {
            return;
        }

        $content = file_get_contents($newFilePath);

        $content = $this->updateSrcAndHref($content, $prefix);
        $content = $this->updateLinks($content, $prefix);
        $content = $this->updateTemplateCalls($content, $prefix);
        $content = $this->replaceCustomPrefixCalls($content, $prefix);
        $content = $this->offsetSegments($content, $prefix);

        file_put_contents($newFilePath, $content);
    }

    protected function getInstallDirectory(): string
    {
        return \Craft::$app->path->getSiteTemplatesPath();
    }

    protected function getTargetFilesDirectory(): string
    {
        return 'templates';
    }

    /**
     * This pattern matches all src or href tag values which begin with:
     * /css or /js or /images
     * And replaces it with the prefixed asset path.
     *
     * @param string $content
     * @param string $prefix
     */
    private function updateSrcAndHref($content, $prefix): string
    {
        $pattern = '/(src|href)=([\'"](?:\{{2}\s*siteUrl\s*}{2})?(?:\/?assets\/))demo\//';
        $replace = '$1=$2'.$prefix.'/';

        return (string) preg_replace($pattern, $replace, $content);
    }

    /**
     * Replaces all links that starts with "{{ siteUrl }}demo/" with the new path.
     *
     * @param string $content
     * @param string $prefix
     */
    private function updateLinks($content, $prefix): string
    {
        $pattern = '/([\'"](?:\{{2}\s*siteUrl\s*}{2})?\/?)demo\//';
        $replace = '$1'.$prefix.'/';

        return (string) preg_replace($pattern, $replace, $content);
    }

    /**
     * Updates all includes and extends with the new location.
     *
     * @param string $content
     * @param string $prefix
     */
    private function updateTemplateCalls($content, $prefix): string
    {
        $pattern = '/(\{\%\s*(?:extends|include)) ([\'"])(\/?)demo\//';
        $replace = '$1 $2$3'.$prefix.'/';

        return (string) preg_replace($pattern, $replace, $content);
    }

    /**
     * Offset all segments by the number of segments the $prefix has
     * since our demo templates will be at least 1 folder deep.
     *
     * @param string $content
     * @param string $prefix
     */
    private function offsetSegments($content, $prefix): string
    {
        $segmentCount = substr_count($prefix, '/') + 1;

        return str_replace(
            '{% set baseUrlSegments = 1 %}',
            "{% set baseUrlSegments = {$segmentCount} %}",
            $content
        );
    }

    /**
     * @param string $content
     * @param string $prefix
     */
    private function replaceCustomPrefixCalls($content, $prefix): string
    {
        $pattern = '#(%prefix%)#';

        return (string) preg_replace($pattern, $prefix, $content);
    }
}
