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

router.post('/', async (req, res) => {
    // Assuming user_id is stored in session
    const user_id = req.session.user_id;
  
    // Check if user_id is available in the session
    if (!user_id) {
      return res.status(401).json({ message: 'User not logged in' });
    }
  
    // Extract budget information from the request body
    const { income } = req.body;
  
    // Validate input
    if (!income) {
      return res.status(400).json({ message: 'Income is required' });
    }
  
    try {
      // Create a new budget entry
      const newBudget = await Budget.create({
        income,
        user_id,
      });
  
      // Respond with the newly created budget
      res.status(201).json(newBudget);
    } catch (error) {
      console.error('Error creating budget:', error);
      res.status(500).json({ message: 'Internal server error' });
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