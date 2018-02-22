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

var typevalue,bookname,author,intro,bookimg;

router.post('/', function(req, res, next){
  typevalue = req.body.bookinfo.typevalue;
  bookname = req.body.bookinfo.bookname;   
  author = req.body.bookinfo.author;
  intro = req.body.bookinfo.intro;
  bookimg = req.body.bookimg;
  //console.log(req.body.bookimg);
  //res.send('okokok')
  console.log("------------测试------------");
  console.log(req.body.bookimg);
  console.log(req.body.bookinfo.bookname);
  console.log(req.body.bookinfo.author);
  console.log(req.body.bookinfo.intro);
  console.log(req.body.bookinfo.typevalue);
  console.log("------------测试------------");
  var addbook = 'insert into bookinfo values(null,?,?,?,?,?,0,0)';
  var bookvalue = [bookname,author,bookimg,intro,typevalue];
  connection.query(addbook,bookvalue,function(err,suc){
    if(err){
	console.log('error!!!',err)
    }else{
        console.log('compelete');
    }
  });
  //connection.end();
  console.log('add book ok!!');
  //res.send('okokok!');
});
module.exports = router;
