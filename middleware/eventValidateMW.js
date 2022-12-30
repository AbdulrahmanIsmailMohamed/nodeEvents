const validate = require("../util/eventValidator");

module.exports = (req, res, nxt) => {
    let valide = validate(req.body);
    if (!valide) {
        res.status(403).json(validate.errors)
        // let errors = validate.errors
        // res.render('event', { errors: errors });
    }
    else {
        nxt()
    }
}



