var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'library',
  multipleStatements: true
});

//声明需要操作的全局变量
var bookid;
connection.connect();

router.get('/', function(req, res, next){

  bookid = req.query.bookid;

  console.log('==========this is global value===========');
  console.log(bookid)
  console.log('=========================================');

  let change = 'update bookinfo set bookat=1 where bookid='+bookid;

  connection.query(change,function(err,suc){
    if(err){
	console.log('the book change has an error',err);
    }else{
        console.log('the book has been change');
	res.send(suc);
    }
  });

  console.log(change);

})


module.exports = router;
