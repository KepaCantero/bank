const validateDeposit = require("../lib/validations").validateDeposit;
const validateWithdrawal = require("../lib/validations").validateWithdrawal;
const setStatusRenderError = require("../lib/responseHelpers").setStatusRenderError;
const helpers = require("../lib/helpers");
const constants = require("../lib/constants");
const queries = require("../db/queries");


exports.getTransactions = async (req, res) => {
    const account = (async function() {
        return await queries.getAccount(constants.default_account_number);
    })();
    account.then(account => {
        queries.getHistorical(constants.default_account_number)
            .then(transactions => {
                transactions.forEach(function(item, index) {

                    transactions[index].date = helpers.formatDate(transactions[index].date);
                })
                res.render('all', {
                    data: {
                        transactions_: transactions,
                        account_: account
                    }
                });
            })
    });
};

exports.createDeposit = async (req, res) => {
    validateDeposit(req, res, (deposit) => {
        const new_deposit = new helpers.Deposit(constants.default_account_number, deposit.amount);

        const balance = (async function() {
            return await queries.getBalanceAsync();
        })();

        balance.then((balance) => {
            const new_balance = new_deposit.updateBalance(balance);
            const row_inserted = (async function() {
                return await queries.insertTransactionAsync(new_deposit);
            })();
            row_inserted.then((result) => {
                queries
                    .updateBalance(constants.default_account_number, new_balance)
                    .then((result) => {

                        const historical_transaction = new helpers.Historical(new_deposit.customer_id, new_deposit.amount, new_deposit.date, new_deposit.type, new_balance);
                        queries
                            .insertHistorical(historical_transaction)
                            .then(res.redirect("/"));

                    })
            })
        })

    });
};

exports.createWithdrawal = async (req, res) => {
    validateWithdrawal(req, res, (withdrawal) => {
        const new_withdrawal = new helpers.Withdrawal(constants.default_account_number, withdrawal.amount);
        const balance = (async function() {
            return await queries.getBalanceAsync();
        })();

        balance.then((balance) => {
            switch(new_withdrawal.ValidateWithdrawal(balance)) {
                case constants.enough_funds:
                    const new_balance = new_withdrawal.updateBalance(balance);
                    const row_inserted = (async function() {
                        return await queries.insertTransactionAsync(new_withdrawal);
                    })();
                    row_inserted.then((result) => {
                        queries
                            .updateBalance(constants.default_account_number, new_balance)
                    });
                    const historical_transaction = new helpers.Historical(new_withdrawal.customer_id, new_withdrawal.amount, new_withdrawal.date, new_withdrawal.type, new_balance);
                    queries
                        .insertHistorical(historical_transaction)
                        .then(res.redirect("/"));
                    break;
                case constants.insufficient_funds:
                    setStatusRenderError(res, 500, "Not enough funds");
                    break;
            }
        });
    });
};