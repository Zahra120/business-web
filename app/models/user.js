var pg = require('pg'),
    Sequelize = require('sequelize') ;
module.exports = function(sequelize, DataTypes){
  var Register = sequelize.define('Register', {
    name: Sequelize.STRING,
    familyName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING

  });
  return Register;
};
