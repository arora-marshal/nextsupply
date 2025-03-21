export default class SsikElementorPlugin extends window.PluginBaseClass {
    static options = {}

    init() {
        this._moveShippingCostsForm();
    }

    _moveShippingCostsForm() {
        const element       = document.body.querySelector('.cart-shipping-costs-container > form');
        const destination   = document.body.querySelector('.checkout-aside-summary');

        if(element && destination) {
            destination.insertAdjacentElement('afterend', element);
        }
    }
}