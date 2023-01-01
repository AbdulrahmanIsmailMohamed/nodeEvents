const {
    getAllEvent,
    getSingleEvent,
    createNewEventGet,
    createNewEventPost,
    updateEventGET,
    updateEventPost,
    deleteEvent,
    searchEvent
} = require('../controllers/eventController');
const router = require('express').Router();
const validate = require('../util/eventExpressValidateMW')

router.get('/', getAllEvent);

router.get('/getevent/:id', getSingleEvent);

router.route('/create').get(createNewEventGet).post(validate, createNewEventPost)

// update event
router.get("/update/:id",updateEventGET)
router.post("/update",validate,updateEventPost)

router.get("/delete/:id",deleteEvent)

router.post("/search",searchEvent)

module.exports = router