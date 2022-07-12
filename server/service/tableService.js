const pool = require('../db')

const sortDict = {
    TITLE_UP: `"TITLE"`,
    TITLE_DOWN: `"TITLE  DESC"`,
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

function validateFilters(fColumn,fCondition,fValue) {
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
        if (!sortColumn && !fColumn) {
            rows = await pool.query(`
            SELECT * 
            FROM public."table" 
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
        }
        if (sortColumn && !fColumn) {
            rows = await pool.query(`
            SELECT * 
            FROM public."table"
            ORDER BY ${sortDict[sortColumn]}
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
        }
        try {
            validateFilters(fColumn,fCondition,fValue)
        }
        catch (e) {
            throw new Error(e.message)
        }
        if (fColumn === 'TITLE') {
            fValue = `%${fValue}%`
        }
        if (!sortColumn && fColumn) {
            rows = await pool.query(`
            SELECT * 
            FROM public."table"
            WHERE "${fColumn}" ${fConditionDict[fCondition]} '${fValue}'
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
        }
        if (sortColumn && fColumn) {
            rows = await pool.query(`
            SELECT * 
            FROM public."table"
            WHERE "${fColumn}" ${fConditionDict[fCondition]} '${fValue}'
            ORDER BY ${sortDict[sortColumn]}
            LIMIT ${limit} 
            OFFSET ${offset}
            `)
        }
        return rows.rows
    }
}

module.exports = TableService