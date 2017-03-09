
exports.up = function(knex, Promise) {
  // Minimal example on creating a new DB table.
  return knex.schema
  .createTable('Meetups', table => {
    table.bigIncrements('id').primary();
    table.string('name').index().notNullable();
    table.string('description');
    table.timestamp('time').index();
    table.integer('duration');

    // Extra
    table.timestamp('created').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('Meetups')
};
