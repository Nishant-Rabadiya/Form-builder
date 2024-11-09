import React, { useContext, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { component } from './Form';
import ElementLayout from './ElementLayout';
import { UserContext } from '../../pages/formBuilder';
import { formElement } from '../../@core/utils/enum';

const DraggableElement = ({ index, element, moveElement, onClick, onDelete, isSelected, preview }) => {
    const ref = useRef(null);
    const contextValue = useContext(UserContext);

    const [, drop] = useDrop({
        accept: formElement?.type,
        hover(item) {
            if (!ref.current || item?.index === index) {
                return;
            }

            moveElement(item?.index, index);
            item.index = index;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: formElement?.type,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        const upadatedFormElements = contextValue?.formElements?.filter((element) => element?.title !== undefined);
        contextValue?.setFormElements(upadatedFormElements)
    }, []);

    return (
        <div
            ref={drag(drop(ref))}
            className={`mb-3 ${isDragging ? 'opacity-50' : ''}`}
            onClick={onClick}
        >
            {isSelected && !preview ? (
                <ElementLayout data={element} onDelete={onDelete}>
                    {component(element, preview)}
                </ElementLayout>
            ) : (
                component(element, preview)
            )}
        </div>
    );
};

export default DraggableElement;


