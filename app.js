// Requirements
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var engine = require('ejs-mate');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Initializations
var app = express();
require('./database');
require('./passport/local-auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',engine)
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'mysecretsesion',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.signupMessage = req.flash('signupMessage');
  res.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});

// Charge routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', {msg:err.status});
});

module.exports = app;
