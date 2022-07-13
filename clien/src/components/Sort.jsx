import React, {useContext} from 'react';
import {Context} from "./ContextProvider";
import {observer} from "mobx-react-lite";
import './Sort.css'
import MySelect from "./UI/MySelect";

const Sort = observer(() => {
    const {sortStore,tableStore} = useContext(Context)
    const sorts = sortStore.sorts
    const changeSort = (e) => {
        sortStore.setSelectedSort(e.target.value)
        tableStore.setPage(1)
    }
    return (
            <div className={'sort-wrapper'}>
                <h1> Сортировка </h1>
                <MySelect
                    className={'sort-unit select-css'}
                    value={sortStore.selectedSort.title}
                    onChange={changeSort}
                >
                    <option>Выберите сортировку</option>
                    {sorts.map(({title,value},num) =>
                        <option key={num} value={value}> {title} </option>
                    )}
                </MySelect>
            </div>
    );
});

export default Sort;