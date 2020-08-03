const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'), 
  mode: 'development',
  entry: {
    main: './pages/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'main.css'
    }),
    new CopyWebpackPlugin ({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/placesphotos/onerror.jpg'),
          to: path.resolve(__dirname,  'dist/images/placesphotos/onerror.jpg')
        }
    ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader , 
              { 
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|svg|ico|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  }
}