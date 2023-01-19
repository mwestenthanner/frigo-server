const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    locationId: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    quantity: {
        type: Number,
        required: false,
    },
    useUp: {
        type: Date,
        required: false,
    },
    alwaysInStock: {
        type: Boolean,
        required: false,
    },
    onShoppingList: {
        type: Boolean,
        required: false,
    },
    quantityOnShoppingList: {
        type: Number,
        required: false,
    },
    markedAsBought: {
        type: Boolean,
        required: false,
    },
    buyAgain: {
        type: Boolean,
        required: false,
    },
    notes: {
        type: String,
        required: false,
        text: true
    }
})

const Product = model('product', ProductSchema)

module.exports = Product