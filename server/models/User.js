export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    role: {
      type: DataTypes.STRING,
      required: true,
      values: ['user', 'admin', 'disabled']
    }
  }, {
    paranoid: true,
    underscored: true
  })
  
  User.sync()
  return User
}