/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('historical_transaction', (table) => {
        table.increments();
        table.integer('customer_id').notNullable();
        table.integer('amount').notNullable();
        table.dateTime('date').notNullable();
        table.integer('balance').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('historical_transaction');
};
