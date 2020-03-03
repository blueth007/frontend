下载 ueditor php版
拷贝uedior到public目录下
修改ueditor.config.js 
     // 服务器统一请求接口路径
        , serverUrl: "HTTP://127.0.0.1:80/ueditor/php/controller.php"   


修改config.json
    "imageUrlPrefix": "http://127.0.0.1:80", /* 图片访问路径前缀 */
       
controller.php 取消注释
    header('Access-Control-Allow-Origin:*'); //设置http://www.baidu.com允许跨域访问
    header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With'); //设置允许的跨域header
 
 将php的文件夹拷贝的后端php的根目录下
  新建upload/image   uplaod/file  upload/video


 结果:
    可以上传单个图片单是在内容中不会显示;
    可以上传成功flv视频 ,mp4 不能成功;
    可以上传多个图片,插入内容中可以成功;
    附件成功,涂鸦成功,附件(带mp4 不行)  





///////////   Nodejs版     /////////////
///////////   Nodejs版     /////////////
///////////   Nodejs版     /////////////
///////////   Nodejs版     /////////////
///////////   Nodejs版     /////////////

这个版本 功能比较祈愿 所有都可以上传
    
*****************    服务器后端  **************

1, 安装express -g 
            "dependencies": {
            "body-parser": "^1.19.0",
            "cookie-parser": "~1.4.4",
            "debug": "~2.6.9",
            "ejs": "^3.0.1",
            "express": "~4.16.1",
            "http-errors": "~1.6.3",
            "http-proxy-middleware": "^0.21.0",
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


 package.json           
{
  "name": "ueditor",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "http-proxy-middleware": "^0.21.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
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
 
}

