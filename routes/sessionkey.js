var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var iconv = require("iconv-lite");

var appid,secret,js_code,grant_type;
var sessionkey;

router.get('/', function(req, response, next) {
  //这里获取的是小程序传过来的值
  appid = req.query.appid;
  secret = req.query.secret;
  js_code = req.query.js_code;
  grant_type = req.query.grant_type;
  console.log('js_code:',js_code);

  //request url 
  var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+
	  '&secret='+secret+
	  '&js_code='+js_code+
	  '&grant_type='+grant_type;

  var req = https.request(url,(res) => {
//	console.log('statusCode:', res.statusCode);
//	console.log('headers:', res.headers);
	//组成可获取数据
	var datas = []; 
	var size = 0;
	res.on('data', (d) => {
		 datas.push(d);
//		 console.log(datas);
		 size += d.length;
   		 process.stdout.write(d);
 	});
	res.on('end',function(){
		var buff = Buffer.concat(datas, size);
		var result = iconv.decode(buff, "utf8");
		console.log('sessionkey:',result);
		sessionkey = result;
		response.send(result);
//		console.log('sessionkey2:',sessionkey);
	});
  });
  //console.log('sessionkey2:',sessionkey);
  req.on('error',(e) => {
	console.error(e);
  });

  //res.send(sessionkey);

  req.end();
  //res.send(sessionkey);
//  });
});
// https.get(url, function (res) {  
  //      var datas = [];  
    //    var size = 0;  
      //  res.on('data', function (data) {  
        //    datas.push(data);  
          //  size += data.length;  
       // process.stdout.write(data);  
        // });  
         //res.on("end", function () {  
         //	var buff = Buffer.concat(datas, size);  
           //     var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
             //   console.log('sessionkey:',result);  
        // });
	//res.end();  
	//}).on("error", function (err) {  
        // Logger.error(err.stack)  
        // callback.apply(null);  
//});  
//});
module.exports = router;
