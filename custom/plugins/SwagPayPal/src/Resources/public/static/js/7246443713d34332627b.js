"use strict";(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[1315],{1315:function(a,t,e){e.r(t),e.d(t,{default:function(){return s}});var n=e(3921),s=Shopware.Component.wrapComponentConfig({template:'<sw-inherit-wrapper\n    v-model:value="value"\n    :inherited-value="inheritedValue"\n    :custom-inheritation-check-function="customInheritationCheckFunction"\n    :has-parent="hasParent"\n    v-bind="attrs"\n>\n    <template #content="props">\n        <slot name="content" v-bind="props" />\n    </template>\n</sw-inherit-wrapper>\n',props:{path:{required:!0,type:String},actualConfigData:{type:Object,required:!0,default:()=>({null:{}})},allConfigs:{type:Object,required:!0},selectedSalesChannelId:{type:String,required:!1,default:null}},computed:{customInheritationCheckFunction(){switch(n.w[this.path]){case"array":return a=>!Array.isArray(a);case"boolean":return a=>"boolean"!=typeof a;case"string":return a=>"string"!=typeof a;default:throw Error(`Unhandled or undefined definition for system-config path "${this.path}"`)}},value:{get(){return this.actualConfigData[this.path]},set(a){this.actualConfigData[this.path]=a}},inheritedValue(){return this.selectedSalesChannelId?this.allConfigs.null[this.path]??null:null},hasParent(){return!!this.selectedSalesChannelId},attrs(){return Shopware.Utils.object.pick(this.$attrs,["label","helpText","error","required","disabled"])}}})},3921:function(a,t,e){e.d(t,{w:function(){return n}});let n={"SwagPayPal.settings.clientId":"string","SwagPayPal.settings.clientSecret":"string","SwagPayPal.settings.clientIdSandbox":"string","SwagPayPal.settings.clientSecretSandbox":"string","SwagPayPal.settings.merchantPayerId":"string","SwagPayPal.settings.merchantPayerIdSandbox":"string","SwagPayPal.settings.sandbox":"boolean","SwagPayPal.settings.intent":"string","SwagPayPal.settings.submitCart":"boolean","SwagPayPal.settings.webhookId":"string","SwagPayPal.settings.webhookExecuteToken":"string","SwagPayPal.settings.brandName":"string","SwagPayPal.settings.landingPage":"string","SwagPayPal.settings.sendOrderNumber":"boolean","SwagPayPal.settings.orderNumberPrefix":"string","SwagPayPal.settings.orderNumberSuffix":"string","SwagPayPal.settings.ecsDetailEnabled":"boolean","SwagPayPal.settings.ecsCartEnabled":"boolean","SwagPayPal.settings.ecsOffCanvasEnabled":"boolean","SwagPayPal.settings.ecsLoginEnabled":"boolean","SwagPayPal.settings.ecsListingEnabled":"boolean","SwagPayPal.settings.ecsButtonColor":"string","SwagPayPal.settings.ecsButtonShape":"string","SwagPayPal.settings.ecsButtonLanguageIso":"string","SwagPayPal.settings.ecsShowPayLater":"boolean","SwagPayPal.settings.spbButtonColor":"string","SwagPayPal.settings.spbButtonShape":"string","SwagPayPal.settings.spbButtonLanguageIso":"string","SwagPayPal.settings.acdcForce3DS":"boolean","SwagPayPal.settings.puiCustomerServiceInstructions":"string","SwagPayPal.settings.installmentBannerDetailPageEnabled":"boolean","SwagPayPal.settings.installmentBannerCartEnabled":"boolean","SwagPayPal.settings.installmentBannerOffCanvasCartEnabled":"boolean","SwagPayPal.settings.installmentBannerLoginPageEnabled":"boolean","SwagPayPal.settings.installmentBannerFooterEnabled":"boolean","SwagPayPal.settings.excludedProductIds":"array","SwagPayPal.settings.excludedProductStreamIds":"array","SwagPayPal.settings.spbShowPayLater":"boolean","SwagPayPal.settings.spbCheckoutEnabled":"boolean","SwagPayPal.settings.spbAlternativePaymentMethodsEnabled":"boolean","SwagPayPal.settings.merchantLocation":"string","SwagPayPal.settings.plusCheckoutEnabled":"boolean","SwagPayPal.settings.vaultingEnabled":"boolean","SwagPayPal.settings.vaultingEnableAlways":"boolean","SwagPayPal.settings.vaultingEnabledWallet":"boolean","SwagPayPal.settings.vaultingEnabledACDC":"boolean","SwagPayPal.settings.vaultingEnabledVenmo":"boolean","SwagPayPal.settings.crossBorderMessagingEnabled":"boolean","SwagPayPal.settings.crossBorderBuyerCountry":"string"}}}]);