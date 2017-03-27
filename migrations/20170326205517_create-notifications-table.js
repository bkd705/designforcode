
exports.up = (knex, Promise) => {
  return knex.schema.createTable('notifications', (table) => {
    table.uuid('id').primary()

    table.uuid('to_user')
    table.foreign('to_user').references('id').inTable('users')

    table.uuid('from_user')
    table.foreign('from_user').references('id').inTable('users')

    table.string('text').notNullable()
    table.boolean('read').defaultTo(false)
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notifications')
}
