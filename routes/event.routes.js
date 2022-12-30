const { check, validationResult } = require('express-validator')
const {
    getAllEvent,
    getSingleEvent,
    createNewEventGet,
    createNewEventPost
} = require('../controller/event.controller');
const router = require('express').Router();
const validate = require('../util/eventExpressValidateMW')


router.get('/', getAllEvent);

router.get('/getevent/:id', getSingleEvent);

router.route('/create').get(createNewEventGet).post(validate, createNewEventPost)

module.exports = router