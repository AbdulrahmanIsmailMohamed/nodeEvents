const express = require("express");
const router = express.Router();
const {
    loginView,
    login,
    signupView,
    signup,
    profile,
    logout
} = require("../controllers/userController");

// login
router.route("/login").get(loginView).post(login);

// signup
router.route("/signup").get(signupView).post(signup);

// profile
router.get("/profile",profile);

// logout
router.get("/logout",logout)

module.exports = router;