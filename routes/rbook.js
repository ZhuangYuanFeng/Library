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
var bookid,openid;
connection.connect();
function query(...args) {
  return new Promise((resolve, reject) => {
    args.push(function(err, suc) {
        if(err){
          reject(err);
        }else{
          resolve(suc);
        }
      });
    connection.query.apply(connection, args);
  });
}
console.log('1234')
router.get('/', function(req, res, next){
 // connection.connect();

  bookid = req.query.bookid;
  openid = req.query.openid;
 
  console.log('==========this is global value===========');
  console.log(bookid)
  console.log(openid)
  console.log('=========================================');
  handing = 0;
  console.log('now return handing : ',handing);

  let rbook = 'update logs set rtime=now() where openid=\''+openid+'\' and bookid='+bookid;
  let change = 'update bookinfo set handing=0 where bookid='+bookid;
  console.log(rbook);
  console.log(change);

  Promise.all([
    query(rbook),
    query(change)
  ]).then(() => {
   console.log('999');
    res.send('handing:'+handing);
  }).catch(function(err){
    console.log(err)
  });
});


module.exports = router;
