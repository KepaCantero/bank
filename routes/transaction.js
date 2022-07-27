var express = require('express');
var router = express.Router();
const transactionController = require('../controllers/transactionController');


router.get('/deposit', (req, res) => {
    res.render('deposit');

});

router.get('/withdrawal', (req, res) => {
    res.render('withdrawal');

});

router.get('/', transactionController.getTransactions);
router.post('/withdrawal', transactionController.createWithdrawal);
router.post('/deposit', transactionController.createDeposit);
module.exports = router;