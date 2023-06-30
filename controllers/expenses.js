const Expense = require('../models/expense');

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => console.log(err));
};

exports.postAddExpense = (req, res, next) => {
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;

  Expense.create({
    price: price,
    description: description,
    category: category,
  })
    .then((result) => {
      console.log('Record Added');
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log('Record Deleted');
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postEditExpense = (req, res, next) => {
  const id = req.body.id;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;

  Expense.findByPk(id)
    .then((expense) => {
      expense.price = price;
      expense.description = description;
      expense.category = category;

      return expense.save();
    })
    .then((result) => {
      console.log('Record Updated');
      res.json(result);
    })
    .catch((err) => console.log(err));
};
