import template from './ssik-extra-metro-product-detail.html.twig';
import './ssik-extra-metro-product-detail.scss';

const { State } = Shopware;

/**
 * @private
 * @package buyers-experience
 */
export default {
    template,

    computed: {
        currentDeviceView() {
            return State.get('cmsPageState').currentCmsDeviceView;
        },

        currentDeviceViewClass() {
            if (this.currentDeviceView) {
                return `is--${this.currentDeviceView}`;
            }

            return null;
        },
    },
};
