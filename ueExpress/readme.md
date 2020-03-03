*****************    服务器后端 **************

1, 安装express -g 
            "dependencies": {
            "body-parser": "^1.19.0",
            "cookie-parser": "~1.4.4",
            "debug": "~2.6.9",
            "ejs": "^3.0.1",
            "express": "~4.16.1",
            "http-errors": "~1.6.3",
            "jade": "~1.11.0",
            "morgan": "~1.9.1",
            "ueditor": "^1.2.3"
        }
 2, 下载nodejs版的ueditor  或者使用jsp版   把jsp文件夹改为nodejs;  utf8-jsp 改名为ueditor,将ueditor放在服务器的public目录下 
        nodejs 
            --config.json   (只保留刘一个一个文件夹,不错任何处理)
        新增一个ueditor.config.json ,复制config.json 里面内容
        修改地址为服务器的地址 参考app写入的上传地址!!!!
        {
             "imageUrlPrefix": "http://127.0.0.1:3000",   /* 图片访问路径前缀 */
             "imagePathFormat": "/img/ueditor/{time}{rand:6}",  /* 上传保存路径,可以自定义保存路径和文件名格式 */
        }

3, 如果遇到跨域 写入app.use(*,function.....) ,前端新版  "react": "^16.12.0",中 要用 "http-proxy-middleware": "^0.21.0", 
        在项目目录src/下新建setupProxy.js文件，然后写入如下代码:

        const proxy = require('http-proxy-middleware');

        module.exports = function(app) {
        app.use(proxy('/uedior/ue', { 
            target: 'http://127.0.0.1:3000' ,    //服务的地址
            secure: false,
            changeOrigin: true,
            
            }));
        };
        
*********************  前端 ******************


下载nodejs版的ueditor  或者使用jsp版   把jsp文件夹改为nodejs;  utf8-jsp 改名为ueditor,将ueditor放在服务器的public目录下 
        nodejs 
            --config.json   (只保留刘一个一个文件夹,不错任何处理)
        其中文件照旧
 前端中没有 ueditor.config.json





