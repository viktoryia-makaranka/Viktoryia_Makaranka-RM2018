import  path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractSass = new ExtractTextPlugin({
  filename: "[name].[hash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  return {
    context: path.resolve(__dirname, 'src'),
    entry: ['babel-polyfill', './index.js'],

    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',

    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: '',
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].bundle.js',
      sourceMapFilename: 'js/[name].map'
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            minSize: 0,
            minChunks: 2
          }
        }
      }
    },

    devServer: {
      contentBase: './docs',
      hot: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      port: 3000
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }, {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
            fallback: "style-loader"
          })
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Vika App',
        hash: true,
        template: './index.html'
      }),
      new HotModuleReplacementPlugin(),
      extractSass
    ]
  }
}