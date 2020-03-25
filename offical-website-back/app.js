// 启动文件，或者说入口文件
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var JwtUtil = require('./public/javascripts/jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

// 设置 views 文件夹为存放view文件的目录, 即存放模板文件的地方,dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎
app.set('view engine', 'jade');

app.use(logger('dev'));
// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: true }));
// 设置跨域请求
app.all('*',function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  // 设置 header 类型和token
  res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
  // 跨域允许的请求方式
  res.header('Content-Type', 'application/json');
  next();
})

// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
  // 写文章页面必须得先登录
  if(req.url === '/article/writeArticle') {
    let token = req.headers.token;
    console.log('校验token是否过期:'+token);
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    if (result == 'err') {
      console.log(result);
      res.send({code: '1', message: '登录已过期,请重新登录'});
      // res.render('login.html');
    } else {
        next();
    } 
  } else {
    next();
  }
})

// 路由控制器
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles',articlesRouter);

// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
