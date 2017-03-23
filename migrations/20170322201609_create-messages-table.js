
exports.up = (knex, Promise) => {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary()

    table.uuid('sender_id')
    table.foreign('sender_id').references('id').inTable('users')

    table.uuid('receiver_id')
    table.foreign('receiver_id').references('id').inTable('users')

    table.text('message').notNullable()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('messages')
}
