import React from 'react';
import './MyInput.css'

const MyInput = (props) => {
    return (
        <div className={"input-wrapper"}>
            <label> {props.title} </label>
            <input
                {...props}
            />
        </div>
    );
};

export default MyInput;