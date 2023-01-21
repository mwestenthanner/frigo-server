const { Schema, model } = require('mongoose')

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    description: {
        type: String,
        required: false,
        text: true
    },
    categories: {
        type: Array,
        required: true,
        text: true
    },
    ingredients: {
        type: Array,
        required: true,
        text: true
    },
    instructions: {
        type: Array,
        required: true,
        text: true
    },
    img: {
        type: String,
        required: false
    },
    notes: {
        type: Array,
        required: false
    },
})

const Recipe = model('recipe', RecipeSchema)

module.exports = Recipe