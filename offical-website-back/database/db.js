let mysql=require('mysql');
let db = {}

//插入
db.insert = function(connection,sql,paras,callback) {
  connection.query(sql,paras,function(error,results,fields){
    if(error) {
      throw error;
    }
    callback(results.insertId)
  })
}

//查询
db.select = function(connection,sql,callback) {
  connection.query(sql,function(error,results,fields){
    if(error) {
      throw error;
    }
    callback(results)
  })
}

//修改
db.update = function(connection,sql,callback) {
  connection.query(sql,function(error,results,fields){
    if(error) {
      throw error;
    }
    callback(results)
  })
}

//删除
db.delete = function(connection,sql,callback) {
  connection.query(sql,function(error,results,fields){
    if(error) {
      throw error;
    }
    callback(results)
  })
}

// 关闭
db.close = function(connection) {
  connection.end(function(err){
    if(err) {
      return
    } else {
      console.log('关闭连接');
    }
  })
}

db.connection = function() {
  let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'official_website'
  });
  connection.connect(function(err){
    if(err) {
      console.log(err);
      return;
    }
  });
  return connection
}
module.exports = db