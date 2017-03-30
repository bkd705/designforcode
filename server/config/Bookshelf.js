import dotenv from 'dotenv'
import indicative from 'indicative'

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

// Custom Bookshelf validation plugin
Bookshelf.Model.validate = async (rules, data, required, exclude = []) => {
  //console.log(Bookshelf.Model)
  const newRules = rules

  if (required) {
    for (let key of Object.keys(newRules)) {

      // Exclude making some fields required
      if (exclude.indexOf(key) === -1) {
        newRules[key] = 'required|' + newRules[key]
      }
    }
  }

  return await indicative.validateAll(data, newRules)
}

export default Bookshelf
