'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'user',
          values: ['user', 'admin', 'disabled']
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: Sequelize.DATE,
        deleted_at: Sequelize.DATE
      })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
