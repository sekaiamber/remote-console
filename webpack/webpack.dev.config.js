var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  context: path.join(__dirname, '..', '/'),
  entry: {
    // Add each page's entry here
    test: './pages/test/index',
    remote: './pages/remote/index',
    gugu: './lib/index',
  },
  output: {
    path: path.join(__dirname, '..', '/test/dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')), // judge if dev environment.
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')) // judge if secret environment.
    }),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      template: './pages/test/template.html',
      filename: 'test.html',
      chunks: ['test'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      template: './pages/remote/template.html',
      filename: 'remote.html',
      chunks: ['remote'],
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: './pages/snippet', to: 'snippet' },
    ]),
  ],
  module: {
    perLoaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
      {
        test: /.reactx$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      ,
      {
        test: /.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.scss$/,
        loader: 'to-string-loader!css-loader!autoprefixer?{browsers:["last 2 version", "> 1%"]}!sass'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url?limit=10000!img?progressive=true'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.reactx$/,
        loader: 'reactx-loader'
      },
    ],
    noParse: []
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.reactx', 'react'],
    alias: {}
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: {
      index: 'remote.html',
      rewrites: [
        { from: /\/index/, to: '/remote.html' },
        { from: /\/remote/, to: 'remote.html' },
        { from: /\/test/, to: '/test.html' },
      ]
    },
    // proxy: {
    //   '/api/v1/*': {
    //     target: 'http://123.59.79.196',
    //     secure: false
    //   }
    // }
  },
  externals: {
    jquery: "$",
    wilddog: "wilddog",
  },
  reactx: {
    // loaders for each langs
    loaders: {
      js: 'babel',
      coffee: 'babel!coffee',
      sass: 'style-loader!css-loader!autoprefixer?{browsers:["last 2 version", "> 1%"]}!sass'
    },
    // whether use source map
    sourceMap: true
  }
};

module.exports = config;