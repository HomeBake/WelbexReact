import React, {memo, useContext} from 'react';
import './MyTable.css'
import {Context} from "../ContextProvider";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {fetchRows} from "../../http/tableAPI";
import TableBody from "../TableBody";

const MyTable = memo(({tableHeaders, rows}) => {
    return (
        <div className={'table-wrapper'}>
            <table>
                <tbody>
                <tr>
                    {tableHeaders.map((header, num) =>
                        <td key={num} className={`table-head`}>
                            {header}
                        </td>
                    )}
                </tr>
                {rows.length > 0 ?
                    rows.map(row =>
                        <TableBody key={row.ID} row={row}/>
                    )
                    :
                    <tr>
                        <th colSpan={4}> Записей нет</th>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
});

export default MyTable;