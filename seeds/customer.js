/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
      const customers = [{
        customer_id: 0,
        name: 'Kepa Cantero',
        address: 'Am GottersackerWeg',
        balance: 100,
      }];

      return knex('customer').insert(customers);
    });
};
