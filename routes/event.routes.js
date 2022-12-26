const { getAllEvent, getSingleEvent } = require('../controller/event.controller');

const router = require('express').Router();

router.get('/', getAllEvent);

router.get('/:id', getSingleEvent);


module.exports = router