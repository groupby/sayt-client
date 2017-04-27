import '../src/polyfills';

const coreContext = require.context('../src', true, /\.ts/);
coreContext.keys().forEach(coreContext);

const testContext = require.context('./unit', true, /\.ts/);
testContext.keys().forEach(testContext);
