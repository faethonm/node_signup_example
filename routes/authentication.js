module.exports = function(app, passport) {
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // // process the login form
  // app.post('/login', passport.authenticate('local-login', {
  //   successRedirect: '/login-sucess', // redirect to the secure profile section
  //   failureRedirect: '/login-fail', // redirect back to the signup page if there is an error
  //   failureFlash: true // allow flash messages
  // }));

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      // Redirect if it fails
      if (!user) { return res.json({
        success: false,
        message: req.flash('loginMessage') }
      )}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        // Redirect if it succeeds
        return res.json({
          success: true,
          message: 'Login Successful!'
        })
      });
    })(req, res, next);
  });


  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      // Redirect if it fails
      if (!user) { return res.json({
        success: false,
        message: req.flash('signupMessage') }
      )}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        // Redirect if it succeeds
        return res.json({
          success: true,
          message: 'User succesfully registered'
        })
      });
    })(req, res, next);
  });
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
