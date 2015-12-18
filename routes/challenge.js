var models  = require('../models');

module.exports = function(app) {

  // app.post('/create', function(req, res) {
  //   models.User.create({
  //     username: req.body.username
  //   }).then(function() {
  //     res.redirect('/');
  //   });
  // });

  app.get('/challenges', function(req, res) {
    models.User.destroy({
      where: {
        id: 1
      }
    }).then(function() {
      res.json('user deleted');
    });
  });

  app.post('/1/challenge/create', function (req, res) {
    debugger
    var user = models.User.find({where: {id: 1}})
    user.addChallenge(challenge, {
      title: 'New Challenge',
    }).then(function(challenge) {
      res.json({user: 1,title: 'New Challenge', message: 'User created'});
    });
  });

  // app.get('/:user_id/challenge/:challenge_id/destroy', function (req, res) {
  //   models.Task.destroy({
  //     where: {
  //       id: req.params.task_id
  //     }
  //   }).then(function() {
  //     res.redirect('/');
  //   });
  // });
};
