(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[6573],{4931:function(){},6573:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return s}}),n(4858);var l=n(7221),s=Shopware.Component.wrapComponentConfig({template:'{% block sw_sales_channel_modal_detail_header_icon %}\n<span\n    v-if="isPayPalPosSalesChannel(detailType.id)"\n    class="sw-sales-channel-modal-detail__header-icon"\n>\n     <img\n         class="swag-paypal-pos-modal-detail__icon"\n         :src="assetFilter(\'swagpaypal/static/img/paypal-pos-logo.svg\')"\n     >\n</span>\n\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n\n{% block sw_sales_channel_modal_detail_header_meta %}\n<div\n    v-if="isPayPalPosSalesChannel(detailType.id)"\n    class="sw-sales-channel-modal-detail__header-meta"\n>\n    <h4 class="sw-sales-channel-modal-detail__header-name">\n        {{ detailType.translated.name }}\n    </h4>\n    <div class="sw-sales-channel-modal-detail__header-manufacturer">\n        {{ $tc(\'swag-paypal-pos.general.salesChannelDetailDescription.manufacturer\') }}\n    </div>\n</div>\n\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n\n{% block sw_sales_channel_modal_detail_description %}\n<template v-if="isPayPalPosSalesChannel(detailType.id)">\n    <h4 class="sw-sales-channel-modal-detail__description-long-title">\n        {{ $tc(\'swag-paypal-pos.general.salesChannelDetailDescription.title\') }}\n    </h4>\n    <div\n        v-if="detailType.translated.descriptionLong"\n        class="sw-sales-channel-modal-detail__description-long-text"\n    >\n        {{ detailType.translated.descriptionLong }}\n    </div>\n    <div\n        v-else\n        class="sw-sales-channel-modal-detail__description-long-text"\n    >\n        {{ detailType.translated.description }}\n    </div>\n</template>\n\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n',methods:{isPayPalPosSalesChannel(e){return e===l.c8}},computed:{assetFilter(){return Shopware.Filter.getByName("asset")}}})},4858:function(e,a,n){var l=n(4931);l.__esModule&&(l=l.default),"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals),n(5346).Z("1dcfd9a8",l,!0,{})}}]);