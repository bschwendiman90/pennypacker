const router = require('express').Router();
const { User } = require('../../models');

// * Feel free to change anything, but this should be done.


router.post('/', async (req, res) => {
    try {
        // Destructure username and password from req.body
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Create a new user using Sequelize's User model
        const userData = await User.create({ username, password });

        // Set up session variables if needed
        req.session.user_id = userData.id; // Assuming userData has an id field
        req.session.logged_in = true;

        // Respond with the created user data and 201 Created status
        res.status(201).json(userData);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes

        // Respond with 400 Bad Request and the error message
        res.status(400).json({ message: 'Failed to create user', error: err.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res 
             .status(400)
             .json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res 
             .status(400)
             .json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;