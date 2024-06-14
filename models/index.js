const User = require('./User');
const Budget = require('./Budget');
const Category = require('./Category');
const Transaction = require('./Transaction');

User.hasOne(Budget, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Budget.belongsTo(User, {
    foreignKey: 'user_id'
});

Budget.hasMany(Category, {
  foreignKey: 'budget_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(Budget, {
  foreignKey: 'budget_id'
});

Category.hasMany(Transaction, {
    foreignKey: 'category_id', 
    onDelete: 'CASCADE'
  });
  
  Transaction.belongsTo(Category, {
    foreignKey: 'category_id',
  });

module.exports = { User, Budget, Category, Transaction };