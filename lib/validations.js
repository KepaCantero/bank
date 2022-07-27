
function validDeposit(deposit) {
    return  typeof deposit.amount != 'undefined' &&
            !isNaN(Number(deposit.amount));
  }
  
function validWithdrawal(deposit) {
    return  typeof deposit.amount != 'undefined' &&
            !isNaN(Number(deposit.amount)) && deposit.amount < 10000;
}

  module.exports = {
    validDeposit,
    validWithdrawal
  };