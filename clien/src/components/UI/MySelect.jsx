import React from 'react';
import "./MySelect.css"

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