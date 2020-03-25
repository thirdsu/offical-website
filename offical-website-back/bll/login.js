var db = require('../database/db');
var JwtUtil = require('../public/javascripts/jwt');
let loginBll = {}

loginBll.selectUser = function(req, res) {
  console.log(req.body);
  const {tel,password} = req.body

  if(tel&&password) {
    let sqlString = `select * from userInfo where tel=${tel} and password=${password}`;
    console.log(sqlString);
    let connection = db.connection();
    db.select(connection,sqlString,function(data){
        console.log(data);
        if(data&&data.length>0) {
         //生成token返回
         let _id = data[0].id.toString();
         let jwt = new JwtUtil(_id);
         let new_token = jwt.generateToken();

         res.send(JSON.stringify({
           code: "0",
           data:{
             new_token,
             userInfo:data[0]
           },
           message: "登录成功"
         }))
        } else {
          res.send(JSON.stringify({
            code: "1",
            message: "登录失败"
          }))
        }
    })
    db.close(connection);
  } else {
    res.send(JSON.stringify({
      code: "1",
      message: "登录失败"
    }))
  }
}

loginBll.registerUser = function(req, res) {
  console.log(req.body);
  const name = req.body.userName;
  const tel = req.body.tel;
  const password = req.body.password;
  if(name&&tel&&password) {
    let sqlString = `insert into userInfo(name,tel,password) values('${name}','${tel}','${password}')`;
    console.log(sqlString);
    let connection = db.connection();
    db.insert(connection,sqlString,function(data){
        console.log(data);
        res.send(JSON.stringify({
          code: "0",
          data:true,
          message: "注册成功"
        }))
    })
    db.close(connection);
  } else {
    res.send(JSON.stringify({
      code: "0",
      data:false,
      message: "注册失败"
    }))
  }
}

module.exports = loginBll