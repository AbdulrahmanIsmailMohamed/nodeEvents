const { check, validationResult } = require('express-validator')
module.exports = [
    check('title')
        .isLength({ min: 2 })
        .withMessage('Title should be more than 2 char'),

    check('description')
        .isLength({ min: 5 })
        .withMessage('Description should be more than 5 char'),

    check('location')
        .isLength({ min: 2 })
        .withMessage('Location should be more than 2 char'),

    check('date')
        .isLength({ min: 5 })
        .withMessage('Date should valid Date')

]
