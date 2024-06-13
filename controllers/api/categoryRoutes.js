const router = require('express').Router();
const { Category, Transaction } = require('../../models');

router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
          return res.status(404).json({ error: 'Category not found' });
      }

      // Assuming transactions are associated with categories in your data model
      const transactions = await Transaction.findAll({
          where: { category_id: categoryId }
      });

      // Render category.handlebars with category and transactions data
      res.render('category', { category, transactions });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/transactions', async (req, res) => {
    const { category_id } = req.params.id;
    const { description, amount } = req.body;
  
    // Validate input
    if (!description || amount === undefined) {
      return res.status(400).json({ message: 'Description and amount are required' });
    }
  
    try {
      // Find the category by ID to ensure it exists
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Create a new transaction entry
      const newTransaction = await Transaction.create({
        category_id,
        description,
        amount,
      });
  
      // Respond with the newly created transaction
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;