'use strict';
module.exports = function(sequelize, DataTypes) {
  var Basket = sequelize.define('Basket', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Basket;
};