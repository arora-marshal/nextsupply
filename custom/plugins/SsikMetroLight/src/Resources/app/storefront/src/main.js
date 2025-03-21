import './plugin/fa.all.min';

const footerNewsletterMail = document.body.querySelector('#footerNewsletterMail');
if(footerNewsletterMail) {
    footerNewsletterMail.addEventListener('click', () => {
        const newsletterCaptcha = document.body.querySelector('#newsletter-captcha');
        if(newsletterCaptcha) {
            newsletterCaptcha.classList.add('show');
        }
    });
}

const jsFooterColumn = document.body.querySelectorAll('.js-footer-column');
if(jsFooterColumn.length > 0) {
    jsFooterColumn.forEach(item => {
        const head = item.querySelector('.footer-headline');
        if(head) head.classList.add('show');
        const content = item.querySelector('.footer-column-content');
        if(content) content.classList.add('collapse', 'show');
    });
}

window.PluginManager.register('MainNavigationSticky', () => import('./plugin/navigation/main-navigation-sticky.plugin'), '[data-header-floating]');
window.PluginManager.register('HeaderFloatingCart', () => import('./plugin/header/header-floating-cart.plugin'), 'body');
window.PluginManager.register('SsikElementor', () => import('./plugin/elementor/elementor.plugin'), 'body');
window.PluginManager.register('BuyWidgetQuantityPlugin', () => import('./plugin/widget/buy-widget-quantity.plugin'), '[data-buy-widget-quantity]');
window.PluginManager.register('EasyQuickView', () => import('./plugin/easy-quick-view/easy-quick-view.plugin'), '[data-easy-quick]');
window.PluginManager.register('ProductImgHoverPlugin', () => import('./plugin/product-img-hover/product-img-hover.plugin'), '[data-product-img-hover]');
window.PluginManager.register('UspBarSlider', () => import('./plugin/slider/usp-bar-slider.plugin'), '[data-usp-bar-slider]');
window.PluginManager.register('SsikLoginModal', () => import('./plugin/login-form/login-form.plugin'), '[data-ssik-login-modal]');
window.PluginManager.register('SsikNavigationDropdowns', () => import('./plugin/navigation/navigation-dropdowns.plugin'), '[data-ssik-main-dropdowns]');
window.PluginManager.register('SsikSearchForm', () => import('./plugin/header/search-form.plugin'), '[data-ssik-search-form]');
window.PluginManager.register('SsikAddCart', () => import('./plugin/add-cart/add-cart.plugin'), '[data-ssik-add-cart]');
window.PluginManager.register('SsikProductMediaSlider', () => import('./plugin/product-media-slider/product-media-slider.plugin'), '[data-product-media-slider]');
window.PluginManager.register('SsikProductDetailMedia', () => import('./plugin/product-detail/product-detail-media.plugin'), '[data-ssik-product-detail-media]');

window.PluginManager.register('SsikSwiperPlugin', () => import('./plugin/swiper/swiper.plugin'), '[data-ssik-swiper-plugin]');

document.addEventListener('DOMContentLoaded', () => window.PluginManager.initializePlugins(), false);