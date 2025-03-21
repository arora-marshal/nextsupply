"use strict";(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[3844],{3844:function(e,a,n){n.r(a),n.d(a,{default:function(){return s}});let{Criteria:t}=Shopware.Data;var s=Shopware.Component.wrapComponentConfig({template:'{% block swag_paypal_content_card_channel_config_express %}\n<sw-card\n    position-identifier="swag-paypal-card-channel-config-express"\n    :title="$tc(\'swag-paypal.settingForm.express.cardTitle\')"\n    :subtitle="$tc(\'swag-paypal.settingForm.express.cardSubtitle\')"\n>\n\n    {% block swag_paypal_content_card_channel_config_express_alert %}\n    <sw-alert v-if="doubleOptInConfig" variant="warning">\n{{ $tc(\'swag-paypal.settingForm.express.alertMessage\') }}\n</sw-alert>\n    {% endblock %}\n\n    {% block swag_paypal_content_card_channel_config_express_settings %}\n    <div v-if="actualConfigData" class="swag-paypal-settings-express-fields">\n\n        {% block swag_paypal_content_card_channel_config_express_settings_detail_enabled %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsDetailEnabled"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsDetailEnabled"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsDetailEnabled.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsDetailEnabled.helpText\')"\n                    :disabled="props.isInherited || !acl.can(\'swag_paypal.editor\')"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_cart_enabled %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsCartEnabled"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsCartEnabled"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsCartEnabled.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsCartEnabled.helpText\')"\n                    :disabled="props.isInherited || !acl.can(\'swag_paypal.editor\')"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_off_canvas_enabled %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsOffCanvasEnabled"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsOffCanvasEnabled"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsOffCanvasEnabled.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsOffCanvasEnabled.helpText\')"\n                    :disabled="props.isInherited || !acl.can(\'swag_paypal.editor\')"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n\n        {% block swag_paypal_content_card_channel_config_express_settings_login_enabled %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsLoginEnabled"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsLoginEnabled"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsLoginEnabled.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsLoginEnabled.helpText\')"\n                    :disabled="props.isInherited || !acl.can(\'swag_paypal.editor\')"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_listing_enabled %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsListingEnabled"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsListingEnabled"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsListingEnabled.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsListingEnabled.helpText\')"\n                    :disabled="props.isInherited || !acl.can(\'swag_paypal.editor\')"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_button_color %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsButtonColor"\n            :label="$tc(\'swag-paypal.settingForm.express.ecsButtonColor.label\')"\n        >\n            <template #content="props">\n                <sw-single-select\n                    name="SwagPayPal.settings.ecsButtonColor"\n                    labelProperty="name"\n                    valueProperty="id"\n                    :options="buttonColorOptions"\n                    :isInherited="props.isInherited"\n                    :disabled="props.isInherited || renderSettingsDisabled"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_button_shape %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsButtonShape"\n            :label="$tc(\'swag-paypal.settingForm.express.ecsButtonShape.label\')"\n        >\n            <template #content="props">\n                <sw-single-select\n                    name="SwagPayPal.settings.ecsButtonShape"\n                    labelProperty="name"\n                    valueProperty="id"\n                    :options="buttonShapeOptions"\n                    :isInherited="props.isInherited"\n                    :disabled="props.isInherited || renderSettingsDisabled"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_button_locale %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsButtonLanguageIso"\n        >\n            <template #content="props">\n                <swag-paypal-locale-field\n                    name="SwagPayPal.settings.ecsButtonLanguageIso"\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsButtonLanguageIso.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsButtonLanguageIso.helpText\')"\n                    :disabled="props.isInherited || renderSettingsDisabled"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                    @preventSave="preventSave"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n\n        {% block swag_paypal_content_card_channel_config_express_settings_show_pay_later %}\n        <swag-paypal-inherit-wrapper\n            v-bind="{ actualConfigData, allConfigs, selectedSalesChannelId }"\n            path="SwagPayPal.settings.ecsShowPayLater"\n        >\n            <template #content="props">\n                <sw-switch-field\n                    name="SwagPayPal.settings.ecsShowPayLater"\n                    bordered\n                    :mapInheritance="props"\n                    :label="$tc(\'swag-paypal.settingForm.express.ecsShowPayLater.label\')"\n                    :helpText="$tc(\'swag-paypal.settingForm.express.ecsShowPayLater.helpText\')"\n                    :disabled="props.isInherited || renderSettingsDisabled"\n                    :value="props.currentValue"\n                    @update:value="props.updateCurrentValue"\n                />\n            </template>\n        </swag-paypal-inherit-wrapper>\n        {% endblock %}\n    </div>\n    {% endblock %}\n</sw-card>\n{% endblock %}\n',inject:["acl","repositoryFactory"],props:{actualConfigData:{type:Object,required:!0,default:()=>({})},allConfigs:{type:Object,required:!0},selectedSalesChannelId:{type:String,required:!1,default:null}},data(){return{doubleOptInConfig:!1}},created(){this.fetchSystemConfig()},computed:{buttonColorOptions(){return[{id:"blue",name:this.$tc("swag-paypal.settingForm.express.ecsButtonColor.options.blue")},{id:"black",name:this.$tc("swag-paypal.settingForm.express.ecsButtonColor.options.black")},{id:"gold",name:this.$tc("swag-paypal.settingForm.express.ecsButtonColor.options.gold")},{id:"silver",name:this.$tc("swag-paypal.settingForm.express.ecsButtonColor.options.silver")},{id:"white",name:this.$tc("swag-paypal.settingForm.express.ecsButtonColor.options.white")}]},buttonShapeOptions(){return[{id:"sharp",name:this.$tc("swag-paypal.settingForm.express.ecsButtonShape.options.sharp")},{id:"pill",name:this.$tc("swag-paypal.settingForm.express.ecsButtonShape.options.pill")},{id:"rect",name:this.$tc("swag-paypal.settingForm.express.ecsButtonShape.options.rect")}]},renderSettingsDisabled(){return!this.acl.can("swag_paypal.editor")||!this.selectedSalesChannelId&&!this.actualConfigData["SwagPayPal.settings.ecsDetailEnabled"]&&!this.actualConfigData["SwagPayPal.settings.ecsCartEnabled"]&&!this.actualConfigData["SwagPayPal.settings.ecsOffCanvasEnabled"]&&!this.actualConfigData["SwagPayPal.settings.ecsLoginEnabled"]&&!this.actualConfigData["SwagPayPal.settings.ecsListingEnabled"]},systemConfigRepository(){return this.repositoryFactory.create("system_config")},systemConfigCriteria(){let e=new t;return e.addFilter(t.equals("configurationKey","core.loginRegistration.doubleOptInGuestOrder")),e.addFilter(t.equals("configurationValue","true")),e}},methods:{checkTextFieldInheritance(e){return"string"!=typeof e||e.length<=0},checkBoolFieldInheritance(e){return"boolean"!=typeof e},async fetchSystemConfig(){let e=await this.systemConfigRepository.search(this.systemConfigCriteria);this.doubleOptInConfig=e?.total!=null&&e.total>0},preventSave(e){this.$emit("preventSave",e)}}})}}]);