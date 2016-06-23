var dts = require('dts-bundle'),
  pjson = require('../../package.json'),
  paths = require('../paths');

dts.bundle({
  name: pjson.name,
  main: paths.dist.commonjs + '/index.d.ts'
});
