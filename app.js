var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

<<<<<<< HEAD
// var routes = require('./routes/index');
// var login = require('./routes/login');
// var vedio = require('./routes/vedio');
=======
var routes = require('./routes/index');
var user = require('./routes/user');
var vedio = require('./routes/vedio');
>>>>>>> a7b4d657f042d1b8074e8f735557e57533bd4362

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

<<<<<<< HEAD
require('./config/routes')(app)
// app.use('/', routes);
// app.use('/login', login);
// app.use('/vedio', vedio);
=======
app.use('/', routes);
app.use('/user', user);
app.use('/vedio', vedio);
app.post('/user/loginHandle', function (req, res, next) {

  console.log(req.body.username)
});
>>>>>>> a7b4d657f042d1b8074e8f735557e57533bd4362

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
