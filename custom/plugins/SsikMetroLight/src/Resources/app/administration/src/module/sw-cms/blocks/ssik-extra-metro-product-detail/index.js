/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-product-detail-preview', () => import('./preview'));
/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('sw-cms-block-ssik-metro-product-detail', () => import('./component'));

/**
 * @private
 * @package buyers-experience
 */
Shopware.Service('cmsService').registerCmsBlock({
    name: 'ssik-metro-product-detail',
    label: 'sw-cms.blocks.commerce.galleryBuyBox.label',
    category: 'ssik-metro-block',
    component: 'sw-cms-block-ssik-metro-product-detail',
    previewComponent: 'ssik-metro-product-detail-preview',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '',
        marginRight: '',
        sizingMode: 'boxed',
    },
    slots: {
        left: 'ssik-metro-product-images',
        right: 'buy-box',
    },
});
