const { Router } = require('express')
const Product = require('../../models/Product')

const router = Router()

router.get('/', async (req, res) => {

    let { limit = 10, page = 1, q, locationId, inStock, quantity, onShoppingList } = req.query;
    
    // Convert Limit and Page to Strings
    // Good for pagination
    const limitRecords = parseInt(limit);
    const skip = (page -1) * limit;

    // Insert everyting into one 'Query' object and check if empty
    let query = {};
    if(q) {
        query = {$text: {$search: q}};
    }

    if(locationId) query.locationId = locationId;
    if(inStock) query.inStock = inStock;
    if(quantity) query.quantity = quantity;
    if(onShoppingList) query.onShoppingList = onShoppingList;

    try {
        const productList = await Product.find(query)
        if (!productList) throw new Error('No Product List found')
        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/stock', async (req, res) => {
    const query = { inStock: true }
    try {
        const productList = await Product.find(query)
        if (!productList) throw new Error('No Product List found')
        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const productList = await Product.findById(id)
        if (!productList) throw new Error('No Product List found')
        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const product = await newProduct.save()
        if (!product) throw new Error('Something went wrong saving the entry')
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {} = req.query; 

    let query = {}

    try {
        const updated = await Product.updateOne({ _id: id }, query)
        if (!updated) throw Error('Something went wrong')
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Product.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router