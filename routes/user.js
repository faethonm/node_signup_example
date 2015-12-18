var models  = require('../models');

module.exports = function(app) {

  app.get('/users', function(req, res) {
    models.User.find({where: {email: 'faethon'}}).success(function(user) {
      return res.json({
        id: user.id,
        email: user.email
      })
    });
  });


  app.get('/users/destroy', function (req, res) {
    models.User.destroy({
      where: {
        id: parseInt(req.param('id'))
      }
    }).then(function() {
      debugger
      return res.json({
        user: req.param('id'),
        message: 'User deleted'
      });
    });
  });
};
