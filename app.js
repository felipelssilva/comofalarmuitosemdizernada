var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var helmet = require('helmet');
//var cors = require('cors');
//const { getCSP, nonce, EVAL, INLINE, SELF } = require('csp-header');

var indexRouter = require('./routes/index');

var app = express();

//app.use(helmet());
//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*getCSP({
  directives: {
    'script-src': [
      SELF,
      INLINE,
      EVAL,
      nonce('sha256-aLakhAMq5ex9pgn5UereNLI/6sISym9/wMYz6JHrDAY='),
      'https://*.googletagmanager.com',
      'https://*.googlesyndication.com',
    ],
    'style-src': [
      SELF,
    ]
  }
});*/

/*app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://*.doubleclick.net http://*.doubleclick.net https://www.googletagservices.com http://www.googletagservices.com https://adservice.google.com http://adservice.google.com  https://adservice.google.com.br http://adservice.google.com.br   https://pagead2.googlesyndication.com http://pagead2.googlesyndication.com http://*.cloudflare.com https://*.cloudflare.com https://*.googletagmanager.com http://*.googletagmanager.com http://www.google-analytics.com https://www.google-analytics.com https://tpc.googlesyndication.com http://tpc.googlesyndication.com https://pagead2.googlesyndication.com http://pagead2.googlesyndication.com  https://googleads.g.doubleclick.net http://googleads.g.doubleclick.net 'sha256-pJEhyMwHnQgq/GwS0H+l4Ite/VKvauHb45gCsBWgPHA=' ; 
    connect-src 'self' http://pagead2.googlesyndication.com https://pagead2.googlesyndication.com http://www.google-analytics.com https://www.google-analytics.com; 
    font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com http://fonts.gstatic.com/; 
    img-src 'self' https://pagead2.googlesyndication.com http://pagead2.googlesyndication.com ; 
    style-src 'self' https://*.googleapis.com http://*.googleapis.com  http://*.cloudflare.com https://*.cloudflare.com ; 
    frame-src 'self' https://tpc.googlesyndication.com http://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://googleads.g.doubleclick.net;",
  );
  next();
});*/

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', url: req.url });
});

module.exports = app;
