const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const webpack           = require('webpack');
const path              = require('path');

const IS_DIST = (process.argv.indexOf('--dist') !== -1) ? true : false;
const IS_DEPLOY = (process.argv.indexOf('--deploy') !== -1) ? true : false;
const STYLE_LOAD = 'css-loader!postcss-loader!sass-loader';
const STYLE_LOADER = (IS_DIST || IS_DEPLOY) ? ExtractTextPlugin.extract('style-loader', STYLE_LOAD) : `style-loader!${STYLE_LOAD}`;

const config = {
  devServer: {
    port: 1987
  },
  entry: {
    demo: './src/entries/demo/script/index.js'
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name][hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: /(src)/,
        query: {
          presets: [
            'es2015'
          ]
        }
      },
      {
        test: /\.scss$/,
        include: /(src)/,
        loader: STYLE_LOADER
      },
      {
        test: /\.pug$/,
        include: /(src)/,
        loader: 'pug'
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./src/entries')
    ],
    extensions: [ '', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entries/demo/markup/index.pug',
      filename: 'index.html',
      title: 'Whirl',
      chunks: [ 'demo' ],
      whirls: 'yep',
      minify: {
        collapseWhitespace: true
      }
    }),
    (IS_DEPLOY) ? new ExtractTextPlugin('[name][hash].css') : function () {},
    (IS_DEPLOY) ? new webpack.optimize.UglifyJsPlugin() : function () {}
  ],
  postcss: function () {
    return [ autoprefixer ];
  }
}

module.exports = config;
