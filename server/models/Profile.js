export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      required: true
    },
    last_name: {
      type: DataTypes.STRING,
      required: true
    },
    profession: {
      type: DataTypes.STRING,
      required: true,
      values: ['designer', 'developer']
    },
    skill_level: {
      type: DataTypes.STRING,
      required: true
    },
    description: {
      type: DataTypes.TEXT,
      required: true
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

  Profile.sync()
  return Profile
}