const path = require('path');

// eslint-disable-next-line no-process-env
const isCi = process.env.NODE_ENV === 'ci';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },

  module: {

    rules:
      (isCi ? [{
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          // typeCheck: true
        }
      }, {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'test'),
          path.resolve(__dirname, 'test/karma.entry.ts')
        ],
        loader: 'sourcemap-istanbul-instrumenter-loader'
      }] : [])
      .concat({
        test: /\.ts$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'awesome-typescript-loader',
        options: {
          sourceMap: false,
          inlineSourceMap: true
        }
      })
  }
};
