import React from 'react';
import './MyButton.css'

const MyButton = (props) => {
    return (
        <button
            {...props}
        >
            {props.children}
        </button>
    );
};

export default MyButton;