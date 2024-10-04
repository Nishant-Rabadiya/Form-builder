import React from 'react';

const ElementLayout = ({ children, onDelete }) => {

    return (
        <div className='active-section rounded p-2 mt-2'>
            <p
                className='delete-icon m-0 text-end'>
                <span style={{ cursor: 'pointer' }}
                    onClick={() => onDelete()}>
                    <i className='fa-solid fa-trash-can'></i>
                </span>
            </p>
            {children}
        </div>
    );
};

export default ElementLayout;

