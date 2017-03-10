
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password', 60).notNullable()
    table.string('role').defaultTo('user')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
