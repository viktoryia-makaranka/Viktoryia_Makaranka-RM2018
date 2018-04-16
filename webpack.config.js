const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './docs'),
    publicPath: '',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/[name].map',
  },
  devServer: {
    contentBase: './docs',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vika App',
      template: './src/index.html'
    }),
    new HotModuleReplacementPlugin()
  ]
}