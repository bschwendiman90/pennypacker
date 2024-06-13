const sequelize = require('../config/connection');
const { User, Budget, Category, Transaction } = require('../models');

const userData = require('./userData.json');
const budgetData = require('./budgetData.json');
const categoryData = require('./categoryData.json');
const transactionData = require('./transactionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const budget = await Budget.bulkCreate(budgetData, {
    individualHooks: true,
    returning: true,
  });

  const category = await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  const transaction = await Transaction.bulkCreate(transactionData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();
