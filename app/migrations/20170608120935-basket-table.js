'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('Baskets',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        title: {
           type: Sequelize.STRING,
           allowNull: false
         }
      });

  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.dropTable('Baskets');

  }
};
