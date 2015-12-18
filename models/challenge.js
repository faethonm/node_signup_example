'use strict';
module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define('Challenge', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Challenge.belongsToMany(models.User,{
          through: 'UserChallenges'
        })
      }
    }
  });
  return Challenge;
};
