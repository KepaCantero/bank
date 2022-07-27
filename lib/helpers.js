var Deposit = function (customer_id, amount) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.type = "deposit";
    this.date = new Date();
};

Deposit.prototype.updateBalance = function (balance) {
    return parseFloat(this.amount) + parseFloat(balance);
};

var Withdrawal = function (customer_id, amount) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.type = "withdrawal";
    this.date = new Date();
};

Withdrawal.prototype.updateBalance = function (balance) {
    if (balance >= this.amount) {
        return parseFloat(balance) - parseFloat(this.amount);
    }
    else
    {
        console.log("insufficient funds");
    }
};

module.exports = {Deposit, Withdrawal}