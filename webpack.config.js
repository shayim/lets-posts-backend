const NodemonPlugin = require('nodemon-webpack-plugin')

var fs = require('fs')
var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'server.bundles.js',
    path: '/dist'
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new NodemonPlugin({
      verbose: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node'
}
