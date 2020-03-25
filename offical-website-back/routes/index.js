var express = require('express');
var router = express.Router();
var articleBll = require('../bll/article');
var loginBll = require('../bll/login');

//获取首页数据
router.get('/', function(req, res) {
  articleBll.selectArticle(req, res);
});

// 登录
router.post('/login',function(req,res) {
  loginBll.selectUser(req,res);
});

//注册
router.post('/register',function(req,res) {
  loginBll.registerUser(req,res);
})

module.exports = router;
