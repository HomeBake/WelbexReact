import React from 'react';
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";

const EditRow = ({selectedRow,setSelectedRow, saveChange}) => {

    const changeRow = (e) => {
        let newRow = {}
        for (let key in selectedRow) {
            if (key === e.target.id) {
                newRow[key] = e.target.value
            }
            else {
                newRow[key] = selectedRow[key]
            }
        }
        setSelectedRow(newRow)
    }

    return (
        <div
            className={'editRow'}
        >
            <MyInput
                title={'Дата'}
                id={'DATE'}
                value={selectedRow.DATE}
                onChange={changeRow}
            />
            <MyInput
                title={'Название'}
                id={'TITLE'}
                value={selectedRow.TITLE}
                onChange={changeRow}
            />
            <MyInput
                title={'Количество'}
                id={'AMOUNT'}
                value={selectedRow.AMOUNT}
                onChange={changeRow}
            />
            <MyInput
                title={'Дистанция'}
                id={'DISTANCE'}
                value={selectedRow.DISTANCE}
                onChange={changeRow}
            />
            <div>
                <MyButton
                    className={'button'}
                    onClick={() => saveChange(selectedRow)}
                >
                    Сохранить
                </MyButton>
            </div>
        </div>
    );
};

export default EditRow;