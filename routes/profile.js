// =====================================
// PROFILE SECTION =========================
// =====================================
module.exports = function(app) {

  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.json({
      // user : req.user // get the user out of session and pass to template
      email: req.user.email,
      password: req.user.password
    });
  });

};
// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
