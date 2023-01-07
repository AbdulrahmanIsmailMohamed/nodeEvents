const {
    getAllEvent,
    getSingleEvent,
    createNewEvent,
    updateEvent,
    deleteEvent,
    // searchEvent,
    createNewEventView,
    updateEventView
} = require('../controllers/eventController');
const router = require('express').Router();
const validate = require('../util/eventExpressValidateMW')
const { ensureAuthenticated } = require("../config/auth");

router.get('/allevents/:pageNo?', ensureAuthenticated, getAllEvent);

router.get('/getevent/:id', ensureAuthenticated, getSingleEvent);

router.route('/create').get(ensureAuthenticated, createNewEventView).post(validate, createNewEvent)

// update event
router.get("/update/:id", updateEventView)
router.post("/update", validate, updateEvent)

router.get("/delete/:id", deleteEvent)

// router.post("/search", searchEvent)

module.exports = router