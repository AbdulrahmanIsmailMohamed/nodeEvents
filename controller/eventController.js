const Event = require("../model/eventSchema");
const { check, validationResult } = require('express-validator')
const moment = require('moment')
moment().format();

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
            chunk: chunk,
            message: req.flash('info')
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
    res.render("event/create", {
        errors: req.flash('errors')
    })
}

const createNewEventPost = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array())
        res.redirect('/events/create')
    } else {
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            created_at: Date.now()
        })
        newEvent.save((err) => {
            if (!err) {
                req.flash('info', "The Event Was Created Successfully")
                res.redirect('/events')
            } else {
                console.log(err)
            }
        })
    }
}

const updateEventGET = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        let event = await Event.findOne({ _id: eventId })
        if (!event) return res.status(404).send("Not Found");
        res.render('event/edit', {
            event: event,
            eventDate: moment(event.date).format('YYYY-MM-DD'),
            errors: req.flash('errors'),
            message: req.flash('info'),
        });
    } catch (error) {
        for (const err in error) {
            res.status(500).json(err.message)
        }
    }
}

const updateEventPost = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array())
            res.redirect('/events/update/' + req.body.id)
        } else {
            const update = {
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                date: req.body.date
            }
            const query = { _id: req.body.id }
            const event = await Event.findOneAndUpdate(query, update)
            if (!event) return res.status(404).send("Not Found");
            req.flash("info", "the event was updated successfully:)");
            res.redirect("/events")
        }
    } catch (error) {
        for (const err in error) {
            res.status(500).json(err.message)
        }
    }

}

const deleteEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const event = await Event.deleteOne({ _id: eventId });
        if (!event) return res.status(404).send("Not Found");
        req.flash("info", "the event was deleted successfully-_-")
        res.redirect("/events/")
    } catch (error) {
        for (const err in error) {
            res.status(500).json(err.message)
        }
    }
}

module.exports = {
    getAllEvent,
    getSingleEvent,
    createNewEventPost,
    createNewEventGet,
    updateEventGET,
    updateEventPost,
    deleteEvent
}