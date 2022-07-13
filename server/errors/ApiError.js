class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static serverError() {
        return new ApiError(500, 'Непредвиденная ошибка')
    }

    static invalidData(message) {
        return new ApiError(202, message)
    }
}

module.exports = ApiError
