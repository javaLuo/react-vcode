const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin'); // 优化js
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  mode: 'production',
  // 页面入口文件配置
  entry: {
    index: ['./src/index.js'],
  },
  // 输出文件配置
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].js',
    library: 'vcode',
    libraryTarget: 'umd',
    //libraryExport: 'default',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          output: {
            comments: false, // 不保留注释
          },
        },
      }),
    ],
  },
  // 解析器配置
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=8192&name=images/[name].[ext]'],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
        use: ['file-loader?name=files/[name].[ext]'],
        include: [path.join(__dirname, 'src')],
      },
    ],
  },
  // 第3方插件配置
  plugins: [
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  // 其他解决方案配置
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'], //后缀名自动补全
  },
};
