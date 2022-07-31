const knex = require("./knex");
const constants = require("../lib/constants");

async function getBalanceAsync() {
    return await getAccount(constants.default_account_number).then((account) => {
        return account.balance;
    });
}

async function insertTransactionAsync(transaction) {
    return await insertTransaction(transaction).then((row) => {
        return row;
    });
}

function getAccount(id) {
    return knex("customer")
        .select()
        .where("customer_id", id)
        .first()
        .catch(function(error) {
            console.error(error);
        });
}

function insertTransaction(transaction) {
    return knex("transaction")
        .insert(transaction, "*")
        .catch(function(error) {
            console.error(error);
        });
}

function updateBalance(customer_id, balance) {
    return knex("customer")
        .where("customer_id", customer_id)
        .update({
            balance: balance,
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getTransactions(id) {
    return knex("transaction")
        .select()
        .where("customer_id", id)
        .catch(function(error) {
            console.error(error);
        });
}

function getHistorical(id) {
    return knex("historical_transaction")
        .select()
        .where("customer_id", id)
        .catch(function(error) {
            console.error(error);
        });
}

function insertHistorical(historical) {
    return knex("historical_transaction")
        .insert(historical, "*")
        .catch(function(error) {
            console.error(error);
        });
}
module.exports = {
    getBalanceAsync,
    insertTransactionAsync,
    getAccount,
    updateBalance,
    getTransactions,
    getHistorical,
    insertHistorical
};