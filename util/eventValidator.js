const Ajv = require("ajv")
const ajv = new Ajv()


const schema = {
    type: "object",
    properties: {
        "title": {
            "type": "string",
            minLength: 2,
            maxLength: 10
        },
        description: {
            "type": "string",
            minLength: 10,
            maxLength: 150
        },
        location: {
            "type": "string",
            minLength: 2,
            maxLength: 20
        },
        
    },
    required: [
        "title",
        "description",
        "location",
    ],
}

const validate = ajv.compile(schema)
module.exports = validate