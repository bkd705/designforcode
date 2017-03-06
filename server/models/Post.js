export default (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    assigned_to: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    description: {
      type: DataTypes.TEXT,
      required: true
    },
    type: {
      type: DataTypes.STRING,
      required: true,
      values: ['code', 'design']
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    paranoid: true,
    underscored: true
  })

  return Post
}
