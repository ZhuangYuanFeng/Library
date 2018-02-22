var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'library'
});
connection.connect();
var name,img;
router.get('/', function(req, res, next){
  name = req.query.nickName;
  img = req.query.avatarUrl;
  openid = req.query.openid;
  res.write(name+'-----'+img+'------'+openid);
  
  //connection.connect();
  var adduser = 'insert ignore user values(\'' + openid + '\',?,?,null)';
  //console.log(adduser);
  var addinfo = [name,img];
  connection.query(adduser,addinfo,function(err,suc){
    if(err){
	console.log('error!!!',err)
    }else{
        console.log('compelete');
    }
  });
//  connection.end();
  console.log('next!');
});
module.exports = router;
