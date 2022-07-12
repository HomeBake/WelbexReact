const tableService = require('../service/tableService')

class tableController {
    async getRows(req, res, next) {
        try {
            let {sortColumn, limit, page, fColumn, fCondition, fValue} = req.query
            limit = limit || 9
            page = page || 1
            const rows = await tableService.getRows(sortColumn, limit, page, fColumn, fCondition, fValue)
            return res.json({rows})
        } catch (e) {
            return res.json({message: e.message})
        }
    }
}

module.exports = new tableController