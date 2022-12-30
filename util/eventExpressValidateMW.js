const { check, validationResult } = require('express-validator')
module.exports = [
    check('title')
        .isLength({ min: 5 })
        .withMessage('Title should be more than 5 char'),

    check('description')
        .isLength({ min: 5 })
        .withMessage('Description should be more than 5 char'),

    check('location')
        .isLength({ min: 3 })
        .withMessage('Location should be more than 5 char'),

    check('date')
        .isLength({ min: 5 })
        .withMessage('Date should valid Date')

]
