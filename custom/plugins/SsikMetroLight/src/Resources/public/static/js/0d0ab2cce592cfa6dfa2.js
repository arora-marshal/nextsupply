(window["webpackJsonpPluginssik-metro-light"]=window["webpackJsonpPluginssik-metro-light"]||[]).push([[131],{456:function(){},131:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return n}}),r(774);var n={template:'<div class="ssik-extra-preview-elements"></div>',computed:{assetFilter(){return Shopware.Filter.getByName("asset")}}}},774:function(e,t,r){var n=r(456);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),r(346).Z("7b1a220e",n,!0,{})},346:function(e,t,r){"use strict";function n(e,t){for(var r=[],n={},s=0;s<t.length;s++){var i=t[s],a=i[0],o={id:e+":"+s,css:i[1],media:i[2],sourceMap:i[3]};n[a]?n[a].parts.push(o):r.push(n[a]={id:a,parts:[o]})}return r}r.d(t,{Z:function(){return h}});var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=s&&(document.head||document.getElementsByTagName("head")[0]),o=null,u=0,d=!1,l=function(){},c=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,r,s){d=r,c=s||{};var a=n(e,t);return v(a),function(t){for(var r=[],s=0;s<a.length;s++){var o=i[a[s].id];o.refs--,r.push(o)}t?v(a=n(e,t)):a=[];for(var s=0;s<r.length;s++){var o=r[s];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete i[o.id]}}}}function v(e){for(var t=0;t<e.length;t++){var r=e[t],n=i[r.id];if(n){n.refs++;for(var s=0;s<n.parts.length;s++)n.parts[s](r.parts[s]);for(;s<r.parts.length;s++)n.parts.push(m(r.parts[s]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{for(var a=[],s=0;s<r.parts.length;s++)a.push(m(r.parts[s]));i[r.id]={id:r.id,refs:1,parts:a}}}}function g(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function m(e){var t,r,n=document.querySelector("style["+p+'~="'+e.id+'"]');if(n){if(d)return l;n.parentNode.removeChild(n)}if(f){var s=u++;t=b.bind(null,n=o||(o=g()),s,!1),r=b.bind(null,n,s,!0)}else t=w.bind(null,n=g()),r=function(){n.parentNode.removeChild(n)};return t(e),function(n){n?(n.css!==e.css||n.media!==e.media||n.sourceMap!==e.sourceMap)&&t(e=n):r()}}var y=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}();function b(e,t,r,n){var s=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,s);else{var i=document.createTextNode(s),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function w(e,t){var r=t.css,n=t.media,s=t.sourceMap;if(n&&e.setAttribute("media",n),c.ssrId&&e.setAttribute(p,t.id),s&&(r+="\n/*# sourceURL="+s.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}}}]);