const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "must provide name"],
        trim: true,
        minLength: [2, "title can't be less 2 character"],
        maxLength: [10, "title can't be more than 10 character"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "description can't be less 10 character"],
        maxLength: [150, "name can't be more than 150 character"]
    },
    location: {
        type: String,
        required: true,
        minLength: [2, "location can't be less 2 character"],
    },
    date: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        require: true
    }
});

const event = mongoose.model("event", eventSchema);
module.exports = event;