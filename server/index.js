require('dotenv').config() // Переменные окружения в файле .env, там хранятся настройки для бд
const express = require('express') // Веб-фреймворк
const router = require('./routes/routes') // Роуты
const initDB = require("./initDB")
const cors = require('cors') // Для работы с cors
const errorHandler = require('./middleware/ErrorHandler') // Отлавливание ошибок

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors()) // Разрешаем все запросы
app.use(express.json()) // Для работы с JSON форматом в post
app.use('/api', router) // Энд-поинты
app.use(errorHandler) // Мидлвеер для отловки ошибок


const start = async () => {
    try {
        initDB() // Проинициализировали бд, чтоб была таблица и тестовые данные
        app.listen(PORT, () => console.log(`Server run on ${PORT} PORT`)) // Прослушиваем порт указанный в переменной окружении или 5000 по дефолту
    } catch (e) {
        console.log(e)
    }
}

start()