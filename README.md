# BANK application

## Features
- THe user can deposit and withdrawal money
- The user can check the list of transactions. 

## Acceptance criteria
- The operations list transaction, create withdrawal and create deposite can be perform through the browser. 
- API will be provided for

## Installation
- Download the repo
- npm install
- Create the DB: createdb bank
- Migrate and seed the DB using knex:
    ```sh
    knex init
    knex migrate:latest
    knex seed:run```
- Run the application: 
     ```sh
    node ./bin/www```
## Tech

- [Express] - fast node.js network app framework
- [Handlebars] - Handlebars is a simple templating language
- [knex.js] -  it is a "batteries included" SQL query builder.
- [PostgreSQL] - database
- [node.js] - evented I/O for the backend
