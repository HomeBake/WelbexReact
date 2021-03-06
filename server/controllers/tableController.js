const tableService = require('../service/tableService')
const ApiError = require("../errors/ApiError");

//Контроллер сущности таблицы

class tableController {
    // Получение нужных строк таблицы
    async getRows(req, res, next) {
        try {
            let {sortColumn, limit, page, fColumn, fCondition, fValue} = req.query
            limit = limit || 9 // Если лимит от пользователя не пришел ставим 9
            page = page || 1 // Так-же
            const rows = await tableService.getRows(sortColumn, limit, page, fColumn, fCondition, fValue)
            if (rows instanceof ApiError) {
                return next(rows)
            }// Если приходит ошибка, то отправляем её в мидлвеер
            return res.json({rows})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async editRow(req, res, next) {
        try {
            const {row} = req.body
            const result = await tableService.editRow(row)
            if (result instanceof ApiError) {
                return next(result)
            }
            return res.json({result})
        } catch (e) {
            return next(ApiError.serverError())
        }
    }

    async deleteRow(req, res, next) {
        try {
            const {id} = req.query
            const result = await tableService.deleteRow(id)
            if (result instanceof ApiError) {
                return next(result)
            }
            return res.json({result})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async addRow(req, res, next) {
        try {
            const {row} = req.body
            console.log(row)
            const result = await tableService.addRow(row)
            if (result instanceof ApiError) {
                return next(result)
            }
            return res.json({result})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new tableController