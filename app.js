var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require("./models");

var debug = require('debug')('signup-app');
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');
var morgan   = require('morgan');
var session = require('express-session');

require('./config/passport')(passport); // pass passport for configuration

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/index')(app);
require('./routes/authentication')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/profile')(app); // load our routes and pass in our app and fully configured passport
require('./routes/challenge')(app); // load our routes and pass in our app and fully configured passport
require('./routes/user')(app); // load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  debugger
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

models.sequelize.sync().then(function () {
  var server = app.listen(process.env.PORT || 3000, function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

module.exports = app;
