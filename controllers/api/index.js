const router = require('express').Router();
const userRoutes = require('./userRoutes');
const budgetRoutes = require('./budgetRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes);
router.use('/category', categoryRoutes);


module.exports = router;
