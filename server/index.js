require('dotenv').config()
const express = require('express')
const router = require('./routes/routes')
const initDB = require("./initDB");
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandler')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        initDB()
        app.listen(PORT, () => console.log(`Server run on ${PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}

start()