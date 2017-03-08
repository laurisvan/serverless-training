const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Support for multiple entries
    './api/meetups/index.js': './api/meetups/index.js',
  },
  output: {
    libraryTarget: 'commonjs',
    path: '.webpack',
    filename: '[name]'
  },
  target: 'node',
  externals: [
    // Do not add aws-sdk - it is built-in in
    'aws-sdk'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    //new webpack.IgnorePlugin(/(regenerator|nodent|js-beautify)$/), // Unnecessary AJV deps

    // Assign the module and chunk ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin(),

    // Remove duplication
    new webpack.optimize.DedupePlugin(),

    // Chunk merging strategy
    new webpack.optimize.AggressiveMergingPlugin(),

    // Babili Babel minification
    new BabiliPlugin({ comments: false }),
  ],
};
