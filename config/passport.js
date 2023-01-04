const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passReqToCallback: true
        }, (req,email, password, done) => {
            // Match user
            User.findOne({ email }).then((user) => {
                if (!user) return done(null, false, req.flash("error_msg", "That email is not registered"));
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done(null, user);
                    else return done(null, false, req.flash("error_msg", "Password incorrect"));
                });
            });
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });
}
