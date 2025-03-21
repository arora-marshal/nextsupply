import Swiper from '@swiper';
import { Navigation } from '@swipermodules';
export default class SsikSwiperPlugin extends window.PluginBaseClass {
    static options = {
        direction: 'horizontal',
        effect: 'slide',
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        enabled: true,
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
                loop: false,
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 10,
                enabled: false,
                loop: false,
            }
        }
    };

    init() {
        if(!this.el) {
            return;
        }

        this._slider = false;

        this._initSlider();
    }

    _initSlider() {
        if(this.options.enabled) {
            this._slider = new Swiper(this.el, {
                modules: [ Navigation ],
                ...this.options,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }
}