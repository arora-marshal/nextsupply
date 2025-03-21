<?php declare(strict_types=1);

namespace SsikMetroLight\Core\Content\Product\Cms;

use Shopware\Core\Content\Product\Cms\BuyBoxCmsElementResolver;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Content\Product\SalesChannel\Detail\ProductConfiguratorLoader;


class SsikMetroProductBuyCmsElementResolver extends BuyBoxCmsElementResolver
{
    
    public function getType(): string
    {
        return 'ssik-metro-product-buy';
    }
}