// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: 'postgres://localhost/bank'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      filename: process.env.DATABASE_URL + '?ssl=true'
    }
  } 
 

};
