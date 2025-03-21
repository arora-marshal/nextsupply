/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-images-preview', () => import('./preview'));
/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-images-config', () => import('./config'));
/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-images', () => import('./component'));

/**
 * @private
 * @package buyers-experience
 */
Shopware.Service('cmsService').registerCmsElement({
    name: 'ssik-metro-product-images',
    label: 'ssik.extra.metro.cms.elements.productDetailImages.label',
    component: 'ssik-metro-elem-product-images',
    configComponent: 'ssik-metro-elem-product-images-config',
    previewComponent: 'ssik-metro-elem-product-images-preview',
    removable: false,

    defaultConfig: {
        sliderItems: {
            source: 'static',
            value: [],
            type: Array,
            required: false,
            entity: {
                name: 'media',
            },
        },
        navigationArrows: {
            source: 'static',
            value: 'inside',
        },
        navigationDots: {
            source: 'static',
            value: null,
        },
        galleryPosition: {
            source: 'static',
            value: 'left',
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        minHeight: {
            source: 'static',
            value: '340px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
        zoom: {
            source: 'static',
            value: false,
        },
        fullScreen: {
            source: 'static',
            value: false,
        },
        keepAspectRatioOnZoom: {
            source: 'static',
            value: true,
        },
        magnifierOverGallery: {
            source: 'static',
            value: false,
        },
    },
    enrich: function enrich(elem, data) {
        if (Object.keys(data).length < 1) {
            return;
        }

        let entityCount = 0;
        Object.keys(elem.config).forEach((configKey) => {
            const entity = elem.config[configKey].entity;

            if (!entity) {
                return;
            }

            const entityKey = `entity-${entity.name}-${entityCount}`;

            if (!data[entityKey]) {
                return;
            }

            entityCount += 1;

            elem.data[configKey] = [];
            elem.config[configKey].value.forEach((sliderItem) => {
                elem.data[configKey].push({
                    newTab: sliderItem.newTab,
                    url: sliderItem.url,
                    media: data[entityKey].get(sliderItem.mediaId),
                });
            });
        });
    },
});
