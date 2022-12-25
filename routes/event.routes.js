const { getAllEvent } = require('../controller/event.controller');

const router = require('express').Router();

router.get('/', getAllEvent);

router.get('/:id', (req, res) => {
    res.render("event/show")
});



module.exports = router