const webpack = require('webpack');
const path = require('path');
const HtmlWebpackAssetPlugin = require('html-asset-webpack-plugin');
const helper = require('./helper');
const cfg = require('../app.config.js');
const { port, host } = cfg.server;

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: helper.createDevModeEntry(cfg.html),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: `http://${host}:${port}/`,
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },
      DEBUG: true,
    }),
    new webpack.LoaderOptionsPlugin({ debug: true, minimize: false }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    ...helper.createHtmlPlugins(cfg.html),
    new HtmlWebpackAssetPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, // 通过正则匹配js,jsx文件
        loader: 'babel-loader',
        exclude: /node_modules/, // 跳过 node_modules 目录
        include: path.resolve(__dirname, '../src'),
        query: {
          cacheDirectory: false,
        },
      },
      { test: /\.(jpg|gif|png|svg|ico)$/, loader: 'file-loader?name=images/[name].[ext]' },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../src/css/'), // 非src/css下的scss开启局部样式模式
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&sourceMap=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/css/'),
        loaders: ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
};
