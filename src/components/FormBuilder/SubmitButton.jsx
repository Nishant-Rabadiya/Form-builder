import React from 'react';

const SubmitButton = ({ data }) => {
    return (
        <div
            style={{ textAlign: data?.style?.position }}>
            <button
                className='border border-primary rounded text-light px-5 py-2'
                style={{ backgroundColor: data?.style?.color, fontSize: data?.style?.fontSize + 'px' }}>
                {data?.title}
            </button>
        </div>
    )
};

export default SubmitButton;

