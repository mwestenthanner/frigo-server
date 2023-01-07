const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    }
})

const Location = model('location', LocationSchema)

module.exports = Location