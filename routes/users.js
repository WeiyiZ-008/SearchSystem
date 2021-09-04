const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// add User model
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => {
    res.render("login");
});


// Register page
router.get('/register', (req, res) => {
    res.render("register");
});

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2} = req.body;
    let errors = [];

    // validation the form
    // empty field check
    if (!name || !email || !password || !password2) {
        errors.push({msg : 'Please fill in all fileds'});
    }

    // password match
    if (password != password2) {
        errors.push({msg : 'Your Password is not match'});
    }

    // check password length
    if (password.length < 6) {
        errors.push({msg : 'Password should be at least 6 characters'});
    }


    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {      
        // check if user exits
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    // user exits
                    console.log("***** DEBUG: User already exits -- line 57");
                    errors.push({msg: 'Email is already registered'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // encrypt the password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt,
                         (err, hash) => {
                             if (err) throw err;
                            
                             // update the encrypted password and save user
                             newUser.password = hash;
                             newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                         }) )

                }
            })
            .catch();
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Loguot Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Scuccessfuly logged out');
    res.redirect('/users/login');
});

module.exports = router;