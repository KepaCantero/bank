/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex, Promise) {
  return knex('transaction').del()
    .then(function () {
      const transactions = [{
        customer_id: 0,
        amount: 100,
        type: 'deposit',
        date: new Date(),
      }];

      return knex('transaction').insert(transactions);
    });
};
