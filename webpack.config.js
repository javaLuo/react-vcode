var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'example', 'src', 'index.js'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-3', 'react']
      },
      include: [
        path.join(__dirname, 'example')
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example')
  }
}