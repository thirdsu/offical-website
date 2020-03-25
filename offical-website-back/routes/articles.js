var express = require('express');
var router = express.Router();
var articleBll = require('../bll/article');

/* GET users listing. */
router.get('/getArticle', function(req, res, next) {
  articleBll.selectArticle(req, res);
});

module.exports = router;