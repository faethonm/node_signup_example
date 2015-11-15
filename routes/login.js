var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  if(req.user){
    // already logged in
    res.redirect('/');
  } else {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
    res.render('login', { message: req.session.messages });
    // and then remember to clear the message
    req.session.messages = null;
  }
});

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
      if (err) {
        // if error happens
        return next(err);
      }

      if (!user) {
        // if authentication fail, get the error message that we set
        // from previous (info.message) step, assign it into to
        // req.session and redirect to the login page again to display
        req.session.messages = info.message;
        return res.redirect('/login');
      }

      // if everything's OK
      req.logIn(user, function(err) {
        if (err) {
          req.session.messages = "Error";
          return next(err);
        }

        // set the message
        req.session.messages = "Login successfully";
        return res.redirect('/');
      });
    })(req, res, next);
});

module.exports = router;
