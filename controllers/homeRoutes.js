const router = require('express').Router();
const { User, Budget, Category } = require('../models');
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

router.get('/dashboard', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Budget,
                    attributes: ['income'],
                },
            ],
        });

        //FILL IN LATER
    } catch (err) {
        res.status(500).json(err);
    }
});