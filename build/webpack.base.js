var path = require('path');
var webpack = require('webpack');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    vchart: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'vchart',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: {
    'chart.js': {
      root: 'Chart',
      commonjs: 'chart.js',
      commonjs2: 'chart.js',
      amd: 'chart.js'
    },
    'vue': {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};
