const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/api/Products')
const locationRoutes = require('./routes/api/Locations')

require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())

console.log("hi")

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/products', productRoutes)
app.use('/api/locations', locationRoutes)

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))