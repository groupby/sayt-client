/// <reference path="../typings/index.d.ts" />
/// <reference path="../custom_typings/jsonp.d.ts" />

require('es6-promise').polyfill();
require('./polyfills').pollyfill();

import { Sayt } from './core/sayt';
export * from './core/sayt';

if (window !== undefined) {
  window['sayt'] = new Sayt();
}
