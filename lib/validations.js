const setStatusRenderError = require("../lib/responseHelpers").setStatusRenderError;
const helpers = require("../lib/helpers");
const constants = require("../lib/constants");

function validDeposit(deposit) {
    return typeof deposit.amount != 'undefined' &&
        !isNaN(Number(deposit.amount));
}

function validWithdrawal(deposit) {
    return typeof deposit.amount != 'undefined' &&
        !isNaN(Number(deposit.amount)) && deposit.amount < 10000;
}

function validateDeposit(req, res, callback) {
    if (validDeposit(req.body)) {
        const deposit = {
            customer_id: constants.default_account_number,
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
            customer_id: constants.default_account_number,
            amount: req.body.amount,
            type: "withdrawal",
            date: new Date(),
        };
        callback(withdrawal);
    } else {
        setStatusRenderError(res, 500, "Invalid withdrawal");
    }
}

module.exports = {
    validateDeposit,
    validateWithdrawal
};