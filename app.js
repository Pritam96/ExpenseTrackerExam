const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const expenseRoutes = require('./routes/expense');

const sequelize = require('./utils/database');

// const Expense = require('./models/expense');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());

app.use(expenseRoutes);

const PORT = 4000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, console.log(`server is running on port no: ${PORT}`));
  })
  .catch((err) => console.log(err));

// app.listen(4000);
