import { createElement } from '../utils';
import Swiper from '@swiper';
import { Navigation} from '@swipermodules';

export default class ProductMediaSlider extends window.PluginBaseClass {
    static options = {
        slider: {
            spaceBetween: 0,
            loop: true,
        }
    };

    init() {

        if(!this.el) return;

        this.parent = this.el.querySelector('.product-image-link');

        this.images = JSON.parse(this.el.dataset.productMediaSlider);
       
        this.slider = this.createSlider();

        new Swiper(this.slider, {
            modules: [Navigation],
            ...this.options.slider,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    createSlider() {
        const sliderEl      =  createElement('div', 'swiper ssik-product-media-slider');
        const sliderWrapper =  createElement('div', 'swiper-wrapper');

        const sliderButtonPrev =  createElement('div', 'swiper-button-prev');
        const sliderButtonNext =  createElement('div', 'swiper-button-next');

        this.images.forEach((image) => {
            const sliderSlide   = createElement('div', 'swiper-slide');

            const sliderImg     = createElement('img', 'product-image is-standard', image);
            sliderSlide.append(sliderImg);
            sliderWrapper.append(sliderSlide);
        });

        sliderEl.append(sliderWrapper, sliderButtonPrev, sliderButtonNext);
        this.parent.prepend(sliderEl);

        return sliderEl;
    }
}