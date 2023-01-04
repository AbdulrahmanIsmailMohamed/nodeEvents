const User = require("../model/User");
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const passport = require("passport");

const loginView = (req, res) => {
    res.render("user/login")
}
const login = (req, res,nxt) => {
    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, nxt);
}

const signupView = (req, res) => {
    res.render("user/signup", {
        errors: req.flash('errors'),
    });
}
const signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array())
    } if (password != confirm_password) {
        req.flash("invalid", "Passwords do not match")
        res.redirect('/user/signup')
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                console.log(user);
                req.flash("error", "email already exict")
                res.render('user/signup', {
                    error: req.flash("error")
                });
            } else {
                const newUser = new User({ name: name, email: email, password: password });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(() => {
                            req.flash("success_msg", "you are now registered and can log in :)")
                            res.redirect("/user/login");
                        }).catch((err) => console.log(err));
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const profile = (req, res) => {
    res.render("user/profile");
}

const logout = (req, res) => {
    res.json("logout...")
}

module.exports = {
    loginView,
    login,
    profile,
    signup,
    signupView,
    logout
}