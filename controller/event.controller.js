const Event = require("../model/eventSchema");
// const { check, validationResult } = require('express-validator')

const getAllEvent = async (req, res) => {
    try {
        const events = await Event.find({});
        let chunk = []
        let chunkSize = 3
        let eventLength = events.length;
        for (let i = 0; i < eventLength; i += chunkSize) {
            chunk.push(events.slice(i, chunkSize + i))
        }
        res.render('event/index', {
            chunk: chunk
        })
    } catch (error) {
        res.status(500).json(error)
    }
};

const getSingleEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const event = await Event.findOne({ _id: eventId });
        if (!event) return res.status(404).send("Not Found");
        res.render('event/show', {
            event: event
        });
    } catch (error) {
        res.status(500).json(error)
    }

}

const createNewEventGet = (req, res) => {
    res.render("event/create")
}

const createNewEventPost = (req, res) => {
    let newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        created_at: Date.now()
    })

    newEvent.save((err) => {
        if (!err) {
            console.log('event was added')
            res.redirect('/events')
        } else {
            console.log(err)
        }
    })

}
module.exports = {
    getAllEvent,
    getSingleEvent,
    createNewEventPost,
    createNewEventGet
}