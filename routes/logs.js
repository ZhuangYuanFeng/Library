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

var openid;
router.get('/', function(req, res, next){  
  openid = req.query.openid;
  var data ;
  var search = 'select *from logs where openid=\''+openid+'\'';
  connection.query(search,function(err,suc){
    if(err){
	console.log('search logs error!!!',err);
    }else{
        console.log('search logds compelete');
	res.json({suc});
    }
  });
  //connection.end();
});
module.exports = router;
