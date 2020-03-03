const { override, fixBabelImports, addLessLoader,  addDecoratorsLegacy  } = require("customize-cra");
const modifyVars = require("./LessVars");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // style: 'css',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  addDecoratorsLegacy(),    //修复使用装饰器@

);
