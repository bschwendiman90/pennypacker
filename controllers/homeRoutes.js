const router = require('express').Router();
const { User, Budget, Category, Transaction } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/signup', (req, res) => {
    res.render('signup');
    
  });

  router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch user data with associated budget and its categories and transactions
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: {
                model: Budget,
                include: {
                    model: Category,
                    include: {
                        model: Transaction // Include transactions within each category
                    }
                }
            }
        });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userData.toJSON(); // Convert to plain JSON object

        // Extract the budget from the user object
        const { budget } = user;

        if (budget) {
            let totalAssigned = 0;

            budget.categories.forEach((category) => {
                let totalTransactions = 0;

                category.transactions.forEach((transaction) => {
                    totalTransactions += transaction.amount;
                });

                category.totalTransactions = totalTransactions;
                totalAssigned += category.assigned;
                category.available = category.assigned - totalTransactions;
            });

            budget.remainingBudget = budget.income - totalAssigned;
        }

        // Render dashboard.handlebars with user data
        res.render('dashboard', {
            user, // Pass the entire user object
            budget, // Pass the budget object
            logged_in: true
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/category/:id', withAuth, async (req, res) => {
    try {
        // Fetch category data with associated transactions
        const categoryData = await Category.findByPk(req.params.id, {
            include: {
                model: Transaction
            }
        });

        if (!categoryData) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const category = categoryData.toJSON(); // Convert to plain JSON object

        // Calculate total transaction amount
        let totalTransactionAmount = 0;
        category.transactions.forEach((transaction) => {
            totalTransactionAmount += transaction.amount;
        });

        // Calculate available amount
        category.availableAmount = category.assigned - totalTransactionAmount;

        // Render category.handlebars with category data
        res.render('category', {
            category,
            logged_in: true
        });
    } catch (err) {
        console.error('Error fetching category data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ! There's no login route since the form is ingrained on the homepage
// ! Please let me know if that needs to be changed

module.exports = router