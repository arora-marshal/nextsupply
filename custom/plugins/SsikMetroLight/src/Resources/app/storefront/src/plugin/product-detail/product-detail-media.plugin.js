import ViewportDetection from 'src/helper/viewport-detection.helper';
import DeviceDetection from 'src/helper/device-detection.helper';
import Zoomist from '@zoomist';
import Swiper from '@swiper';
import { Navigation } from '@swipermodules';
import { setAttributes } from '../utils';

export default class ProductDetailMedia extends window.PluginBaseClass {

    static options = {
        classes: {
            isFullscreen:   'is-fullscreen',
            isThumbsDown:   'is-thumbs-down',
            isThumbsRight:  'is-thumbs-right',
            isZoomIn:       'is-zoom-in',
        },
        selectors: {
            sliders: {
                thumbs: '.js-thumbs',
                images: '.js-images',
            },
            btnFullScreenClose: '.js-btn-fullscreen-close',
        },
        parameters: {
            speed: 300,
        }
    };

    init() {
        const elImages = this.el.querySelector(this.options.selectors.sliders.images);        
        if(!elImages) {
            console.warn(`Called selector '${this.options.selectors.sliders.images}' for the slider not found.`);
            return;
        }

        this.IMAGES = new Swiper(elImages, {
            modules: [Navigation],
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: (swiper) => {
                    
                    this.handlerOpenFullscreen = this.openFullscreen.bind(this);

                    if(!DeviceDetection.isTouchDevice()) {
                        this.handlerInitZoomByMouseEnter  = [];
                        this.handlerDragZoom              = [];
                    }
                    
                    swiper.slides.forEach((slide, index) => {   

                        if(this.options.config.fullScreen) {
                            slide.addEventListener('click', this.handlerOpenFullscreen);
                        }
                        
                        if(!DeviceDetection.isTouchDevice()) {
                            this.handlerInitZoomByMouseEnter[index] = this.toggleZoom.bind(this, slide);
                            this.handlerDragZoom[index]             = this.dragZoom.bind(this, slide);

                            if(this.options.config.magnifierOverGallery) {
                                slide.addEventListener('mouseenter', this.handlerInitZoomByMouseEnter[index]);
                            }
                            

                            slide.addEventListener('mousemove', this.handlerDragZoom[index]);
                            slide.addEventListener('mouseleave', this.destroyZoom.bind(this, slide));
                        }
                    });
                },
            },
        });

        this.heightThumbs = Math.floor(this.IMAGES.slides[0].getBoundingClientRect().height);

        this.elThumbs = this.el.querySelector(this.options.selectors.sliders.thumbs);
        if(this.elThumbs) {
            //this.THUMBS = new Swiper(this.elThumbs, this._getSettingsForThumbs(this._isMobileViewports() ? 'horizontal' : 'vertical')); 
            this.THUMBS = new Swiper(this.elThumbs, this._getSettingsForThumbs('vertical'));
        }

