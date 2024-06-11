const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      references: {
        model: 'category',
        key: 'category_name',
      },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    budget_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'budget',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction',
  }
);

module.exports = Transaction;