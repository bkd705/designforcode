import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import users from '../models/User'
import profiles from '../models/Profile'

dotenv.config()

/**
 * Setup Sequelize connection to postgres using dotenv variables
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres'
})

/**
 * Setup DB object so everything is accesible from one spot
 */
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

/**
 * Models / Tables
 */
db.users = users(sequelize, Sequelize)
db.profiles = profiles(sequelize, Sequelize)

/**
 * Relations
 */
db.profiles.belongsTo(db.users)
db.users.hasOne(db.profiles)

export default db
