/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;

const isDev = mode === 'development';

const generateFilename = ext => (isDev ?
  `[name].${ext}` :
  `[name].[contenthash].${ext}`);

module.exports = {
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },

  output: {
    filename: `./js/${generateFilename('js')}`,
    path: path.resolve(__dirname, 'build'),
    environment: {
      arrowFunction: false,
    },
  },
  mode,
  context: path.resolve(__dirname, 'src'),
  plugins:
        [new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
              collapseWhitespace: !isDev,
            },
          }),
          new MiniCssExtractPlugin({
            filename: `./css/${generateFilename('css')}`,
          }),
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src', 'img'),
                to: path.resolve(__dirname, 'build', 'img'),
              },
            ],
          }),
        ],
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './build',
    open: true,
    port: 3000,
    hot: true,
    compress: true,
    overlay: true,
    writeToDisk: true,
    historyApiFallback: true,
  },
  devtool: isDev && 'source-map',
};
