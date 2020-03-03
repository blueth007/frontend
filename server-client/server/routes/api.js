var express = require('express')
var router = express.Router()

/* GET users listing. */

const data = {
  data: {
    code: 200,
    Msg: 'Infos'
  }
}

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  console.log(data)
  res.send(JSON.stringify(data))
})

module.exports = router
