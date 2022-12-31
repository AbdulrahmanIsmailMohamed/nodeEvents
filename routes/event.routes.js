const {
    getAllEvent,
    getSingleEvent,
    createNewEventGet,
    createNewEventPost,
    updateEventGET,
    updateEventPost
} = require('../controller/event.controller');
const router = require('express').Router();
const validate = require('../util/eventExpressValidateMW')

router.get('/', getAllEvent);

router.get('/getevent/:id', getSingleEvent);

router.route('/create').get(createNewEventGet).post(validate, createNewEventPost)

// update event
router.get("/update/:id",updateEventGET)
router.post("/update",validate,updateEventPost)

module.exports = router