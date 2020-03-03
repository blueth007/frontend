var express = require('express')
var router = express.Router()
const path = require('path')
var fs = require('fs') //文件模块
/* GET users listing. */

router.get('/products', function(req, res, next) {
  console.log(req.body) //获取请求参数

  res.header('Access-Control-Allow-Origin', '*') //增加跨域支持
  res.setHeader('Content-Type', 'application/json;charset=utf-8')

  const file = path.resolve(__dirname, '../datas', 'productions.json')
  // var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

  //读取json文件
  fs.readFile(file, 'utf-8', function(err, data) {
    console.log(data, file)
    if (err) {
      res.send('文件读取失败')
    } else {
      res.send(data)
    }
  })
})

module.exports = router
