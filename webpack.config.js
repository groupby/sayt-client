var pjson = require('./package.json');

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: pjson.name + '-' + pjson.version + '.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },

  module: {

    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],

    loaders: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  }
};
