import webpack from 'webpack'
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin.js'
import path from 'path'

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[hash].[ext]'
      },
      {test: /\.json$/, loader: 'json-loader'},
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },

  devtool: '#source-map',

  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],

  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./scripts/app']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  externals: [/^vendor\/.+\.js$/]
}
