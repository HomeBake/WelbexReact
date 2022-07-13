import React from 'react';
import "./MySelect.css"
import {codeToRus} from "../../utils/constant";

const MySelect = (props) => {
    return (
        <select
            {...props}
        >
            {props.children}
        </select>
    );
};

export default MySelect;