var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var indexRouter = require('./routes/index');

var app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' http://*.cloudflare.com https://*.cloudflare.com https://*.googletagmanager.com http://*.googletagmanager.com http://www.google-analytics.com https://www.google-analytics.com 'sha256-pJEhyMwHnQgq/GwS0H+l4Ite/VKvauHb45gCsBWgPHA='; connect-src 'self' http://www.google-analytics.com https://www.google-analytics.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com http://fonts.gstatic.com/; img-src 'self'; style-src 'self' https://fonts.googleapis.com http://fonts.googleapis.com  http://*.cloudflare.com https://*.cloudflare.com ; frame-src 'self';",
  );
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', url: req.url });
});

module.exports = app;
