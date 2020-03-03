新增 mini-css-extract-plugin 自动将css打包到dis下的css 
npm i postcss-loader aotuprefixer -D  根据浏览器考虑兼容代码前缀

//自动生成css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
plugins:[
     new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',  //在css目录下
        }),
]

modules.rules:[
    {
         {
                //匹配css文件
                test: /\.css$/,
                use: [
                    //生成一个内容为最终解析完的css代码的style标签，放到head标签里
                    //  'style-loader',
                    MiniCssExtractPlugin.loader, // 自动打包生产css
                    'css-loader',
                    'postcss-loader'   //代码前缀

                ]
            },
    }
]

postcss.config.js
module.exports={
    plugins: [
        require('autoprefixer')   //他需要浏览器列表进行兼容 在packjson 中添加
      ]
}

"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }






   支持箭头函数 头部引入 import '@babel/polyfill';


   新增一个react的 时钟



运行npm run dev 

