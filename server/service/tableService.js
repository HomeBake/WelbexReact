const pool = require('../db')
const ApiError = require("../errors/ApiError");

const sortDict = {
    DEFAULT: `"ID"`,
    TITLE_UP: `"TITLE"`,
    TITLE_DOWN: `"TITLE"  DESC`,
    AMOUNT_UP: `"AMOUNT"`,
    AMOUNT_DOWN: `"AMOUNT"  DESC`,
    DISTANCE_UP: `"DISTANCE"`,
    DISTANCE_DOWN: `"DISTANCE" DESC`,
}
const fColumnDict = {
    TITLE: 'string',
    DATE: 'date',
    AMOUNT: 'int',
    DISTANCE: 'float',
}

const fConditionDict = {
    EQUAL: `=`,
    LIKE: `LIKE`,
    MORE: `>`,
    LESS: '<',
}

function isPositiveInt(value) {
    return /^\d+$/.test(value);
}

function isFloat(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function validateDate(row) {
    try {
        Date.parse(row.DATE)
    } catch (e) {
        return ApiError.invalidData('Неверная дата')
    }
    if (isNaN(Date.parse(row.DATE))) {
        return ApiError.invalidData('Неверная дата')
    }
    if (!isPositiveInt(row.AMOUNT)) {
        return ApiError.invalidData('Неверное количество')
    }
    if (!isFloat(row.DISTANCE)) {
        return ApiError.invalidData('Неверная дистанция')
    }
}

function validateFilters(fColumn, fCondition, fValue) {
    if (!(fColumn in fColumnDict)) {
        throw new Error('Колонки для фильтрации не существует')
    }
    if (!(fCondition in fConditionDict)) {
        throw new Error('Операции фильтрации не существует')
    }
    if ((fColumn !== 'TITLE' && fCondition === 'LIKE')) {
        throw new Error('Нельзя применить данную операцию к этому полю')
    }
    if (fColumnDict[fColumn] === 'date') {
        try {
            Date.parse(fValue)
        } catch (e) {
            throw new Error('Необходима дата')
        }
    }
    if (fColumnDict[fColumn] === 'int' && !isPositiveInt(fValue)) {
        throw new Error('Необходимо положительное число')
    }
    if (fColumnDict[fColumn] === 'float' && !isFloat(fValue)) {
        throw new Error('Необходимо число')
    }
}

class TableService {
    static async getRows(sortColumn, limit, page, fColumn, fCondition, fValue) {
        let rows
        const offset = page * limit - limit
        sortColumn = sortDict[sortColumn] || sortDict["DEFAULT"]
        if (fColumn && fValue && fCondition) {
            validateFilters(fColumn, fCondition, fValue)
            if (fColumn === 'TITLE') {
                fValue = `%${fValue}%`
            }
            rows = await pool.query(`
            SELECT "ID", to_char("DATE", 'YYYY-MM-DD') as "DATE", "TITLE", "AMOUNT", "DISTANCE" ,count(*) OVER() AS count
            FROM public."table"
            WHERE "${fColumn}" ${fConditionDict[fCondition]} '${fValue}'
            ORDER BY ${sortColumn}
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
            return rows.rows
        }
        rows = await pool.query(`
            SELECT "ID", to_char("DATE", 'YYYY-MM-DD') as "DATE", "TITLE", "AMOUNT", "DISTANCE" ,count(*) OVER() AS count
            FROM public."table"
            ORDER BY ${sortColumn}
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
        return rows.rows
    }

    static async editRow(row) {
        const validate = validateDate(row)
        if (validate instanceof ApiError) {
            return validate
        }
        const date = new Date(row.DATE).toLocaleDateString()
        const result = await pool.query(`
        UPDATE public."table" SET
        "TITLE" = '${row.TITLE}',
        "DATE" = '${date}',
        "DISTANCE" = '${row.DISTANCE}',
        "AMOUNT" = '${row.AMOUNT}'
         WHERE
        "ID" = ${row.ID};
        `)
        return result
    }

    static async deleteRow(id) {
        const row = await pool.query(`
            SELECT COUNT("ID") as "count"
            FROM (SELECT "ID" FROM public."table" WHERE "ID" = ${id}) as "F"
        `)
        if (row.count === 0) {
            return ApiError.invalidData('Такой строки не существует')
        }
        const result = await pool.query(`
            DELETE FROM public."table" WHERE "ID" = ${id}
        `)
        return result
    }

    static async addRow(row) {

        const validate = validateDate(row)
        const date = new Date(row.DATE).toLocaleDateString()
        if (validate instanceof ApiError) {
            return validate
        }
        const result = await pool.query(`
            INSERT INTO public."table" ("DATE", "TITLE", "AMOUNT", "DISTANCE") 
            VALUES (
            '${date}',
             '${row.TITLE}',
              '${row.AMOUNT}'::bigint,
               '${row.DISTANCE}'::numeric)
        `)
        return result
    }
}

module.exports = TableService