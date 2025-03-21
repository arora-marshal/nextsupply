/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-buy-preview', () => import('./preview'));
/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-buy-config', () => import('./config'));
/**
 * @private
 * @package buyers-experience
 */
Shopware.Component.register('ssik-metro-elem-product-buy', () => import('./component'));

const Criteria = Shopware.Data.Criteria;
const criteria = new Criteria(1, 25);
criteria.addAssociation('deliveryTime');

/**
 * @private
 * @package buyers-experience
 */
Shopware.Service('cmsService').registerCmsElement({
    name: 'ssik-metro-product-buy',
    label: 'ssik.extra.metro.cms.elements.productDetailBuy.label',
    component: 'ssik-metro-elem-product-buy',
    configComponent: 'ssik-metro-elem-product-buy-config',
    previewComponent: 'ssik-metro-elem-product-buy-preview',
    disabledConfigInfoTextKey: 'sw-cms.elements.buyBox.infoText.tooltipSettingDisabled',
    removable: false,
    hidden: true,
    defaultConfig: {
        product: {
            source: 'static',
            value: null,
            required: false,
            entity: {
                name: 'product',
                criteria: criteria,
            },
        },
        alignment: {
            source: 'static',
            value: null,
        },
    },
    defaultData: {
        product: {
            name: 'Lorem Ipsum dolor',
            productNumber: 'XXXXXX',
            minPurchase: 1,
            deliveryTime: {
                name: '1-3 days',
            },
            price: [
                { gross: 0.00 },
            ],
        },
    },
    collect: Shopware.Service('cmsService').getCollectFunction(),
});
