import React, {memo, useContext, useState} from 'react';
import './TableBody.css'
import ModalWindow from "./UI/ModalWindow";
import {deleteRow, editRow} from "../http/tableAPI";
import {Context} from "./ContextProvider";
import EditRow from "./EditRow";


const TableBody = memo(({row}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [error, setError] = useState('')
    const {tableStore} = useContext(Context)

    const delRow = (id) => {
        deleteRow(id).then( () => {
            tableStore.setIsDeleted(tableStore.isDeleted + 1)
        })
    }

    const saveChange = (selectedRow) => {
        editRow(selectedRow).then(res => {
            if (res.status === 200) {
                setModalVisible(false)
                const rows = tableStore.rows
                tableStore.setRows(rows.map((row)=> {
                    if (row.ID !== selectedRow.ID) {
                        return row
                    }
                    else {
                        return selectedRow
                    }
                }))
            }
            else {
                setError(res.data.message)
            }
        })

    }
    console.log()
    return (
        <>
            {modalVisible &&
                <ModalWindow
                    onHide={(e) => {
                        setModalVisible(false)
                        setError('')
                    }

                    }
                    title="Редактирование"
                >
                    <EditRow
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        saveChange={saveChange}
                        error={error}
                    />


                </ModalWindow>
            }
            <tr>
                <td> {new Date(row.DATE).toLocaleDateString()} </td>
                <td> {row.TITLE} </td>
                <td> {row.AMOUNT} </td>
                <td> {row.DISTANCE} </td>
                <td
                    className={'add-row unselectable'}
                    onClick={e => {
                        setModalVisible(true)
                        setSelectedRow(row)
                    }}
                >
                    ®
                </td>
                <td
                    className={'delete-row unselectable'}
                    onClick={() => {
                        delRow(row.ID)
                    }}
                >
                    -
                </td>
            </tr>
        </>
    );
});

export default TableBody;