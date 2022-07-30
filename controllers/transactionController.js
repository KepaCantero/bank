const setStatusRenderError = require("../lib/responseHelpers").setStatusRenderError;
const validDeposit = require("../lib/validations").validDeposit;
const validWithdrawal = require("../lib/validations").validWithdrawal;
const helpers = require("../lib/helpers");
const queries = require("../db/queries");
const default_account_number = 0;

async function GetBalance() {
    return await queries.getAccount(default_account_number).then((account) => {
        return account.balance;
    });
}

async function InsertTransaction(transaction) {
    return await queries.insertTransaction(transaction).then((row) => {
        return row;
    });
}

function validateDeposit(req, res, callback) {
    if (validDeposit(req.body)) {
        const deposit = {
            customer_id: default_account_number,
            amount: req.body.amount,
            type: "deposit",
            date: new Date(),
        };
        callback(deposit);
    } else {
        setStatusRenderError(res, 500, "Invalid deposit");
    }
}

function validateWithdrawal(req, res, callback) {
    if (validWithdrawal(req.body)) {
        const withdrawal = {
            customer_id: default_account_number,
            amount: req.body.amount,
            type: "withdrawal",
            date: new Date(),
        };
        callback(withdrawal);
    } else {
        setStatusRenderError(res, 500, "Invalid withdrawal");
    }
}

exports.getTransactions = async (req, res) => {
    const account = (async function() {
        return await queries.getAccount(default_account_number);
    })();
    account.then(account => {
        queries.getHistorical(default_account_number)
            .then(transactions => {
                transactions.forEach(function (item, index) {
                    var dateObj = new Date(item.date)
                    var month = dateObj.getUTCMonth() + 1
                    var day = dateObj.getUTCDate()
                    var year = dateObj.getUTCFullYear()
                    transactions[index].date = day + "/" + month + "/" + year
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
        const new_deposit = new helpers.Deposit(default_account_number, deposit.amount);

        const balance = (async function() {
            return await GetBalance();
        })();

        balance.then((balance) => {
            const new_balance = new_deposit.updateBalance(balance);
            const row_inserted = (async function() {
                return await InsertTransaction(new_deposit);
            })();
            row_inserted.then((result) => {
                queries
                    .updateBalance(default_account_number, new_balance)
                    .then((result) => {
                        
                        const historical_transaction = new helpers.Historical(new_deposit.customer_id, new_deposit.amount, new_deposit.date, new_deposit.type, new_balance);
                        console.log("historical_transaction", historical_transaction);
                        queries
                            .insertHistorical(historical_transaction)
                            .then(res.redirect("/transaction"));

                    })
            })
        })

    });
};

exports.createWithdrawal = async (req, res) => {
    validateWithdrawal(req, res, (withdrawal) => {
        const new_withdrawal = new helpers.Withdrawal(default_account_number, withdrawal.amount);
        const balance = (async function() {
            return await GetBalance();
        })();


        balance.then((balance) => {
            const new_balance = new_withdrawal.updateBalance(balance);
            const row_inserted = (async function() {
                return await InsertTransaction(new_withdrawal);
            })();
            row_inserted.then((result) => {
                queries
                    .updateBalance(default_account_number, new_balance)
            });
            const historical_transaction = new helpers.Historical(new_withdrawal.customer_id, new_withdrawal.amount, new_withdrawal.date, new_withdrawal.type, new_balance);
            queries
                .insertHistorical(historical_transaction)
                .then(res.redirect("/transaction"));
        });
    });
};