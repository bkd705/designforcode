
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts', (table) => {
    table.uuid('id').primary()

    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')

    table.string('title').notNullable()
    table.text('description').notNullable()
    table.string('type').notNullable().defaultTo('code')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts')
}
