const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

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
  externals: nodeExternals(),
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
    //new BabiliPlugin({ comments: false }),
  ],
};
