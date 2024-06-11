const User = require('./User');
const Category = require('./Category');
const Transaction = require('./Transaction');

User.hasMany(Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Transaction, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.hasMany(Transaction, {
    foreignKey: 'category_name',
    sourceKey: 'category_name', 
    onDelete: 'CASCADE'
  });
  
  Transaction.belongsTo(Category, {
    foreignKey: 'category_name',
    targetKey: 'category_name' 
  });

module.exports = { User, Category, Transaction };