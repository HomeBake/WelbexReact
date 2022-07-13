import {$host} from "./index";

const baseUrl = process.env.REACT_APP_API_PREFIX + process.env.REACT_APP_API_TABLE

export const fetchRows = async (fColumn, fCondition, fValue, sortColumn, page, limit) => {
    // const url = new URL(baseUrl)
    sortColumn = sortColumn || 'DEFAULT'
    limit = limit || 9
    page = page || 1
    if (!sortColumn) {
        sortColumn = ''
    }
    // sortColumn && url.searchParams.append('sortColumn', sortColumn)
    // fColumn && url.searchParams.append('fColumn', fColumn)
    // fCondition && url.searchParams.append('fCondition', fCondition)
    // fValue && url.searchParams.append('fValue', fValue)
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