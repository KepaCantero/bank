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


var Historical = function (customer_id, amount, date, type, balance) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.date = date;
    this.balance = balance;
    if (type == "withdrawal") {
        this.amount = parseInt(this.amount) * -1; 
    }
    /*var dateObj = new Date(this.date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    this.date = day + "/" + month + "/" + year;
    */
};


module.exports = {Deposit, Withdrawal, Historical}