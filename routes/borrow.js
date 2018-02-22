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
var bookid,openid,handing,bookname;
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

router.get('/', function(req, res, next){
 // connection.connect();

  bookid = req.query.bookid;
  openid = req.query.openid;
  bookname = req.query.bookname;
  handing = req.query.handing;
  
  console.log('==========this is global value===========');
  console.log(bookid)
  console.log(openid);
  console.log(handing);
  console.log(bookname);
  console.log('=========================================');
  handing = 1;
  console.log('now handing : ',handing);

  let borrow = 'insert into logs values(null,?,?,?,now(),null)';
  let change = 'update bookinfo set handing=1 where bookid='+bookid;
 // let all = 'insert into logs values(null,?,?,now(),null)'+'update bookinfo set handing=1 where bookid='+bookid;
  console.log(borrow);
  console.log(change);

  let control = [borrow,change];
  let addinfo = [openid,bookid,bookname];

  Promise.all([
    query(borrow, addinfo),
    query(change)
  ]).then(() => {
   console.log('666');
    res.send('handing:'+handing);
  }).catch(function(err){
    console.log(err)
  });
  //connection.query(borrow,addinfo,function(err,suc){
    //console.log('cd boorow process')
    //if(err){
      //console.log('boroow erro');
    //}else{
      //console.log('borrow suc');
    //}   
  //});

  //console.log('first complete');  

  //connection.query(change,function(err,suc){
  //  console.log('cd change process')
  //  if(err){
  //    console.log('change erro');
  //  }else{ 
  //    console.log('change suc');
  //  }
  //});

  //console.log('second complete');

  //handing = 1;
  //console.log('handing = ',handing)
  //res.send('handing:'+handing);

});


module.exports = router;
