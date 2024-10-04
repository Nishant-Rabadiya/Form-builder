import React from 'react';

const InputElements = ({ data, preview }) => {
    return (
        <>
            <p
                className='m-0'
                style={{ color: data?.style?.color, fontSize: data?.style?.fontSize + 'px', textAlign: data?.style?.position }}>
                {data?.title}
            </p>
            <input
                type={data?.title === 'Phone' ? 'number' : 'text'}
                className='w-100 mt-1'
                placeholder={`Enter your ${data?.title}`}
                disabled={!preview ?? false}

            />
        </>
    )
}

export default InputElements;