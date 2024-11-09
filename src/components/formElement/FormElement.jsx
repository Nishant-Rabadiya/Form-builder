import React from 'react';
import { useDrag } from 'react-dnd';

const FormElement = ({ icon, name, margin }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FORM_ELEMENT',
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div ref={drag} style={{ opacity }} className={`text-center py-3 ${margin} bg-secondary-subtle rounded`}>
            <span className='text-body-tertiary'><i className={icon}></i></span>
            <p className='element-title m-0 fs-6'>{name}</p>
        </div>
    );
};

export default FormElement;

