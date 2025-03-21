<?php declare(strict_types=1);

namespace SsikMetroLight\Core\Content\Product\Cms;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Content\Media\Cms\Type\ImageSliderTypeDataResolver;

#[Package('buyers-experience')]
class SsikMetroProductImagesCmsElementResolver extends ImageSliderTypeDataResolver
{
    public function getType(): string
    {
        return 'ssik-metro-product-images';
    }
}