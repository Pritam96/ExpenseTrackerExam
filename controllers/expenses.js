const Expense = require('../models/expense');

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => console.log(err));
};

exports.postAddExpense = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;

  Expense.create({
    name: name,
    price: price,
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
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;

  Expense.findByPk(id)
    .then((expense) => {
      expense.name = name;
      expense.price = price;
      expense.category = category;

      return expense.save();
    })
    .then((result) => {
      console.log('Record Updated');
      res.json(result);
    })
    .catch((err) => console.log(err));
};
