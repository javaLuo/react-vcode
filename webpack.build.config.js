const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin"); // 优化js
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  mode: "production",
  // 页面入口文件配置
  entry: {
    index: ["./src/index.tsx"],
  },
  // 输出文件配置
  output: {
    path: path.resolve(ROOT_PATH, "dist"),
    filename: "[name].js",
    library: "vcode",
    libraryTarget: "umd",
    globalObject: 'this'
    //libraryExport: 'default',
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_console: true, // 删除所有的console.*
            drop_debugger: true, // 删除所有的debugger
            // pure_funcs: ["console.log"], // 删除所有的console.log
          },
        },
      }),
    ],
  },
  // 解析器配置
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.(ts|tsx|js|jsx)?$/,
        enforce: "pre",
        use: ["source-map-loader", "eslint-loader"],
        include: path.join(__dirname, "src"),
      },
      {
        // .tsx用typescript-loader解析解析
        test: /\.(ts|tsx|js|jsx)?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
          },
        ],
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["url-loader?limit=8192&name=images/[name].[ext]"],
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
        use: ["file-loader?name=files/[name].[ext]"],
        include: [path.join(__dirname, "src")],
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
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".css"], //后缀名自动补全
  },
};
