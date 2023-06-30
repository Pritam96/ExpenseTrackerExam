const express = require('express');

const expenseController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.postAddExpense);
router.post('/delete/:id', expenseController.postDeleteExpense);
router.post('/edit', expenseController.postEditExpense);

module.exports = router;
