const multer = require("multer");

// configure multer 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

let upload = multer({ storage: storage });
module.exports = upload;