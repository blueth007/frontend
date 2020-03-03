const path = require("path");
//自动生成html文件并注入script标签引用
const HtmlWebpackPlugin = require('html-webpack-plugin')

//自动生成css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    // // 入口文件地址
    // entry:{
    //     //将src/index.js设置为入口文件，main可任意设置，这里设为文件名相同
    //     main:'./src/index.js'
    // },
    // es6语法入口文件地址
    entry: {
        //为项目添加垫片
        polyfill: '@babel/polyfill',
        //将src/index.js设置为入口文件，main可任意设置，这里设为文件名相同
        main: './src/index.js'
    },
    // 出口文件配置
    output: {
        // 最终打包路径
        path: path.resolve(__dirname, './dist'),
        // 打包文件的名称,name为入口文件的名称
        filename: 'js/[name].[hash:8].js' //可以加hash值来命名 或者加入文件夹中 "js/[name].[chunkhash:8].js"
    },
    //插件，类似于中间件，可在打包过程中进行功能扩展
    plugins: [
        new HtmlWebpackPlugin({
            //生成html文件的标题
            title: "webpack",
            //html文件的文件名，默认是index.html
            filename: "index.html",
            //生成文件依赖的模板，支持加载器(如handlebars、ejs、undersore、html等)
            template: './public/index.html',
            // script标签插入位置
            // true 默认值，script标签位于html文件的 body 底部
            // body script标签位于html文件的 body 底部
            // head script标签位于html文件的 head中
            // false 不插入生成的js文件，这个几乎不会用到的
            inject: true,
            //将给定的图标加入到输出的html文件
            // favicon:'./public/favicon.ico'
        }),
        //自动生成css在dist
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
        }),
    ],
    devServer: {
        //设置开发服务起的目标地址
        contentBase: path.resolve(__dirname, './dist'),
        //服务器访问地址
        host: 'localhost',
        //服务器端口
        port: 8088,
        //是否启用服务器压缩
        compress: true
    },
    module: {
        rules: [
            {
                //匹配js或jsx类型文件
                test: /\.(js|jsx)$/,
                //使用babel-loader进行转义
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        //运行时编译es6，入口文件引用作为辅助和内建，
                        //1.自动添加垫片到你的当前代码模块而非全局，以避免编译输出的重复问题
                        //2.为你的代码创建一个沙盒环境，将内置插件起了别名 core-js，这样就可以无缝的使用它们，并且无需使用 polyfill
                        "@babel/plugin-transform-runtime",
                      

                    ]
                }
                ,
                //设置目标文件
                include: path.resolve(__dirname, './src/'),
                //设置排除文件
                exclude: path.resolve(__dirname, './node_modules'),

            },
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
            {

                test: /\.s[ac]ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    MiniCssExtractPlugin.loader, // 自动打包生产css
                    // Translates CSS into CommonJS
                    'css-loader',
                    // // Compiles Sass to CSS
                    'sass-loader',
                    'postcss-loader' //代码前缀
                    /*
                                        //模块化scss 
                                        { loader: 'style-loader' },
                                        //解析css模块引入
                                        {
                                            loader: 'css-loader',
                                            options: {
                                                modules: { localIdentName: '[path][name]__[local]--[hash:base64:5]' } //必须使用 import TestCss from ‘./ .scss’来模块化对应scss
                                            }
                                        },
                                        { loader: 'sass-loader' },
                    
                                        */
                ],

            },
            {
                /* file-loader可以处理文件对象，并将处理后的文件变成文件内容的MD5 hash，后缀名为源文件的后缀名。url-loader 封装了file-loader，其工作时会分为两类情况：

文件大小小于 limit 参数，url-loader 将会把文件转为 DataURL
文件大小大于 limit ，url-loader 会调用 file-loader 进行处理，参数也会直接传给 file-loader。因此我们只需要安装 url-loader 即可。
*/
                //匹配png jpg gif类型的文件,忽略大小写
                test: /\.(png|svg|jpg|gif|bmp)$/i,
                use: [
                    {
                        /**
                         * 可以处理文件对象，并将处理后的文件变成文件内容的MD5 hash，后缀名为源文件的后缀名。
                         *          类型          名称           默认值                               描述
                         * @param {Number}       limit       'undefined'                  文件小于limit时，以URL方式引入
                         * @param {string}      mimetype       extname          是否把其他后缀名的图片文件，统一转为同一种格式的base64编码   
                         * @param {string}      fallback     file-loader                文件大于limit时，调用file-loader方式处理
                         */
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png',
                            limit: '8024',
                            /**
                             * name表示输出的文件名规则，如果不添加这个参数，输出的就是默认值：文件哈希。
                             * 加上[path]表示输出文件的相对路径与当前文件相对路径相同，
                             * 加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。
                             * 加上[hash]表示加上一个hash码，用于唯一标识打包文件
                             * 加上[path]这个参数后，打包后文件中引用文件的路径也会加上这个相对路径。
                             */
                            name: '[name].[hash].[ext]',
                            /**
                             *  outputPath表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。
                             * 但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，
                             * 图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，
                             * 把图片放到里面。
                             */
                            outputPath: 'img/'
                            /**
                             *  publicPath表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，
                             * 那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。
                             */
                            //publicPath:'output/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {

        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [" ", ".js", ".jsx", ".json", ".css", ".scss"],
        alias: {    //别名
            '@': path.join(__dirname, './src')
        }
    },
}