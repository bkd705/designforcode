'use strict'
import dotenv from 'dotenv'

import User from '../models/User'
import Profile from '../models/Profile'
import Post from '../models/Post'
import Comment from '../models/Comment'

dotenv.config()

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : 'utf8'
  }
})

const bookshelf = require('bookshelf')(knex);

// Plugins
bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin('registry')

export default {
  User: User(bookshelf),
  Profile: Profile(bookshelf),
  Post: Post(bookshelf),
  Comment: Comment(bookshelf)
}
