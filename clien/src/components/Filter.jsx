import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./ContextProvider";
import './Filter.css'
import '../utils/constant'
import {codeToRus} from "../utils/constant";
import MyInput from "./UI/MyInput";
import MySelect from "./UI/MySelect";

const Filter = observer(() => {
    const {filterStore, tableStore} = useContext(Context)
    const columName = filterStore.filterCol
    const condition = filterStore.filterCondition
    const changeFilter = (e) => {
        filterStore.setSelectedFilterCondition(e.target.value)
        tableStore.setPage(1)
    }

    return (
        <div className={'filter-wrapper'}>
            <h1> Фильтрация </h1>
            <MySelect
                className={'filter-unit select-css'}
                value={filterStore.selectedFilterCol}
                onChange={e => filterStore.setSelectedFilterCol(e.target.value)}
            >
                <option>Название ячейки</option>
            {columName.map(colum =>
                    <option
                        key={colum}
                        value={colum}
                    >
                        {codeToRus[colum]}
                    </option>
            )}
            </MySelect>
            <MySelect
                className={'filter-unit select-css'}
                value={filterStore.selectedFilterCondition}
                onChange={changeFilter}
            >
                <option>Условие</option>
                {condition.map(condition =>
                    <option
                        key={condition}
                        value={condition}
                    >
                        {codeToRus[condition]}
                    </option>
                )}
            </MySelect>
            <MyInput
                className={'filter-unit'}
                type={"text"}
                value={filterStore.filterValue}
                placeholder={'Строка для сравнения'}
                onChange={e => filterStore.setFilterValue(e.target.value)}
            />
        </div>
    );
});

export default Filter;