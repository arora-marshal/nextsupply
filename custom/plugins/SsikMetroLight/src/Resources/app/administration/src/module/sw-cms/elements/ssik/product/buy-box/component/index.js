import template from './component.html.twig';
import './component.scss';

const { Mixin } = Shopware;

/**
 * @private
 * @package buyers-experience
 */
export default {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
        Mixin.getByName('placeholder'),
    ],

    computed: {
        pageType() {
            return this.cmsPageState?.currentPage?.type ?? '';
        },

        isProductPageType() {
            return this.pageType === 'product_detail';
        },
    },

    watch: {
        pageType(newPageType) {
            this.$set(this.element, 'locked', newPageType === 'product_detail');
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ssik-metro-product-buy');
            this.initElementData('ssik-metro-product-buy');
            this.$set(this.element, 'locked', this.isProductPageType);
        },
    },
};
