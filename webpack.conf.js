var fail = require('webpack-fail-plugin'),
  pjson = require('./package.json');

module.exports = {
  entry: './src/index.ts',
  output: { filename: pjson.name + '-' + pjson.version + '.js' },
  plugins: [fail],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  },

  devtool: 'source-map'
};
