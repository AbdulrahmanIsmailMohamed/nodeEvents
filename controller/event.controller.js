const Event = require("../model/event.model");

const getAllEvent = async (req, res) => {
    const events = await Event.find({});
    let chunk = []
    let chunkSize = 3
    for (let i = 0; i < events.length; i += chunkSize) {
        chunk.push(events.slice(i, chunkSize + i))
    }
    //res.json(chunk)
    res.render('event/index', {
        chunk: chunk
    })
}

module.exports = {
    getAllEvent
}