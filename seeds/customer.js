/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
      const customers = [{
        customer_id: 0,
        name: 'John Doe',
        address: 'Bilbao',
        balance: 0,
      }];

      return knex('customer').insert(customers);
    });
};
