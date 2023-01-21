const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    content: {
        type: String,
        required: true,
        text: true
    },
    recipeId: {
        type: String,
        required: false
    }
})

const Note = model('note', NoteSchema)

module.exports = Note