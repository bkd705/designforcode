'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('profiles', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        first_name: {
          type: Sequelize.STRING,
          required: true
        },
        last_name: {
          type: Sequelize.STRING,
          required: true
        },
        profession: {
          type: Sequelize.STRING,
          required: true,
          values: ['designer', 'developer', '']
        },
        skill_level: {
          type: Sequelize.STRING,
          required: true
        },
        description: {
          type: Sequelize.TEXT,
          required: true
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
    return queryInterface.dropTable('profiles')
  }
}
