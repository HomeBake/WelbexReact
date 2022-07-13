import React, {useContext, useEffect, useState} from "react";
import {Context} from "../components/ContextProvider";
import {fetchRows} from "../http/tableAPI";
import MyTable from "../components/UI/MyTable";
import {observer} from "mobx-react-lite";
import useLoading from "../hooks/useLoading";
import Pagination from "../components/Pagination";

const tableHeaders = [
    'ДАТА', 'Название', 'Количество' , 'Расстояние'
]

const Table = observer(() => {
    const {tableStore, filterStore, sortStore} = useContext(Context)
    const [isLoading, endLoading] = useLoading()
    const [rowsAmount, setRowsAmount] = useState(9)
    const rows = tableStore.rows
    const limit = 8



    useEffect(()=> {
        fetchRows().then( data => {
            tableStore.setRows(data.rows)
            setRowsAmount(data.rows[0].count)
        })
    }, [])

    useEffect(()=> {
        const fColumn = filterStore.selectedFilterCol
        const fCondition = filterStore.selectedFilterCondition
        const fValue = filterStore.filterValue
        const sortColumn = sortStore.selectedSort
        const page = tableStore.page
        console.log('что-то изменилось')
        fetchRows(fColumn, fCondition, fValue, sortColumn, page).then( data => {
            if (data.rows) {
                tableStore.setRows(data.rows)
                setRowsAmount(data.rows[0].count)

            }
        }).catch(console.log).finally(endLoading)

    },[
        filterStore.selectedFilterCol,
        filterStore.selectedFilterCondition,
        filterStore.filterValue,
        sortStore.selectedSort,
        tableStore.page,
        tableStore.isDeleted
    ])

    useEffect(()=> {
        console.log('рендер')
    })

    return (
        <div className={'table'}>
            <h1> Таблица </h1>
            <MyTable tableHeaders={tableHeaders} rows={rows}/>
            {isLoading && <h2> Загрузка</h2>}
            {rowsAmount > limit &&
                <Pagination
                    limit={limit}
                    rowsAmount={rowsAmount}
                />
            }

        </div>
    );
});

export default Table;