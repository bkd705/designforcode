import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import users from '../models/User'
import profiles from '../models/Profile'
import posts from '../models/Post'

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
db.posts = posts(sequelize, Sequelize)

/**
 * Relations
 */
db.users.hasOne(db.profiles)
db.users.hasMany(db.posts)

db.profiles.belongsTo(db.users)
db.posts.belongsTo(db.users)

export default db
