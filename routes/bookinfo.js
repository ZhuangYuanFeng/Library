var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');

//var upload = multer({dest:'/images/'}).array('file');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'library'
});


router.post('/',function(req,res){
  console.log('files:',req.files[0]);
  //res.send('img received');
  var des_file = __dirname + "/imgs/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].filename
              };
              var filename = req.files[0].filename;
              console.log( response );
              res.send(filename);
          }
          //console.log( response );
         // res.json( {response });
       });
   });

})




//var bookname,bookimg,bookauthor,bookintro,booktype;
//connection.connect();



//router.get('/', function(req, res, next){
 // connection.connect();
  //  bookname = req.query.bookname;
  //  bookauthor = req.query.bookauthor;
  //  bookimg = req.query.bookimg;
  //  bookintro = req.query.bookintro;
  //  booktype = req.query.booktype;
  //  res.write(bookname+'-----'+bookauthor+'-----'+bookimg+'-----'+bookintro+'-----'+booktype);
  //  console.log('next!');
  //  var addUser =' insert ignore into bookinfo values(null,?,?,?,?,?,0,1)';
  //  var addinfo = [bookname, bookauthor, bookimg, bookintro, booktype];
  //  connection.query(addUser,addinfo,function(err,suc){
  //     if(err){
  //          console.log('erro!');
  //          return;
  //     }else{
  //          console.log('ok!',suc);
  //    }
  //  });
  //  connection.end();
  //  res.end();
//); 
module.exports = router;




    
