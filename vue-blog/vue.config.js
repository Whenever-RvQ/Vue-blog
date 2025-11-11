const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '',

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
    }

    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public")); esLint
  },
}