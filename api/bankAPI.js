const express = require('express');
const router = express.Router();

const queries = require('../db/queries')
const validTodo = require('../lib/validations').validTodo;
const validId = require('../lib/validations').validId;
const default_account_number = 0;


router.get('/', (req, res)=>{
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
                res.json( {
                    transactions_: transactions,
                    account_: account
                });

            })
    });
})

router.post('/', (req, res)=>{
    if(validTodo(req.body)){
        const todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: new Date()
        }
        queries.create(todo)
        .then(ids=>{
            res.json({
                id: ids[0]
            });
        })
    }
    else{
        res.status(500);
        res.json({
            message: 'Invalid Todo'
        })
    }
});

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    if (validId(id)){
        const todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            date: new Date()
        }
        queries.update(id, todo)
        .then(ids=>{
            res.json({
                message: "updated"
            });
        })
    }
    else{
        res.status(500);
        res.json({
            message: 'Invalid Todo'
        })
    }
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    if (validId(id)){
        queries.delete(id)
        .then(ids=>{
            res.json({
                message: "deleted"
            });
        })
    }
    else{
        res.status(500);
        res.json({
            message: 'Invalid Todo'
        })
    }
});


module.exports = router;
