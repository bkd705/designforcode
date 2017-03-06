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
        assigned_to: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        title: {
          type: Sequelize.STRING,
          required: true
        },
        description: {
          type: Sequelize.STRING,
          required: true
        },
        type: {
          type: Sequelize.STRING,
          required: true,
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
