/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('transaction', (table) => {
      table.increments();
      table.integer('customer_id').notNullable();
      table.integer('amount').notNullable();
      table.text('type').notNullable();
      table.dateTime('date').notNullable();
  })

};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('transaction');
};