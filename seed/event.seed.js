const db = require('../config/connect')
const Event = require("../model/event.model");

let newEvents = [
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: "beach cleaning at muscat",
        description: "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
        location: "zagazig",
        date: Date.now(),
        created_at: Date.now()
    }),
]

newEvents.forEach((event) => {
    event.save((err) => {
        if (err) console.log(`MSQ ${err}`);
    })
});