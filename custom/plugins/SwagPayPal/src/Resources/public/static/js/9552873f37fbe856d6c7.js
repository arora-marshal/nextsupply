(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[9410],{3215:function(){},9410:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return a}}),n(320);var a=Shopware.Component.wrapComponentConfig({template:'{% block sw_settings_payment_detail_content_field_plugin %}\n<sw-button\n    v-if="needsOnboarding && !!paymentMethod?.pluginId"\n    variant="ghost"\n    size="small"\n    class="sw-plugin-box__button"\n    :router-link="{ name: \'swag.paypal.settings.index\' }"\n>\n    {{ $t(\'sw-plugin-box.buttonPluginSettings\') }}\n</sw-button>\n\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n\n{% block sw_settings_payment_detail_content_field_active %}\n<sw-switch-field\n    v-if="!acl.can(\'payment.editor\') || paymentMethod && needsOnboarding"\n    v-model:value="paymentMethod.active"\n    v-tooltip.left="{ message: $t(\'sw-settings-payment-detail.tooltip\') }"\n    class="sw-settings-payment-detail__field-active"\n    :disabled="!acl.can(\'payment.editor\') || paymentMethod && needsOnboarding"\n    :label="$t(\'sw-settings-payment.detail.labelActive\')"\n/>\n\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n',inject:["SwagPayPalSettingsService"],data(){return{capabilities:{}}},computed:{needsOnboarding(){return!this.paymentMethod||!this.capabilities||"inactive"===this.capabilities[this.paymentMethod.id]}},methods:{createdComponent(){this.$super("createdComponent"),this.fetchMerchantCapabilities()},async fetchMerchantCapabilities(){let t=await this.SwagPayPalSettingsService.getMerchantInformation();this.capabilities=t.capabilities??{}}}})},320:function(t,e,n){var a=n(3215);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[t.id,a,""]]),a.locals&&(t.exports=a.locals),n(5346).Z("29439f26",a,!0,{})}}]);