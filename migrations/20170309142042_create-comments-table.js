
exports.up = (knex, Promise) => {
  return knex.schema.createTable('comments', (table) => {
    table.uuid('id').primary()

    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')

    table.uuid('post_id')
    table.foreign('post_id').references('id').inTable('posts')

    table.text('body').notNullable()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('comments')
}
