var db = require('../database/db')
let articleBll = {}

articleBll.selectArticle = function(req, res) {
  // 区分带没带token，带了为查询该用户定制内容，否则为随机内容
  let sqlString = 'select * from articleTable';
  console.log(sqlString);
  let connection = db.connection();
  db.select(connection,sqlString,function(data){
      console.log(data);
      res.send(JSON.stringify({
        code: "0",
        data:data,
        message: "成功"
      }))
  })
  db.close(connection);
}

module.exports = articleBll