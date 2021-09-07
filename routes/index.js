const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// welcome sign in / register pages
router.get('/', (req, res) => {
    res.render("welcome");
});

// Search product page
router.get('/search', ensureAuthenticated, (req, res) => {
    res.render("searchproduct", {
        name: req.user.name
    });
});

module.exports = router;