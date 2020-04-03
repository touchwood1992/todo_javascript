const path = require("path");
module.exports = {
  //ENTRY
  entry: ["./src/js/app.js"],
  //OUTPUT
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/app-bundle.js"
  },
  //DEV SERVER
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000
  },
  //LOADERS used to compile es6 code into es5 compatible using babel before plugin exectes
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  }
  //mode: "production" //OR development  OR  none or pass it as a CLI argument: webpack --mode=development
};
