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
    },
      {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8132&name=images/[name].[ext]',
          include: [
              path.join(__dirname, 'example')
          ]
      },
        {
            test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf|png)(\?|$)/,
            loader: 'file-loader?name=files/[name].[ext]',
            include: [
                path.join(__dirname, 'src')
            ]
        }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example')
  }
}