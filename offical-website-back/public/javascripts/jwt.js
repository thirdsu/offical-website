const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class Jwt {
  constructor(data) {
    this.data = data
  }

  //生成token
  generateToken() {
    let data = this.data
    let created = Math.floor(Date.now()/1000);
    // let cert = fs.readFileSync(path.join(__dirname,'../pem/rsa_private_key.pem'));
    let token = jwt.sign({
      data,
      exp:created + 60*30,
    },'sudasdasd');
    return token;
  }

  //校验token
  verifyToken() {
    let token = this.data;
    // let cert = fs.readFileSync(path.join(__dirname,'../pem/rsa_public_key.pem'));
    let res;
    try {
      let result = jwt.verify(token,'sudasdasd') || {};
      let {exp=0} = result,current = Math.floor(Date.now()/1000);
      if(current<=exp) {
        res=result.data || {}
      }
    } catch(e){
      res = 'err'
    }
    return res;
  }
}

module.exports = Jwt;