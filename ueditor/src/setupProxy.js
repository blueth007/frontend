const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy("/ueditor/ue", { 
       target: "http://127.0.0.1:3000" ,
       secure: false,
       changeOrigin: true,
       
       // cookieDomainRewrite: "http://localhost:3000"
    }));
};