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



/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond tttwith a resource');
  openid = req.query.openid;
  var data ;
  var search = 'select attendant from user where openid=\''+openid+'\'';
  connection.query(search,function(err,suc){
    if(err){
        console.log('search logs error!!!',err);
    }else{
        console.log('search logds compelete');
	console.log(suc);
        res.send(suc);
    }


  });
})
module.exports = router;
