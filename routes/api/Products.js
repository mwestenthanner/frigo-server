const { Router } = require('express');
const Product = require('../../models/Product')

const router = Router()

router.get('/', async (req, res) => {

    let { limit = 10, page = 1, q, locationId, inStock, quantity, onShoppingList } = req.query;
    
    const limitRecords = parseInt(limit);
    const skip = (page -1) * limit;

    let query = {};

    if (q) {
        query = {$text: {$search: q}};
    }

    if (locationId) query.locationId = locationId;
    if (inStock) query.inStock = inStock;
    if (quantity) query.quantity = quantity;
    if (onShoppingList) query.onShoppingList = onShoppingList;

    try {
        const productList = await Product.find(query).limit(limitRecords).skip(skip);
        if (!productList) throw new Error('No Product List found')
        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/stock', async (req, res) => {
    let query = {}
    let { limit = 10, page = 1, q, locationId, quantity, onShoppingList, useUpMin, useUpMax } = req.query;
    
    const limitRecords = parseInt(limit);
    const skip = (page -1) * limit;

    if (q) {
        query = {$text: {$search: q}};
    }
    
    if (locationId) query.locationId = locationId;
    if (quantity) query.quantity = quantity;
    if (onShoppingList) query.onShoppingList = onShoppingList;

    if (useUpMin && useUpMax) query.useUp = { 
        $gte: new Date(useUpMin),
        $lte: new Date(useUpMax),
        $type: "date"
    }; else if (useUpMin) query.useUp = { 
        $gte: new Date(useUpMin),
        $type: "date"
    }; else if (useUpMax) query.useUp = { 
        $lte: new Date(useUpMax),
        $type: "date"
    }

    query.inStock = true;

    try {
        const productList = await Product.find(query).limit(limitRecords).skip(skip);
        if (!productList) throw new Error('No Product List found')
        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/dates', async (req, res) => {
    let { date } = req.query;
    let dateFormatted = new Date(date);

    console.log(date)

    let query = {
        useUp: { 
            $gte: dateFormatted,
            $type: "date"
        }
    }

    try {
        const productList = await Product.find(query);
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
    const product = req.body;
    if (product.useUp) {
        const useUpDate = new Date(product.useUp);
        useUpDate.setUTCHours(0,0,0,0);
        product.useUp = useUpDate.toISOString();
    }
    const newProduct = new Product(product)
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
    const updateObj = req.body;

    try {
        const updated = await Product.findByIdAndUpdate(id, updateObj, { new: true })
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