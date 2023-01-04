const valid = require("validator")
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, "title can't be less 3 character"],
        maxLength: [15, "title can't be more than 15 character"]
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        validate: {
            validator: (val) => valid.isEmail(val),
            message: `{VALUE} isn't valid email`
        }
    },
    // isAdmin: {
    //     type: Boolean
    // },
    password: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: (val) => valid.isStrongPassword(val),
            message:`{PASSWORD} isn't strong password`
        }
    }
});

const User = mongoose.model("User",userSchema,"Users")
module.exports = User;