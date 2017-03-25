
exports.up = (knex, Promise) => {
  return knex.schema.createTable('profiles', (table) => {
    table.uuid('id').primary()

    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')

    table.string('first_name').nullable()
    table.string('last_name').nullable()
    table.string('profession').nullable()
    table.string('skill_level').nullable()
    table.string('dribbble_url').nullable()
    table.string('github_url').nullable()
    table.string('linkedin_url').nullable()
    table.string('portfolio_url').nullable()
    table.text('description').nullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('profiles')
}
