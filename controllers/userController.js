const User = require("../model/User");
const asyncFunction = require('../middleware/async')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const passport = require("passport");

const loginView = (req, res) => {
    res.render("user/login")
}
const login = (req, res, nxt) => {
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
const signup = asyncFunction(async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array())
    } if (password != confirm_password) {
        req.flash("invalid", "Passwords do not match")
        res.redirect('/user/signup')
    } else {
        const user = await User.findOne({ email: email });
        if (user) {
            console.log(user);
            req.flash("error", "email already exict")
            res.render('user/signup', {
                error: req.flash("error")
            });
        } else {
            const newUser = new User({
                name,
                email,
                password,
                avatar: "profile.png"
            });
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
    }
})

const profile = (req, res) => {
    res.render("user/profile");
}

const uploadAvatar = asyncFunction(async (req, res) => {
    let newFields = {
        avatar: req.file.filename
    }
    const update = await User.updateOne({ _id: req.user._id }, newFields);
    if (!update) return res.status(404).send("not found");
    res.redirect('/user/profile')
})

const logout = (req, res) => {
    req.logout((err) => { if (err) console.log(err) });
    req.flash('success_msg', 'You are logged out');
    res.redirect("/user/login")
}

module.exports = {
    loginView,
    login,
    profile,
    signup,
    signupView,
    logout,
    uploadAvatar
}