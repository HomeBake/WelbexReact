import React, {useContext} from 'react';
import {Context} from "./ContextProvider";
import './Pagination.css'
import {observer} from "mobx-react-lite";

const Pagination = observer(({limit, rowsAmount}) => {
    const {tableStore} = useContext(Context)
    const pageNumbers = [];
    const currentPage = tableStore.page
    for (let i = 1; i <= Math.ceil(rowsAmount / limit); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumber = pageNumbers.map(number => {
        const classes = currentPage === number ? 'pagination-active unselectable' : 'unselectable';
        if (number === 1 || number === pageNumbers.length || (number >= currentPage - 2 && number <= currentPage + 2)) {
            return (
                <div key={number} className={classes} onClick={() => tableStore.setPage(number)}> {number} </div>
            )
        }

    })

    return (
        <div className={'pagination'}>
            {
                currentPage !== 1 &&
                <div
                    className={'unselectable'}
                    onClick={() => tableStore.setPage(currentPage - 1)}
                >
                    &laquo;
                </div>
            }
            {renderPageNumber}
            {
                currentPage !== pageNumbers.length &&
                <div
                    className={'unselectable'}
                    onClick={() => tableStore.setPage(currentPage + 1)}
                >
                    &raquo;
                </div>
            }

        </div>
    );
});

export default Pagination;