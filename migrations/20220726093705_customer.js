/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('customer', (table) => {
      table.increments();
      table.integer('customer_id').notNullable();
      table.text('name').notNullable();
      table.text('address').notNullable();
      table.integer('balance').notNullable();
  })

};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('customer');
};