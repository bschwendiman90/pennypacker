const router = require('express').Router();
const { Budget, Category } = require('../../models');


router.get('/:id', async (req, res) => {
    try {
      const budget = await Budget.findByPk(req.params.id);
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json(budget);
    } catch (error) {
      console.error('Error fetching budget:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/', async (req, res) => {
    try {
        const userId = req.session.user_id; // Using session to get user ID
        if (!userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        await Budget.destroy({ where: { user_id: userId } });
        res.status(200).send({ message: 'Budget deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete budget', error: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { income } = req.body;
        const userId = req.session.user_id; // Using session to get user ID
        if (!userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const newBudget = await Budget.create({ income, user_id: userId });
        res.status(201).send({ message: 'Budget created successfully', budget: newBudget });
    } catch (error) {
        res.status(500).send({ message: 'Failed to create budget', error: error });
    }
});

  router.get('/:id/categories', async (req, res) => {
    try {
      const categories = await Category.findAll({
        where: {
          budget_id: req.params.budget_id
        }
      });
      res.status(200).json({ categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/:id/category', async (req, res) => {
    // Extract budget_id from request parameters
    const { budget_id } = req.params.id;
  
    // Extract category information from the request body
    const { category_name, assigned } = req.body;
  
    // Validate input
    if (!category_name || assigned === undefined) {
      return res.status(400).json({ message: 'Category name and assigned amount are required' });
    }
  
    try {
      // Create a new category entry
      const newCategory = await Category.create({
        category_name,
        assigned,
        budget_id,
      });
  
      // Respond with the newly created category
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;