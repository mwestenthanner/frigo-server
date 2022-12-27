const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

const Location = model('location', LocationSchema)

module.exports = Location