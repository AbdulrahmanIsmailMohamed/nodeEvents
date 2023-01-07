const express = require("express");
const router = express.Router();
const validate = require('../util/userExpressValidatorMW')
const upload = require("../middleware/uploadMulterMW");
const {
    loginView,
    login,
    signupView,
    signup,
    profile,
    logout,
    uploadAvatar
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../config/auth");

// login
router.route("/login").get(loginView).post(login);

// signup
router.route("/signup").get(signupView).post(validate, signup);

// profile
router.get("/profile", ensureAuthenticated, profile);

router.post("/uploadAvatar", upload.single("avatar"), uploadAvatar)

// logout
router.get("/logout", logout)

module.exports = router;