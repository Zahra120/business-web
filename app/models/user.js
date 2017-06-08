var pg = require('pg'),
    Sequelize = require('sequelize') ;
module.exports = function(db, DataTypes){
  var Register = db.define('Register', {
    name: Sequelize.STRING,
    familyName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING

  });
  return Register;
};
