import dotenv from 'dotenv'

dotenv.config()

const knex = require('knex')({
  client: process.env.DB_TYPE,
  connection: {
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : 'utf8'
  }
})

const Bookshelf = require('bookshelf')(knex);

// Plugins
Bookshelf.plugin(require('bookshelf-uuid'))
Bookshelf.plugin(require('bookshelf-cascade-delete'))
Bookshelf.plugin('registry')

export default Bookshelf
