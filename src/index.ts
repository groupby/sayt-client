/// <reference path="../typings/index.d.ts" />
/// <reference path="../custom-typings/index.d.ts" />

require('es6-promise').polyfill();
require('./polyfills').pollyfill();

import { Sayt }  from './core/sayt';

const sayt = new Sayt();
export = sayt;

if (window !== undefined) {
  window['sayt'] = sayt;
}
