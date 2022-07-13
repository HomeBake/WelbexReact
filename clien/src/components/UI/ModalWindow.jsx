import React from 'react';
import styles from './ModalWindow.module.css'

const ModalWindow = ({title, onHide, children}) => {
    return (
        <div
            className={styles['modal-wrapper']}
            onClick={onHide}
        >
            <div
                className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className={styles['modal-head']}>
                    <div className={styles['modal-title']}>
                        {title}
                    </div>
                    <button
                        className={styles['modal-close']}
                        onClick={onHide}
                    >
                        x
                    </button>
                </div>
                <hr className={styles['hr-line']}></hr>
                <div className={styles['modal-body']}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;