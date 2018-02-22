var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'library'
});

//var data;
connection.connect();
router.get('/',function(req,res){
	var data;
	var search = 'select * from bookinfo';
	connection.query(search,function(err,suc){
                if(err){
                        console.log('erro!');
                        return;
                }else{
			data = suc;
			res.json({data});
		}	
                //data = suc;
        });
//	res.json({data});
	//res.end();
})
//connection.end();
module.exports = router;
