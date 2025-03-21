(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[8387],{3389:function(){},8387:function(n,a,e){"use strict";e.r(a),e.d(a,{default:function(){return i}}),e(2175);var t=e(6867);let{Defaults:l}=Shopware,{Criteria:s}=Shopware.Data;var i=Shopware.Component.wrapComponentConfig({template:'{% block swag_paypal %}\n<sw-page class="swag-paypal">\n\n    {% block swag_paypal_header %}\n    <template #smart-bar-header>\n        <h2>\n            {{ $tc(\'sw-settings.index.title\') }}\n            <sw-icon name="regular-chevron-right-xs" small />\n            {{ $tc(\'swag-paypal.header\') }}\n        </h2>\n    </template>\n    {% endblock %}\n\n    {% block swag_paypal_actions %}\n    <template #smart-bar-actions>\n\n        {% block swag_paypal_actions_save %}\n        <sw-button-process\n            v-model:value="isSaveSuccessful"\n            class="sw-settings-login-registration__save-action"\n            variant="primary"\n            :isLoading="isLoading"\n            :disabled="isLoading || savingDisabled || hasError || !acl.can(\'swag_paypal.editor\')"\n            @click="onSave"\n        >\n            {{ $tc(\'global.default.save\') }}\n        </sw-button-process>\n        {% endblock %}\n\n    </template>\n    {% endblock %}\n\n    {% block swag_paypal_content %}\n    <template #content>\n\n        {% block swag_paypal_content_card %}\n        <sw-card-view>\n\n            {% block swag_paypal_content_tabs %}\n            <sw-tabs\n                default-item="general"\n                position-identifier="swag-paypal-content-tabs"\n            >\n                <template #default="{ active }">\n                    <sw-tabs-item\n                        key="general"\n                        :active-tab="active"\n                        :route="{ name: \'swag.paypal.index\', params: { tab: \'general\' } }"\n                    >\n                        {{ $tc(\'swag-paypal.tabs.general\') }}\n                    </sw-tabs-item>\n                    <sw-tabs-item\n                        key="storefront"\n                        :active-tab="active"\n                        :route="{ name: \'swag.paypal.index\', params: { tab: \'storefront\' } }"\n                    >\n                        {{ $tc(\'swag-paypal.tabs.storefront\') }}\n                    </sw-tabs-item>\n                    <sw-tabs-item\n                        key="advanced"\n                        :active-tab="active"\n                        :route="{ name: \'swag.paypal.index\', params: { tab: \'advanced\' } }"\n                    >\n                        {{ $tc(\'swag-paypal.tabs.advanced\') }}\n                    </sw-tabs-item>\n                </template>\n            </sw-tabs>\n            {% endblock %}\n\n            {% block swag_paypal_content_card_channel_config %}\n            <sw-sales-channel-config\n                ref="configComponent"\n                v-model:value="config"\n                domain="SwagPayPal.settings"\n            >\n\n                {% block swag_paypal_content_card_channel_config_sales_channel %}\n                <template #select="{ onInput, selectedSalesChannelId }">\n\n                    {% block swag_paypal_content_card_channel_config_sales_channel_card %}\n                    <sw-card\n                        position-identifier="swag-paypal-sales-channel-card"\n                        :title="$tc(\'global.entities.sales_channel\', 2)"\n                    >\n\n                        <template #header-right>\n                            <sw-internal-link :router-link="{ name: \'sw.settings.payment.overview\' }">\n                                {{ $tc(\'sw-settings-payment.general.mainMenuItemGeneral\') }}\n                            </sw-internal-link>\n                        </template>\n\n                        {% block swag_paypal_content_card_channel_config_sales_channel_card_title %}\n                        <sw-single-select\n                            v-model:value="selectedSalesChannelId"\n                            labelProperty="translated.name"\n                            valueProperty="id"\n                            :isLoading="isLoading"\n                            :options="salesChannels"\n                            :disabled="!acl.can(\'swag_paypal.editor\')"\n                            @update:value="onInput"\n                        />\n                        {% endblock %}\n\n                        {% block swag_paypal_content_card_channel_config_sales_channel_card_footer %}\n                        <template #footer>\n\n                            {% block swag_paypal_content_card_channel_config_sales_channel_card_footer_container %}\n                            <sw-container\n                                columns="2fr 1fr"\n                                gap="0px 30px"\n                            >\n\n                                {% block swag_paypal_content_card_channel_config_sales_channel_card_footer_container_text %}\n                                <p>{{ $tc(\'swag-paypal.saleschannelCard.button.description\') }}</p>\n                                {% endblock %}\n\n                                {% block swag_paypal_content_card_channel_config_sales_channel_card_footer_container_button %}\n                                <sw-button-process\n                                    v-model:processSuccess="isSetDefaultPaymentSuccessful"\n                                    :isLoading="isSettingDefaultPaymentMethods"\n                                    :disabled="!acl.can(\'swag_paypal.editor\')"\n                                    @click="onSetPaymentMethodDefault"\n                                >\n                                    {{ $tc(\'swag-paypal.saleschannelCard.button.label\') }}\n                                </sw-button-process>\n                                {% endblock %}\n\n                            </sw-container>\n                            {% endblock %}\n\n                        </template>\n                        {% endblock %}\n\n                    </sw-card>\n                    {% endblock %}\n\n                </template>\n                {% endblock %}\n\n                {% block swag_paypal_content_card_channel_config_cards %}\n                <template #content="{ actualConfigData, allConfigs, selectedSalesChannelId }">\n                    {% block swag_paypal_content_card_channel_config_webhook %}\n                    <swag-paypal-webhook\n                        v-if="tab === \'advanced\'"\n                        :isLoading="isLoading"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_cross_border %}\n                    <swag-paypal-cross-border\n                        v-if="tab === \'advanced\'"\n                        :isLoading="isLoading"\n                        :actual-config-data="actualConfigData"\n                        :all-configs="allConfigs"\n                        :selected-sales-channel-id="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_credentials_card %}\n                        <swag-paypal-credentials\n                            v-if="tab === \'general\'"\n                            :actualConfigData="actualConfigData"\n                            :allConfigs="allConfigs"\n                            :selectedSalesChannelId="selectedSalesChannelId"\n                            :clientIdErrorState="clientIdErrorState"\n                            :clientSecretErrorState="clientSecretErrorState"\n                            :clientIdSandboxErrorState="clientIdSandboxErrorState"\n                            :clientSecretSandboxErrorState="clientSecretSandboxErrorState"\n                            :clientIdFilled="clientIdFilled"\n                            :clientSecretFilled="clientSecretFilled"\n                            :clientIdSandboxFilled="clientIdSandboxFilled"\n                            :clientSecretSandboxFilled="clientSecretSandboxFilled"\n                            :isLoading="isLoading"\n                        />\n                    {% endblock %}\n\n                    {# @deprecated tag:v10.0.0 - Will be removed without replacement #}\n                    {% block swag_paypal_content_card_channel_config_plus %}\n                    <swag-paypal-plus\n                        v-if="showPlusCard && tab === \'storefront\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_behavior %}\n                    <swag-paypal-behavior\n                        v-if="tab === \'general\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_vaulting %}\n                    <swag-paypal-vaulting\n                        v-if="tab === \'general\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                        :isSaveSuccessful="isSaveSuccessful"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_express %}\n                    <swag-paypal-express\n                        v-if="tab === \'storefront\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                        @preventSave="preventSave"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_installment %}\n                    <swag-paypal-installment\n                        v-if="tab === \'storefront\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_acdc %}\n                    <swag-paypal-acdc\n                        v-if="tab === \'general\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_pui %}\n                    <swag-paypal-pui\n                        v-if="tab === \'general\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                    />\n                    {% endblock %}\n\n                    {% block swag_paypal_content_card_channel_config_spb %}\n                    <swag-paypal-spb\n                        v-if="showSPBCard && tab === \'storefront\'"\n                        :actualConfigData="actualConfigData"\n                        :allConfigs="allConfigs"\n                        :selectedSalesChannelId="selectedSalesChannelId"\n                        @preventSave="preventSave"\n                    />\n                    {% endblock %}\n                </template>\n                {% endblock %}\n\n            </sw-sales-channel-config>\n            {% endblock %}\n\n            {% block swag_paypal_content_card_loading %}\n            <sw-loader v-if="isLoading" />\n            {% endblock %}\n\n        </sw-card-view>\n        {% endblock %}\n\n    </template>\n    {% endblock %}\n\n</sw-page>\n{% endblock %}\n',inject:["SwagPayPalApiCredentialsService","SwagPaypalPaymentMethodService","repositoryFactory","acl"],mixins:[Shopware.Mixin.getByName("notification")],data(){return{isLoading:!1,isSaveSuccessful:!1,isTestSuccessful:!1,isTestSandboxSuccessful:!1,clientIdFilled:!1,clientSecretFilled:!1,clientIdSandboxFilled:!1,clientSecretSandboxFilled:!1,sandboxChecked:!1,salesChannels:[],config:{},isSetDefaultPaymentSuccessful:!1,isSettingDefaultPaymentMethods:!1,savingDisabled:!1,messageBlankErrorState:{code:1,detail:this.$tc("swag-paypal.messageNotBlank")},showCredentials:!1,allowShowCredentials:!0,configComponent:null,...t.ZP}},metaInfo(){return{title:this.$createTitle()}},computed:{configComponent(){return this.$refs.configComponent||null},showSPBCard(){let n=this.$refs.configComponent?.allConfigs;if(n?.null)return!0;let a=this.config["SwagPayPal.settings.merchantLocation"]??n?.null["SwagPayPal.settings.merchantLocation"],e=this.config["SwagPayPal.settings.plusCheckoutEnabled"]??n?.null["SwagPayPal.settings.plusCheckoutEnabled"];return a!==this.MERCHANT_LOCATION_GERMANY||!e},showPlusCard(){return!this.showSPBCard},salesChannelRepository(){return this.repositoryFactory.create("sales_channel")},clientIdErrorState(){return this.isLoading||this.sandboxChecked||this.clientIdFilled?null:this.messageBlankErrorState},clientSecretErrorState(){return this.isLoading||this.sandboxChecked||this.clientSecretFilled?null:this.messageBlankErrorState},clientIdSandboxErrorState(){return this.isLoading||!this.sandboxChecked||this.clientIdSandboxFilled?null:this.messageBlankErrorState},clientSecretSandboxErrorState(){return this.isLoading||!this.sandboxChecked||this.clientSecretSandboxFilled?null:this.messageBlankErrorState},hasError(){return!this.sandboxChecked&&!(this.clientIdFilled&&this.clientSecretFilled)||this.sandboxChecked&&!(this.clientIdSandboxFilled&&this.clientSecretSandboxFilled)},salesChannelCriteria(){let n=new s(1,500);return n.addFilter(s.equalsAny("typeId",[l.storefrontSalesChannelTypeId,l.apiSalesChannelTypeId])),n},tab(){return this.$route.params.tab||"general"}},watch:{config:{deep:!0,handler(){let n=this.$refs.configComponent?.allConfigs?.null;null===this.$refs.configComponent?.selectedSalesChannelId?(this.clientIdFilled=!!this.config["SwagPayPal.settings.clientId"],this.clientSecretFilled=!!this.config["SwagPayPal.settings.clientSecret"],this.clientIdSandboxFilled=!!this.config["SwagPayPal.settings.clientIdSandbox"],this.clientSecretSandboxFilled=!!this.config["SwagPayPal.settings.clientSecretSandbox"],this.sandboxChecked=!!this.config["SwagPayPal.settings.sandbox"]):(this.clientIdFilled=!!this.config["SwagPayPal.settings.clientId"]||!!n?.["SwagPayPal.settings.clientId"],this.clientSecretFilled=!!this.config["SwagPayPal.settings.clientSecret"]||!!n?.["SwagPayPal.settings.clientSecret"],this.clientIdSandboxFilled=!!this.config["SwagPayPal.settings.clientIdSandbox"]||!!n?.["SwagPayPal.settings.clientIdSandbox"],this.clientSecretSandboxFilled=!!this.config["SwagPayPal.settings.clientSecretSandbox"]||!!n?.["SwagPayPal.settings.clientSecretSandbox"],this.sandboxChecked=!!this.config["SwagPayPal.settings.sandbox"]||!!n?.["SwagPayPal.settings.sandbox"])}}},created(){this.createdComponent()},methods:{createdComponent(){this.$route.params.tab||this.$router.push({name:"swag.paypal.index",params:{tab:"general"}}),this.isLoading=!0,this.salesChannelRepository.search(this.salesChannelCriteria,Shopware.Context.api).then(n=>{n.add({id:null,translated:{name:this.$tc("sw-sales-channel-switch.labelDefaultOption")}}),this.salesChannels=n}).finally(()=>{this.isLoading=!1})},onSave(){this.hasError||this.save()},onChangeLoading(n){this.isLoading=n},save(){this.isLoading=!0,this.$refs.configComponent?.save().then(n=>{if(this.isSaveSuccessful=!0,n.payPalWebhookErrors){let a=this.$tc("swag-paypal.settingForm.messageWebhookError");n.payPalWebhookErrors.forEach(n=>{this.createNotificationError({message:`${a}<br><br><ul><li>${n}</li></ul>`})})}}).finally(()=>{this.isLoading=!1})},onSetPaymentMethodDefault(){this.isSettingDefaultPaymentMethods=!0,this.SwagPaypalPaymentMethodService.setDefaultPaymentForSalesChannel(this.$refs.configComponent?.selectedSalesChannelId).then(()=>{this.isSettingDefaultPaymentMethods=!1,this.isSetDefaultPaymentSuccessful=!0})},preventSave(n){this.savingDisabled=!!n},onChangeCredentialsVisibility(n){this.showCredentials=n}}})},6867:function(n,a,e){"use strict";a.ZP={MERCHANT_LOCATION_GERMANY:"germany",MERCHANT_LOCATION_OTHER:"other"}},2175:function(n,a,e){var t=e(3389);t.__esModule&&(t=t.default),"string"==typeof t&&(t=[[n.id,t,""]]),t.locals&&(n.exports=t.locals),e(5346).Z("2373a2d3",t,!0,{})}}]);