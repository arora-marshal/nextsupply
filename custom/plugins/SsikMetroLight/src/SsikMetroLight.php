<?php declare(strict_types=1);

namespace SsikMetroLight;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Storefront\Framework\ThemeInterface;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class SsikMetroLight extends Plugin implements ThemeInterface
{

    final public const SSIK_CMS_PRODUCT_DETAIL_PAGE = 'ddb3d7938a53423a8f8a9857a0420545';

    public function getThemeConfigPath(): string
    {
        return 'theme.json';
    }

     /**
     * @throws \Exception
     */
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $loader = new XmlFileLoader($container, new FileLocator(__DIR__ . '/Core/Content/DependencyInjection'));
        $loader->load('services.xml');
        
    }

    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        if ($context->keepUserData()) {
            return;
        }

        $this->removeData();
    }

    private function removeData(): void
    {
        $connection = $this->container->get(Connection::class);

        $connection->update('product', ['cms_page_id' => NULL], [
            'cms_page_id' => Uuid::fromHexToBytes(Self::SSIK_CMS_PRODUCT_DETAIL_PAGE)
        ]);

        $connection->delete('cms_page', [
            'id' => Uuid::fromHexToBytes(Self::SSIK_CMS_PRODUCT_DETAIL_PAGE)
        ]);
    }
}