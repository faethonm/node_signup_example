module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

}
