const { join, resolve } = require('path'); 
module.exports = () => { 
    return { 
        resolve: { 
            alias: {
                '@swiper': resolve( 
                    join(__dirname, '..', 'node_modules', 'swiper') 
                ),
                '@swipermodules': resolve( 
                    join(__dirname, '..', 'node_modules', 'swiper/modules/index.mjs') 
                ),
                '@zoomist': resolve( 
                    join(__dirname, '..', 'node_modules', 'zoomist') 
                ),
            } 
        } 
    }; 
}
