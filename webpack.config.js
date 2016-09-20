var pjson = require('./package.json');

var isCi = process.env.NODE_ENV === 'ci';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules', 'src']
  },

  module: {

    preLoaders: isCi ? [] : [{
      test: /\.ts$/,
      loader: 'tslint'
    }],

    postLoaders: isCi ? [] : [{
      test: /\.ts$/,
      loader: 'sourcemap-istanbul-instrumenter',
      exclude: [
        /node_modules/,
        /test/,
        /karma\.entry\.ts$/
      ]
    }],

    loaders: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript',
      query: {
        inlineSourceMap: true,
        sourceMap: false
      }
    }]
  }
};
