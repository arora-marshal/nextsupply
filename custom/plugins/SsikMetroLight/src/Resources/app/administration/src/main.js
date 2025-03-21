import './module/sw-cms/component';
//Blocks
import './module/sw-cms/blocks';
//Elements
import './module/sw-cms/elements';

//Snippets
import deDE from './module/snippet/de-DE.json';
import enGB from './module/snippet/en-GB.json';

Shopware.Locale.extend('en-GB', enGB);
Shopware.Locale.extend('de-DE', deDE);