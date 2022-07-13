import React from 'react';
import './ModalWindow.css'

const ModalWindow = ({title, onHide, children}) => {
    return (
        <div
            className={'modal-wrapper'}
            onClick={
                onHide
            }
        >
            <div
                className={'modal'}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className={'modal-head'}>
                    <div className={"modal-title"}>
                        {title}
                    </div>
                    <button
                        className={"modal-close"}
                        onClick={onHide}
                    >
                        x
                    </button>
                </div>
                <hr className={'hr-line'}></hr>
                <div className={'modal-body'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;