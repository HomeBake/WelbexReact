import React, {useContext} from 'react';
import {Context} from "./ContextProvider";
import {observer} from "mobx-react-lite";
import './Sort.css'


const Sort = observer(() => {
    const {sortStore} = useContext(Context)
    const sorts = sortStore.sorts
    return (
            <div className={'sort-wrapper'}>
                <h1> Сортировка </h1>
                <select
                    className={'sort-unit select-css'}
                    value={sortStore.selectedSort.title}
                    onChange={e => sortStore.setSelectedSort(e.target.value)}
                >
                    <option>Выберите сортировку</option>
                    {sorts.map(({title,value},num) =>
                        <option key={num} value={value}> {title} </option>
                    )}
                </select>
            </div>
    );
});

export default Sort;