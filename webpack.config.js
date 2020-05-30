const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: {
    app: `./src/index.js`,
  },
  output: {
    filename: `[name].js`,
    path: path.join(__dirname, `public`),
  },
  resolve: {
    alias: {
      generated: path.resolve(__dirname, `vendor-lib/zb-aliases/`),
      zb: path.resolve(__dirname, `node_modules/zombiebox/zb`),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    inline: false,
    host: `0.0.0.0`,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
};
