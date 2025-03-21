import template from './ssik-extra-metro-product-detail-preview.html.twig';
import './ssik-extra-metro-product-detail-preview.scss';

/**
 * @private
 * @package buyers-experience
 */
export default {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
};
