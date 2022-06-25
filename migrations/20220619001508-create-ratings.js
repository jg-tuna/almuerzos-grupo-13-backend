'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // And here's where the trick takes place:
    await queryInterface.addColumn(
      'Ratings', // name of Source model
      'UserId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
    // And here's where the trick takes place:
    await queryInterface.addColumn(
      'Ratings', // name of Source model
      'RestaurantId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'Ratings', // name of Source model
      'RestaurantId' // key we want to remove
    );
    await queryInterface.removeColumn(
      'Ratings', // name of Source model
      'UserId' // key we want to remove
    );
    await queryInterface.dropTable('Ratings');
  }
};