const setStatusRenderError = require("../lib/responseHelpers").setStatusRenderError;
const validDeposit = require("../lib/validations").validDeposit;
const validWithdrawal = require("../lib/validations").validWithdrawal;
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
        queries.getTransactions(default_account_number)
            .then(transactions => {
                res.render('all', {
                    data: { transactions_: transactions, account_: account
                }
        });
    })
});
};

exports.createDeposit = async (req, res) => {
    validateDeposit(req, res, (deposit) => {
        let balance = (async function () {
            return await GetBalance();
        })();
        balance.then((balance) => {
            let new_balance = parseFloat(balance) + parseFloat(deposit.amount);
            let row_inserted = (async function () {
                return await InsertTransaction(deposit);
            })();
            row_inserted.then((result) => {
                queries
                    .updateBalance(default_account_number, new_balance)
                    .then(res.redirect("/transaction"));
            })
        });
    });
};

exports.createWithdrawal = async (req, res) => {
    validateWithdrawal(req, res, (withdrawal) => {
        let balance = (async function () {
            return await GetBalance();
        })();
        balance.then((balance) => {
            if (balance > withdrawal.amount) {
                let new_balance =
                    parseFloat(balance) - parseFloat(withdrawal.amount);
                let row_inserted = (async function () {
                    return await InsertTransaction(withdrawal);
                })();
                row_inserted.then((result) => {
                    queries
                        .updateBalance(default_account_number, new_balance)
                        .then(res.redirect("/transaction"));
                });
            }
        });
    });
};
