const webpack = require("webpack");

module.exports = {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "global.MAIL_SECRET": JSON.stringify(process.env.MAIL_SECRET)
    })
  ]
};
