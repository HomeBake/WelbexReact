import {$host} from "./index";

// Запросы на сервер

const baseUrl = process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_TABLE

export const fetchRows = async (fColumn, fCondition, fValue, sortColumn, page, limit) => {
    sortColumn = sortColumn || 'DEFAULT'
    limit = limit || 9
    page = page || 1
    if (!sortColumn) {
        sortColumn = ''
    }
    const {data} = await $host.get(baseUrl, {
        params: {
            sortColumn,
            limit,
            page,
            fColumn,
            fCondition,
            fValue
        }
    })
    return data
}

export const editRow = async (row) => {
    const res = await $host.post(baseUrl + 'edit', {
        row
    })
    return res
}

export const deleteRow = async (id) => {
    const res = await $host.delete(baseUrl + 'delete', {
        params: {
            id
        }
    })
    return res
}

export const addRow = async (row) => {
    const res = await $host.post(baseUrl + 'add', {
        row
    })
    return res
}