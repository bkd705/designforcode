import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import users from '../models/User'
import profiles from '../models/Profile'
import posts from '../models/Post'
import comments from '../models/Comment'

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
db.comments = comments(sequelize, Sequelize)

/**
 * Relations
 */

// User
db.users.hasOne(db.profiles, { as: 'Profile' })
db.users.hasMany(db.posts, { as: 'Posts', foreignKey: 'creator_id' })
db.users.hasMany(db.comments, { as: 'Comments' })

// Profile
db.profiles.belongsTo(db.users, { as: 'User' })

// Comment
db.comments.belongsTo(db.users, { as: 'Commenter', foreignKey: 'user_id' })
db.comments.belongsTo(db.posts, { as: 'Post' })

// Post
db.posts.belongsTo(db.users, { as: 'Creator' })
db.posts.hasMany(db.comments, { as: 'Comments' })

export default db
