const { Router } = require('express')
const Location = require('../../models/Location')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const locationList = await Location.find()
        if (!locationList) throw new Error('No Product List found')
        res.status(200).json(locationList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/count', async (req, res) => {
    try {
        const locationCount = await Location.find().count()
        if (!locationCount) throw new Error('No Product List found')
        res.status(200).json(locationCount)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newLocation = new Location(req.body)
    try {
        const location = await newLocation.save()
        if (!location) throw new Error('Something went wrong saving the entry')
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Location.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router