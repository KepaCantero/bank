const knex = require("./knex");

module.exports = {
    getAccount: (id) => {
        return knex("customer")
            .select()
            .where("customer_id", id)
            .first()
            .catch(function (error) {
                console.error(error);
            });
    },
    insertTransaction: (transaction) => {
        return knex("transaction")
            .insert(transaction, "*")
            .catch(function (error) {
                console.error(error);
            });
    },
    updateBalance: (customer_id, balance) => {
        return knex("customer")
            .where("customer_id", customer_id)
            .update({
                balance: balance,
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getTransactions: (id) => {
        return knex("transaction")
            .select()
            .where("customer_id", id)
            .catch(function (error) {
                console.error(error);
            });
    },
};
