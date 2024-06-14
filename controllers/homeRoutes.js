const router = require("express").Router();
const { User, Category } = require("../models");

router.get("/", async (req, res) => {
    try {

        res.render("homepage", { homepage })
    } catch (error) { res.status(500).json(error) }
});

module.exports = router