var express = require('express');
var router = express.Router();
const accountController = require('../controllers/accountController');


router.get('/', (req, res) => {
    let account =
        (async function() {
            return await GetAccount();
        })()
        account.then(account => {
        knex('transaction')
            .select()
            .then(transactions => {
                res.render('all', {
                    data: {
                        transactions_: transactions,
                        account_: account
                    }
                });
            })
    });
});

router.get('/deposit', (req, res) => {
    res.render('deposit');

});

router.get('/withdrawal', (req, res) => {
    res.render('withdrawal');

});

async function GetAccount() {
  return await
  knex('customer')
      .select()
      .where('customer_id', 0)
      .then(account => {
          return account[0];
      })
}

router.post('/withdrawal', accountController.withdrawal_create_post);
router.post('/deposit', accountController.deposit_create_post);
module.exports = router;