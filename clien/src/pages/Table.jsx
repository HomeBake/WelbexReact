import React, {useContext, useEffect, useState} from "react";
import {Context} from "../components/ContextProvider";
import {addRow, fetchRows} from "../http/tableAPI";
import MyTable from "../components/UI/MyTable";
import {observer} from "mobx-react-lite";
import useLoading from "../hooks/useLoading";
import Pagination from "../components/Pagination";
import MyButton from "../components/UI/MyButton";
import ModalWindow from "../components/UI/ModalWindow";
import EditRow from "../components/EditRow";

const tableHeaders = [
    'ДАТА', 'Название', 'Количество' , 'Расстояние'
]

const emptyRow = {
    DATE: '',
    TITLE: '',
    DISTANCE: '',
    AMOUNT: '',
    ID: '',
}

const Table = observer(() => {
    const {tableStore, filterStore, sortStore} = useContext(Context)
    const [isLoading, endLoading] = useLoading()
    const [newRow, setNewRow] = useState(emptyRow)
    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [rowsAmount, setRowsAmount] = useState(9)
    const rows = tableStore.rows
    const limit = tableStore.limit

    const addNewRow = () => {
        addRow(newRow).then(res => {
            if (res.status === 200) {
                tableStore.setIsDeleted(tableStore.isDeleted + 1)
                setModalVisible(false)
            }
            else {
                setError(res.data.message)
            }
        })
    }

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
        fetchRows(fColumn, fCondition, fValue, sortColumn, page).then( data => {
            if (data.rows) {
                tableStore.setRows(data.rows)
                data.rows.length &&
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

    return (
        <div className={'table'}>
            {
                modalVisible &&
                <ModalWindow
                    onHide={ () => setModalVisible(false)}
                    title={'Создание'}
                >
                    <EditRow
                        selectedRow={newRow}
                        setSelectedRow={setNewRow}
                        saveChange={addNewRow}
                        error={error}
                    />
                </ModalWindow>
            }
            <h1> Таблица </h1>
            <MyTable tableHeaders={tableHeaders} rows={rows}/>
            {isLoading && <h2> Загрузка</h2>}
            <MyButton
                className={'button'}
                onClick={ () => setModalVisible(true)}
            > Добавить
            </MyButton>
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