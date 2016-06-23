GroupBy SAYT Client
========

![license](https://img.shields.io/github/license/groupby/sayt.svg)
[![npm](https://img.shields.io/npm/dm/sayt.svg)](https://www.npmjs.com/package/sayt)
[![npm](https://img.shields.io/npm/v/sayt.svg)](https://www.npmjs.com/package/sayt)

The following instructions assume that you are creating a search & merch single page app using the
GroupBy commerce platform.  
For instructions to integrate with an existing NodeJS application please read this file.
[README.nodejs.md](README.nodejs.md)

### Usage

```js
  sayt({ /* options */ });
  sayt.autocomplete('red boots', { /* autocomplete options */ });
  sayt.productSearch('red boots', { /* product search options */ });
```
