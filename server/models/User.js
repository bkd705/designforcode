export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      values: ['user', 'admin', 'disabled']
    }
  }, {
    paranoid: true,
    underscored: true
  })

  User.sync({ force: true })
  return User
}
