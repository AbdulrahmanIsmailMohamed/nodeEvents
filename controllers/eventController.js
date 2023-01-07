const Event = require("../model/Event");
const asyncFunction = require("../middleware/async")
const { check, validationResult } = require('express-validator')
const moment = require('moment');
moment().format();

const getAllEvent = (req, res) => {
    let pageNo = parseInt(req.params.pageNo) || 1;
    if (req.params.pageNo == 0) pageNo = 1;
    let q = {
        skip: 5 * (pageNo - 1),
        limit: 5
    }
    let totalDocs = 0;
    Event.countDocuments({}).then((response) => {
        totalDocs = parseInt(response);
        Event.find({}, {}, q, (err, events) => {
            let chunk = []
            let chunkSize = 3
            let eventLength = events.length;
            for (let i = 0; i < eventLength; i += chunkSize) {
                chunk.push(events.slice(i, chunkSize + i))
            }
            res.render('event/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo
            })
        }).sort({ _id: -1 });
    })
};

const getSingleEvent = asyncFunction(async (req, res) => {
    const { id: eventId } = req.params;
    const event = await Event.findOne({ _id: eventId });
    if (!event) return res.status(404).send("Not Found");
    res.render('event/show', {
        event: event
    });
})

const createNewEventView = (req, res) => {
    res.render("event/create", {
        errors: req.flash('errors')
    })
}

const createNewEvent = (req, res) => {
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
            created_at: Date.now(),
            userId: req.user.id
        })
        newEvent.save((err) => {
            if (!err) {
                req.flash('info', "The Event Was Created Successfully")
                res.redirect('/events/allevents/')
            } else {
                console.log(err)
            }
        })
    }
}

const updateEventView = asyncFunction(async (req, res) => {
    const { id: eventId } = req.params;
    let event = await Event.findOne({ _id: eventId })
    if (!event) return res.status(404).send("Not Found");
    res.render('event/edit', {
        event: event,
        eventDate: moment(event.date).format('YYYY-MM-DD'),
        errors: req.flash('errors'),
        message: req.flash('info'),
    });
})

const updateEvent = asyncFunction(async (req, res) => {
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
        res.redirect("/events/allevents")
    }
})

const deleteEvent = asyncFunction(async (req, res) => {
    const { id: eventId } = req.params;
    const event = await Event.deleteOne({ _id: eventId });
    if (!event) return res.status(404).send("Not Found");
    req.flash("info", "the event was deleted successfully-_-")
    res.redirect("/events/allevents/")
})

const searchEvent = (req, res) => {
    const query = req.body.title;
    res.send(`query = ${query}`)
}

module.exports = {
    getAllEvent,
    getSingleEvent,
    createNewEvent,
    createNewEventView,
    updateEventView,
    updateEvent,
    deleteEvent,
    searchEvent
}