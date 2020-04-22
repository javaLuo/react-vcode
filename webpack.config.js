var path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "example", "src", "index.js"),
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        include: [path.join(__dirname, "example")],
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["url-loader?limit=8132&name=images/[name].[ext]"],
        include: [path.join(__dirname, "example")],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf|png)(\?|$)/,
        use: ["file-loader?name=files/[name].[ext]"],
        include: [path.join(__dirname, "src")],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "example"),
  },
};
