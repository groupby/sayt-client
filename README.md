GroupBy SAYT Client
========

[![CircleCI](https://circleci.com/gh/groupby/sayt.svg?style=svg)](https://circleci.com/gh/groupby/sayt)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3d51351554874f41ba039792ecb82ad8)](https://www.codacy.com/app/GroupByInc/sayt?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=groupby/sayt&amp;utm_campaign=Badge_Grade)

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