        this._registerEvents();
    }

    openFullscreen() {

        this.el.classList.add(this.options.classes.isFullscreen);
        
        if(!DeviceDetection.isTouchDevice()) {
            this.handlerToggleZoom  = [];
        }

        if(this.THUMBS) {
            this.THUMBS.destroy(false, true);
            this.THUMBS = new Swiper(this.elThumbs, this._getSettingsForThumbs('horizontal'));
        }

        this.IMAGES.slides.forEach((slide, index) => {  

            if(this.options.config.fullScreen) {
                slide.removeEventListener('click', this.handlerOpenFullscreen);
            }
            
            if(!DeviceDetection.isTouchDevice()) {

                this.destroyZoom(slide);

                this.handlerToggleZoom[index] = this.toggleZoom.bind(this, slide);    
            
                if(this.options.config.magnifierOverGallery) {
                    slide.removeEventListener('mouseenter', this.handlerInitZoomByMouseEnter[index]);
                }
                
                slide.addEventListener('click', this.handlerToggleZoom[index]);
            }
            else {
                this.initZoom(slide);
            }
        });
    }

    closeFullscreen() {
        
        this.el.classList.remove(this.options.classes.isFullscreen);

        if(this.THUMBS) {
            this.THUMBS.destroy(false, true);
            this.THUMBS = new Swiper(this.elThumbs, this._getSettingsForThumbs(this._isMobileViewports() ? 'horizontal' : 'vertical'));
        }
        
        this.IMAGES.slides.forEach((slide, index) => {    
            
            if(this.options.config.fullScreen) {
                slide.addEventListener('click', this.handlerOpenFullscreen);
            }
            
            if(!DeviceDetection.isTouchDevice()) {
                slide.removeEventListener('click', this.handlerToggleZoom[index]);

                if(this.options.config.magnifierOverGallery) {
                    slide.addEventListener('mouseenter', this.handlerInitZoomByMouseEnter[index]);
                }
                
            } else {
                this.destroyZoom(slide);
            }
        });
    }

    toggleZoom(slide) {
        if(!slide.classList.contains(this.options.classes.isZoomIn)) {
            if(this.options.config.magnifierOverGallery) {
                slide.classList.add(this.options.classes.isZoomIn);
                this.initZoom(slide);
                slide.firstElementChild.zoomist.zoom(0.5);
            }
        } 
        else {
            if(this.options.config.magnifierOverGallery) {
                this.destroyZoom(slide);
            }
        }    
    }

    dragZoom(slide, event) {
        if(slide.firstElementChild.zoomist) {
            slide.firstElementChild.zoomist.move({x: event.movementX, y: event.movementY});
        }
    }

    initZoom(slide) {
        new Zoomist(slide.firstElementChild, {
            maxScale: 5,
            slider: false,
            zoomer: false,
            wheelable: false,
        });
    }

    destroyZoom(slide) {
        if(slide.firstElementChild.zoomist) {
            slide.firstElementChild.zoomist.destroy(true);
            slide.classList.remove(this.options.classes.isZoomIn);
        }
    }

    onSlideToByClickSlide(sliderFrom, sliderTo) {
        const clickedSlide = sliderFrom.clickedSlide;
        const clickedIndex = parseInt(clickedSlide.dataset.swiperSlideIndex);
        
        if(clickedIndex >= 0) {
            sliderFrom.slideNext(this.options.parameters.speed);
            sliderTo.slideToLoop(clickedIndex, this.options.parameters.speed);
        }
    }

    _registerEvents() {
        const btnFullScreenClose = this.el.querySelector(this.options.selectors.btnFullScreenClose);
        if(btnFullScreenClose) btnFullScreenClose.addEventListener('click', this.closeFullscreen.bind(this));

        //document.addEventListener('Viewport/hasChanged', this._onViewportHasChanged.bind(this));
    }

    _changeTHUMBSDirection(direction = 'horizontal') {
        if(this.THUMBS) {
            this.THUMBS.destroy(false, true);
            this.THUMBS = new Swiper(this.elThumbs, this._getSettingsForThumbs(direction));
        }
    }

    _onViewportHasChanged() {
        if(this._isMobileViewports()) {
            this._changeTHUMBSDirection('horizontal');
        }
        else {
            this._changeTHUMBSDirection('vertical');
        }
    }

    _isMobileViewports() {
        return (ViewportDetection.isXS() || ViewportDetection.isSM() );
    }

    _getSettingsForThumbs(direction) {
        const settings = {
            modules: [Navigation],
            loop: true,
            direction: direction,
            slidesPerView: direction == 'vertical' ? 'auto' : 5,
            //slidesPerView: 4,
            slidesPerGroup: 1,
            autoHeight: direction == 'vertical' ? true : false,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: (swiper) => {
                    if(direction == 'vertical') {
                        setAttributes(swiper.el, {style: `height:${this.heightThumbs}px`});
                        //setAttributes(swiper.el, {style: `height:300px`});
                    } else {
                        setAttributes(swiper.el, {style: `width:333px`});
                    }

                    this.handlerSlideToByClickSlide = this.onSlideToByClickSlide.bind(this, swiper, this.IMAGES);

                    swiper.slides.forEach((slide, index) => {    
                        slide.addEventListener('click', this.handlerSlideToByClickSlide);
                    });
                },
                beforeDestroy: (swiper) => {
                    swiper.slides.forEach((slide, index) => {    
                        slide.removeEventListener('click', this.handlerSlideToByClickSlide);
                    });
                }
            },
        }

        return settings;
    }

}