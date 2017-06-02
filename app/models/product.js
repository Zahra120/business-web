var pg = require('pg'),
    Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
  var Product = sequelize.define('Product', {
    title: Sequelize.STRING,
    price: Sequelize.STRING,
    description: Sequelize.TEXT
  });
  return Product;
};
