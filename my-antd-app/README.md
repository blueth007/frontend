1, 安装react-app
2, 安装 npm i react-app-rewired react-app-rewired -D
3, 项目根目录创建一个 config-overrides.js 用于修改默认配置。

    module.exports = function override(config, env) {
    // do stuff with the webpack config...
    return config;
    };

4, 使用 babel-plugin-import#
    + const { override, fixBabelImports } = require('customize-cra');

    - module.exports = function override(config, env) {
    -   // do stuff with the webpack config...
    -   return config;
    - };
    + module.exports = override(
    +   fixBabelImports('import', {
    +     libraryName: 'antd',
    +     libraryDirectory: 'es',
    +     style: 'css',
    +   }),
    + );

5, 自定义主题 需要less 和less.loader
    新建lessvars.js
    module.exports = {
        '@ primary-color': '#1890ff',// 全局主色
        '@ link-color': '#1890ff',// 链接色
        '@ success-color': '#52c41a',// 成功色
        '@ warning-color': '#faad14',// 警告色
        '@ error-color': '#f5222d',// 错误色
        '@ font-size-base': '14px',// 主字号
        '@ heading-color': 'rgba(0, 0, 0, 0.85)',// 标题色
        '@ text-color': 'rgba(0, 0, 0, 0.65)',// 主文本色
        '@ text-color-secondary ': 'rgba(0, 0, 0, .45)',// 次文本色
        '@ disabled-color ': 'rgba(0, 0, 0, .25)',// 失效色
        '@ border-radius-base': '4px',// 组件/浮层圆角
        '@ border-color-base': '#d9d9d9',// 边框色
        '@ box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',// 浮层阴影
    }

    修改config-overrides.js
    const { override, fixBabelImports } = require('customize-cra');
    const modifyVars=require('./LessVars')


    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            // style: 'css',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars ,
        }),

    )

6, 安装antd


**********************************************
页面规划
 
  --login
  --notfound
  --admim
    --dashboard   展示
    --article  文章
    --list  列表
    --edit  编辑
    --settings  设置


