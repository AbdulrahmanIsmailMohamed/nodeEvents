const { check, validationResult } = require('express-validator')
module.exports = [
    check('name')
        .isLength({ min: 5 })
        .withMessage('Name should be more than 5 char'),
    check('email')
        .isEmail()
        .withMessage("Email Isn't valid"),

    check('password')
        .isLength({ min: 5 })
        .withMessage("Password isn't strong")
]
