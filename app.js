var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'/root/library/public/images')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname+Date.now()+'.png')
  }
})

var index = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');
//var connt = require('./routes/connectsql');
var sql = require('./routes/sql');
var sessionkey = require('./routes/sessionkey');
var borrow = require('./routes/borrow');
var logs = require('./routes/logs');
var rbook = require('./routes/rbook');
var bookinfo = require('./routes/bookinfo');
var addbook = require('./routes/addbook');
var passbook = require('./routes/passbook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));
app.use(multer({storage: storage}).array('image'));

app.use('/', index);
app.use('/users', users);
app.use('/data',data);
app.use('/sql',sql);
app.use('/sessionkey',sessionkey);
app.use('/borrow',borrow);
app.use('/logs',logs);
app.use('/rbook',rbook);
app.use('/bookinfo',bookinfo);
app.use('/addbook',addbook);
app.use('/passbook',passbook);


"Response from express"
app.use((request, response, next) => {
    response.write('Response from express/app.js');
    response.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//const post = 3003;
//app.listen(port);

module.exports = app;
