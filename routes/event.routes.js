const { getAllEvent, getSingleEvent, createNewEvent } = require('../controller/event.controller');

const router = require('express').Router();


router.get('/', getAllEvent);

router.get('/getevent/:id', getSingleEvent);

router.route('/create').get(createNewEvent).post(createNewEvent)

module.exports = router