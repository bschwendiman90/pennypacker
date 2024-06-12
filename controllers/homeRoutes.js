const router = require('express').Router();

// Define routes for the home page
router.get('/', (req, res) => {
  // Handle home page request
  res.render('home', { pageTitle: 'Home' });
});

// Add more routes as needed...

module.exports = router;