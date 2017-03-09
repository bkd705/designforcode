'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('posts', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        creator_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          values: ['code', 'design']
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
    return queryInterface.dropTable('posts')
  }
}
