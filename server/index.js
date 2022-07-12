require('dotenv').config()
const express = require('express')
const router = require('./routes/routes')
const pool = require('./db')
const initDB = require("./initDB");

const PORT = process.env.PORT || 5000

const app = express()

app.use('/api', router)

const start = async () => {
    try {
        initDB()
        app.listen(PORT, ()=> console.log(`Server run on ${PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}

start()