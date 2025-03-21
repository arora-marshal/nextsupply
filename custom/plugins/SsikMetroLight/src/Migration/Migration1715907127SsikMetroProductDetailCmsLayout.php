<?php declare(strict_types=1);

namespace SsikMetroLight\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Migration\MigrationStep;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\Migration\Traits\ImportTranslationsTrait;
use Shopware\Core\Migration\Traits\Translations;
use SsikMetroLight\SsikMetroLight;

/**
 * @internal
 */
#[Package('core')]
class Migration1715907127SsikMetroProductDetailCmsLayout extends MigrationStep
{
    use ImportTranslationsTrait;

    public function getCreationTimestamp(): int
    {
        return 1715907127;
    }

    public function update(Connection $connection): void
    {
        $this->addDefaultPdpLayout($connection);
    }

    private function addDefaultPdpLayout(Connection $connection): void
    {
        $versionId = Uuid::fromHexToBytes(Defaults::LIVE_VERSION);

        // cms page
        $page = [
            'id' => Uuid::fromHexToBytes(SsikMetroLight::SSIK_CMS_PRODUCT_DETAIL_PAGE),
            'type' => 'product_detail',
            'locked' => 1,
            'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
        ];

        $connection->insert('cms_page', $page);
        $pageTranslations = new Translations(
            [
                'cms_page_id' => $page['id'],
                'name' => 'Produktseite-Layout von Metro Thema',
            ],
            [
                'cms_page_id' => $page['id'],
                'name' => 'Product page Layout by Metro Theme',
            ]
        );

        $this->importTranslation('cms_page_translation', $pageTranslations, $connection);

        $section = [
            'id' => Uuid::randomBytes(),
            'cms_page_id' => $page['id'],
            'position' => 0,
            'type' => 'default',
            'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
        ];

        $connection->insert('cms_section', $section);

        // cms block
        $blocks = [
            [
                'id' => Uuid::randomBytes(),
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
                'cms_section_id' => $section['id'],
                'locked' => 1,
                'position' => 1,
                'type' => 'ssik-metro-product-detail',
                'name' => '',
                'margin_top' => '20px',
                'margin_bottom' => '20px',
                'margin_left' => '',
                'margin_right' => '',
                'background_media_mode' => 'cover',
            ],
            [
                'id' => Uuid::randomBytes(),
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
                'cms_section_id' => $section['id'],
                'locked' => 1,
                'position' => 2,
                'type' => 'product-description-reviews',
                'name' => 'Product description and reviews',
                'margin_top' => '20px',
                'margin_bottom' => '20px',
                'margin_left' => '',
                'margin_right' => '',
                'background_media_mode' => 'cover',
            ],
            [
                'id' => Uuid::randomBytes(),
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
                'cms_section_id' => $section['id'],
                'locked' => 1,
                'position' => 3,
                'type' => 'cross-selling',
                'name' => 'Cross selling',
                'margin_top' => '20px',
                'margin_bottom' => '20px',
                'margin_left' => '',
                'margin_right' => '',
                'background_media_mode' => 'cover',
            ],
        ];

        foreach ($blocks as $block) {
            $connection->insert('cms_block', $block);
        }

        // cms slot
        $slots = [
            [
                'id' => Uuid::randomBytes(),
                'locked' => 1,
                'cms_block_id' => $blocks[0]['id'],
                'type' => 'ssik-metro-product-images',
                'slot' => 'left',
                'version_id' => $versionId,
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ],
            [
                'id' => Uuid::randomBytes(),
                'locked' => 1,
                'cms_block_id' => $blocks[0]['id'],
                'type' => 'buy-box',
                'slot' => 'right',
                'version_id' => $versionId,
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ],
            [
                'id' => Uuid::randomBytes(),
                'locked' => 1,
                'cms_block_id' => $blocks[1]['id'],
                'type' => 'product-description-reviews',
                'slot' => 'content',
                'version_id' => $versionId,
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ],
            [
                'id' => Uuid::randomBytes(),
                'locked' => 1,
                'cms_block_id' => $blocks[2]['id'],
                'type' => 'cross-selling',
                'slot' => 'content',
                'version_id' => $versionId,
                'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ],
        ];

        foreach ($slots as $slot) {
            $connection->insert('cms_slot', $slot);
        }

        $slotTranslationData = [
            [
                'cms_slot_id' => $slots[0]['id'],
                'cms_slot_version_id' => $versionId,
                'config' => json_encode([
                    'displayMode' => ['value' => 'standard', 'source' => 'static'],
                    'fullScreen' => ['value' => true, 'source' => 'static'],
                    'magnifierOverGallery' => ['value' => true, 'source' => 'static'],
                    'galleryPosition' => ['value' => 'left', 'source' => 'static'],
                    'minHeight' => ['value' => '430px', 'source' => 'static'],
                    'navigationArrows' => ['value' => 'inside', 'source' => 'static'],
                    'navigationDots' => ['value' => null, 'source' => 'static'],
                    'sliderItems' => ['value' => 'product.media', 'source' => 'mapped'],
                    'verticalAlign' => ['value' => null, 'source' => 'static'],
                    'zoom' => ['value' => true, 'source' => 'static'],
                ]),
            ],
            [
                'cms_slot_id' => $slots[1]['id'],
                'cms_slot_version_id' => $versionId,
                'config' => json_encode([
                    'product' => ['value' => null, 'source' => 'static'],
                    'alignment' => ['value' => null, 'source' => 'static'],
                ]),
            ],
            [
                'cms_slot_id' => $slots[2]['id'],
                'cms_slot_version_id' => $versionId,
                'config' => json_encode([
                    'content' => ['source' => 'mapped', 'value' => 'product.name'],
                    'verticalAlign' => ['value' => null, 'source' => 'static'],
                ]),
            ],
            [
                'cms_slot_id' => $slots[3]['id'],
                'cms_slot_version_id' => $versionId,
                'config' => json_encode([
                    'url' => ['source' => 'static', 'value' => null],
                    'media' => ['source' => 'mapped', 'value' => 'product.manufacturer.media'],
                    'newTab' => ['source' => 'static', 'value' => true],
                    'minHeight' => ['source' => 'static', 'value' => null],
                    'displayMode' => ['source' => 'static', 'value' => 'cover'],
                    'verticalAlign' => ['source' => 'static', 'value' => null],
                ]),
            ],
        ];

        foreach ($slotTranslationData as $slotTranslationDatum) {
            $slotTranslations = new Translations($slotTranslationDatum, $slotTranslationDatum);

            $this->importTranslation('cms_slot_translation', $slotTranslations, $connection);
        }
    }
}
