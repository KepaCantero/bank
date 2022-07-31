const constants = require("../lib/constants");
var Deposit = function(customer_id, amount) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.type = "deposit";
    this.date = new Date();
};

Deposit.prototype.updateBalance = function(balance) {
    return parseFloat(this.amount) + parseFloat(balance);
};

var Withdrawal = function(customer_id, amount) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.type = "withdrawal";
    this.date = new Date();
};

Withdrawal.prototype.ValidateWithdrawal = function(balance) {
    if (balance >= this.amount) {
        return constants.enough_funds;
    } else {
        return constants.insufficient_funds;     
    }
};
Withdrawal.prototype.updateBalance = function(balance) {
    return  parseFloat(balance) - parseFloat(this.amount);
};

var Historical = function(customer_id, amount, date, type, balance) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.date = date;
    this.balance = balance;
    if (type == "withdrawal") {
        this.amount = parseInt(this.amount) * -1;
    }
};

module.exports = {
    Deposit,
    Withdrawal,
    Historical,
}