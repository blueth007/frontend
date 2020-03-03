const { createProxyMiddleware } = require('http-proxy-middleware') //注意http-proxy-middleware这个是1.0的版本

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3030',
      secure: false,
      changeOrigin: true
    })
  )
}
