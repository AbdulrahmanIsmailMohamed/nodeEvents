// const eventExpressValidate = require('../middleware/eventExpressValidateMW')
const {
    getAllEvent,
    getSingleEvent,
    createNewEventGet,
    createNewEventPost
} = require('../controller/event.controller');
const router = require('express').Router();
const validate = require('../middleware/eventValidateMW')


router.get('/', getAllEvent);

router.get('/getevent/:id', getSingleEvent);

router.route('/create').get(createNewEventGet).post(validate, createNewEventPost)

module.exports = router