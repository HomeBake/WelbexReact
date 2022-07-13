const ApiError = require('../errors/ApiError')
// Если ошибка нам знакома, то возвращаем сообщение с ней, если нет, то непредвиденную

module.exports = function (err, req, res) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}