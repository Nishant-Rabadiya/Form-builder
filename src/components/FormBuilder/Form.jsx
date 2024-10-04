import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import Header from './Header';
import SubmitButton from './SubmitButton';
import { UserContext } from '../../pages/formBuilder';
import DraggableElement from './DraggableElement';
import InputElements from './InputElements';
import { formElement } from '../../@core/utils/enum';

export const component = (element, preview) => {
    switch (element?.name) {
        case 'Header':
            return <Header data={element} />;
        case 'Name':
            return <InputElements data={element} preview={preview} />;
        case 'Email':
            return <InputElements data={element} preview={preview} />;
        case 'Phone':
            return <InputElements data={element} preview={preview} />;
        case 'Address':
            return <InputElements data={element} preview={preview} />;
        case 'Submit':
            return <SubmitButton data={element} />;
        default:
            return null;
    }
};

const Form = () => {
    const contextValue = useContext(UserContext);
    const moveElement = (dragIndex, hoverIndex) => {
        const updatedElements = [...contextValue?.formElements];
        const [draggedElement] = updatedElements?.splice(dragIndex, 1); 
        const { index, ...elementWithoutIndex } = draggedElement; 

        updatedElements?.splice(hoverIndex, 0, elementWithoutIndex); 
        contextValue?.setFormElements(updatedElements); 
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: formElement?.type,
        drop: (item) => {
            if (item) {
                delete item?.index;
                const newItem = {
                    ...item,
                    id: Date.now(), 
                    title: item?.name,
                    style: {
                        color: '#000000',
                        fontSize: item?.name === 'Header' ? '48' : '16',
                        position: 'left',
                    },
                    type: item?.name === 'Header' ? 'header' : item?.name === 'Submit' ? 'button' : 'input',
                };
                contextValue?.setFormElements((prev) => [...prev, newItem]); 
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const handleElementClick = (index, element) => {
        contextValue?.setSelectedIndex(index); 
        contextValue?.setSelectedValue(element);
    };

    const handleDelete = (indexToDelete) => {
        contextValue?.setFormElements((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
        );
        contextValue?.setSelectedIndex(null);
    };

    return (
        <div ref={drop} className='col-sm-8 p-2'>
            <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
                {contextValue?.formElements?.length > 0 ? (
                    contextValue?.formElements?.map((element, index) => (
                        <DraggableElement
                            key={element?.id}
                            index={index}
                            element={element}
                            moveElement={moveElement}
                            onClick={() => handleElementClick(index, element)}
                            onDelete={() => handleDelete(index)}
                            isSelected={contextValue?.selectedIndex === index}
                            preview={contextValue?.preview}
                        />
                    ))
                ) : (
                    <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
                        Drag element here
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;























// import React, { useContext } from 'react';
// import { useDrop } from 'react-dnd';

// import Header from './Header';
// import Name from './Name';
// import Email from './Email';
// import Phone from './Phone';
// import Address from './Address';
// import SubmitButton from './SubmitButton';
// import { UserContext } from '../../pages/formBuilder';
// import DraggableElement from './DraggableElement';

// export const component = (element, preview) => {
//     switch (element?.title) {
//         case 'Header':
//             return <Header data={element} />;
//         case 'Name':
//             return <Name data={element} preview={preview} />;
//         case 'Email':
//             return <Email data={element} preview={preview} />;
//         case 'Phone':
//             return <Phone data={element} preview={preview} />;
//         case 'Address':
//             return <Address data={element} preview={preview} />;
//         case 'Submit':
//             return <SubmitButton data={element} />;
//         default:
//             return null;
//     }
// };

// const Form = () => {
//     const contextValue = useContext(UserContext);

//     const moveElement = (dragIndex, hoverIndex) => {
//         const updatedElements = [...contextValue?.formElements];
//         const [draggedElement] = updatedElements?.splice(dragIndex, 1); 
//         updatedElements.splice(hoverIndex, 0, draggedElement);
//         contextValue.setFormElements(updatedElements); 
//     };

//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: 'FORM_ELEMENT',
//         drop: (item) => {
//             if (item && item?.index === undefined) {
//                 const newItem = {
//                     ...item,
//                     id: Date.now(), 
//                     title: item?.name,
//                     style: {
//                         color: '#000000',
//                         fontSize: item?.name === 'Header' ? '48' : '16',
//                         position: 'left',
//                     },
//                     type: item?.name === 'Header' ? 'header' : item?.name === 'Submit' ? 'button' : 'input',
//                 };
//                 contextValue?.setFormElements((prev) => [...prev, newItem]); 
//             }
//         },
//         collect: (monitor) => ({
//             isOver: monitor?.isOver(),
//         }),
//     }));

//     const handleElementClick = (index, element) => {
//         contextValue?.setSelectedIndex(index); 
//         contextValue?.setSelectedValue(element);
//     };

//     const handleDelete = (indexToDelete) => {
//         contextValue?.setFormElements((prev) =>
//             prev?.filter((_, index) => index !== indexToDelete)
//         );
//         contextValue?.setSelectedIndex(null);
//     };

//     return (
//         <div ref={drop} className='col-sm-8 p-2'>
//             <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
//                 {contextValue?.formElements?.length ? (
//                     contextValue?.formElements?.map((element, index) => (
//                         <DraggableElement
//                             key={element.id}
//                             index={index}
//                             element={element}
//                             moveElement={moveElement}
//                             onClick={() => handleElementClick(index, element)}
//                             onDelete={() => handleDelete(index)}
//                             isSelected={contextValue?.selectedIndex === index}
//                             preview={contextValue?.preview}
//                         />
//                     ))
//                 ) : (
//                     <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
//                         Drag element here
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// export default Form;























// import React, { useContext } from 'react';
// import { useDrop } from 'react-dnd';

// import Header from './Header';
// import Name from './Name';
// import Email from './Email';
// import Phone from './Phone';
// import Address from './Address';
// import SubmitButton from './SubmitButton';
// import { UserContext } from '../../pages/formBuilder';
// import DraggableElement from './DraggableElement';

// export const component = (element, preview) => {
//     switch (element?.title) {
//         case 'Header':
//             return <Header data={element} />;
//         case 'Name':
//             return <Name data={element} preview={preview} />;
//         case 'Email':
//             return <Email data={element} preview={preview} />;
//         case 'Phone':
//             return <Phone data={element} preview={preview} />;
//         case 'Address':
//             return <Address data={element} preview={preview} />;
//         case 'Submit':
//             return <SubmitButton data={element} />;
//         default:
//             return null;
//     }
// };

// const Form = () => {
//     const contextValue = useContext(UserContext);

//     const moveElement = (dragIndex, hoverIndex) => {
//         const updatedElements = [...contextValue?.formElements];
//         const [draggedElement] = updatedElements?.splice(dragIndex, 1); 
//         updatedElements.splice(hoverIndex, 0, draggedElement);
//         contextValue.setFormElements(updatedElements); 
//     };

//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: 'FORM_ELEMENT',
//         drop: (item) => {
//             if (item && item?.index === undefined) {
//                 const newItem = {
//                     ...item,
//                     id: Date.now(), 
//                     title: item?.name,
//                     style: {
//                         color: '#000000',
//                         fontSize: item?.name === 'Header' ? '48' : '16',
//                         position: 'left',
//                     },
//                     type: item?.name === 'Header' ? 'header' : item?.name === 'Submit' ? 'button' : 'input',
//                 };
//                 contextValue?.setFormElements((prev) => [...prev, newItem]); 
//             }
//         },
//         collect: (monitor) => ({
//             isOver: monitor?.isOver(),
//         }),
//     }));

//     const handleElementClick = (index, element) => {
//         contextValue?.setSelectedIndex(index); 
//         contextValue?.setSelectedValue(element);
//     };

//     const handleDelete = (indexToDelete) => {
//         contextValue?.setFormElements((prev) =>
//             prev?.filter((_, index) => index !== indexToDelete)
//         );
//         contextValue?.setSelectedIndex(null);
//     };

//     return (
//         <div ref={drop} className='col-sm-8 p-2'>
//             <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
//                 {contextValue?.formElements?.length ? (
//                     contextValue?.formElements?.map((element, index) => (
//                         <DraggableElement
//                             key={element.id}
//                             index={index}
//                             element={element}
//                             moveElement={moveElement}
//                             onClick={() => handleElementClick(index, element)}
//                             onDelete={() => handleDelete(index)}
//                             isSelected={contextValue?.selectedIndex === index}
//                             preview={contextValue?.preview}
//                         />
//                     ))
//                 ) : (
//                     <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
//                         Drag element here
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// export default Form;




















































































// Full code without create common common component
// Full code without create common common component
// Full code without create common common component

// import React, { useContext } from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// import Header from './Header';
// import Name from './Name';
// import Email from './Email';
// import Phone from './Phone';
// import Address from './Address';
// import SubmitButton from './SubmitButton';
// import ElementLayout from './ElementLayout';
// import { UserContext } from '../../pages/formBuilder';

// const component = (element, preview) => {
//     switch (element?.name) {
//         case 'Header':
//             return <Header data={element} />;
//         case 'Name':
//             return <Name data={element} preview={preview} />;
//         case 'Email':
//             return <Email data={element} preview={preview} />;
//         case 'Phone':
//             return <Phone data={element} preview={preview} />;
//         case 'Address':
//             return <Address data={element} preview={preview} />;
//         case 'Submit':
//             return <SubmitButton data={element} />;
//         default:
//             return null;
//     }
// };

// const Form = () => {
//     const contextValue = useContext(UserContext);

//     const moveElement = (dragIndex, hoverIndex) => {
//         const updatedElements = [...contextValue.formElements];
//         const [draggedElement] = updatedElements.splice(dragIndex, 1); 
//         updatedElements.splice(hoverIndex, 0, draggedElement); 
//         contextValue.setFormElements(updatedElements); 
//     };

//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: 'FORM_ELEMENT',
//         drop: (item) => {
//             if (item && item.index === undefined) {
//                 const newItem = {
//                     ...item,
//                     id: Date.now(), 
//                     title: item.name,
//                     style: {
//                         color: '#000000',
//                         fontSize: item.name === 'Header' ? '48' : '16',
//                         position: 'left',
//                     },
//                     type: item.name === 'Header' ? 'header' : item.name === 'Submit' ? 'button' : 'input',
//                 };
//                 contextValue.setFormElements((prev) => [...prev, newItem]); 
//             }
//         },
//         collect: (monitor) => ({
//             isOver: monitor?.isOver(),
//         }),
//     }));

//     const handleElementClick = (index, element) => {
//         contextValue?.setSelectedIndex(index); 
//         contextValue?.setSelectedValue(element);
//     };

//     const handleDelete = (indexToDelete) => {
//         contextValue?.setFormElements((prev) =>
//             prev?.filter((_, index) => index !== indexToDelete)
//         );
//         contextValue?.setSelectedIndex(null);
//     };

//     return (
//         <div ref={drop} className='col-sm-8 p-2'>
//             <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
//                 {contextValue?.formElements?.length ? (
//                     contextValue?.formElements?.map((element, index) => (
//                         <DraggableElement
//                             key={element.id}
//                             index={index}
//                             element={element}
//                             moveElement={moveElement}
//                             onClick={() => handleElementClick(index, element)}
//                             onDelete={() => handleDelete(index)}
//                             isSelected={contextValue.selectedIndex === index}
//                             preview={contextValue.preview}
//                         />
//                     ))
//                 ) : (
//                     <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
//                         Drag element here
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// const DraggableElement = ({ index, element, moveElement, onClick, onDelete, isSelected, preview }) => {
//     const ref = React.useRef(null);

//     const [, drop] = useDrop({
//         accept: 'FORM_ELEMENT',
//         hover(item, monitor) {
//             if (!ref.current) {
//                 return;
//             }

//             const dragIndex = item.index; 
//             const hoverIndex = index;

//             if (dragIndex === hoverIndex) {
//                 return; 
//             }

//             const hoverBoundingRect = ref.current.getBoundingClientRect();
//             const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//             const clientOffset = monitor.getClientOffset();
//             const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//                 return;
//             }
//             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//                 return;
//             }

//             moveElement(dragIndex, hoverIndex);
//             item.index = hoverIndex;
//         },
//     });

//     const [{ isDragging }, drag] = useDrag({
//         type: 'FORM_ELEMENT',
//         item: { index },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(), 
//         }),
//     });

//     drag(drop(ref)); 

//     return (
//         <div
//             ref={ref}
//             className={`mb-3 ${isDragging ? 'opacity-50' : ''}`} 
//             onClick={onClick}
//         >
//             {isSelected && !preview ? (
//                 <ElementLayout data={element} onDelete={onDelete}>
//                     {component(element, preview)}
//                 </ElementLayout>
//             ) : (
//                 component(element, preview)
//             )}
//         </div>
//     );
// };

// export default Form;












// import React, { useContext } from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// import Header from './Header';
// import Name from './Name';
// import Email from './Email';
// import Phone from './Phone';
// import Address from './Address';
// import SubmitButton from './SubmitButton';
// import ElementLayout from './ElementLayout';
// import { UserContext } from '../../pages/formBuilder';

// const component = (element, preview) => {
//     switch (element?.name) {
//         case 'Header':
//             return <Header data={element} />;
//         case 'Name':
//             return <Name data={element} preview={preview} />;
//         case 'Email':
//             return <Email data={element} preview={preview} />;
//         case 'Phone':
//             return <Phone data={element} preview={preview} />;
//         case 'Address':
//             return <Address data={element} preview={preview} />;
//         case 'Submit':
//             return <SubmitButton data={element} />;
//         default:
//             return null;
//     }
// };

// const Form = () => {
//     const contextValue = useContext(UserContext);

//     const moveElement = (dragIndex, hoverIndex) => {
//         const updatedElements = [...contextValue.formElements];
//         const [draggedElement] = updatedElements.splice(dragIndex, 1);
//         updatedElements.splice(hoverIndex, 0, draggedElement);
//         contextValue.setFormElements(updatedElements);
//     };

//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: 'FORM_ELEMENT',
//         drop: (item) => {
//             if (!item.dragIndex && item.dragIndex !== 0) {
//                 const newItem = {
//                     ...item,
//                     id: Date.now(),
//                     title: item.name,
//                     style: {
//                         color: '#000000',
//                         fontSize: item.name === 'Header' ? '48' : '16',
//                         position: 'left',
//                     },
//                     type: item.name === 'Header' ? 'header' : item.name === 'Submit' ? 'button' : 'input',
//                 };

//                 const existingIndex = contextValue?.formElements?.findIndex(
//                     (element) => element.name === newItem?.name
//                 );

//                 if (existingIndex !== -1) {
//                     const updatedElements = [...contextValue?.formElements];
//                     updatedElements[existingIndex] = { ...updatedElements[existingIndex], ...newItem };
//                     contextValue?.setFormElements(updatedElements);
//                 } else {
//                     contextValue?.setFormElements((prev) => [...prev, newItem]);
//                 }
//             }
//         },
//         collect: (monitor) => ({
//             isOver: monitor?.isOver(),
//         }),
//     }));

//     const handleElementClick = (index, element) => {
//         contextValue?.setSelectedIndex(index);
//         contextValue?.setSelectedValue(element);
//     };

//     const handleDelete = (indexToDelete) => {
//         contextValue?.setFormElements((prev) =>
//             prev?.filter((_, index) => index !== indexToDelete)
//         );
//         contextValue?.setSelectedIndex(null);
//     };

//     return (
//         <div ref={drop} className='col-sm-8 p-2'>
//             <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
//                 {contextValue?.formElements?.length ? (
//                     contextValue?.formElements?.map((element, index) => (
//                         <DraggableElement
//                             key={element.id}
//                             index={index}
//                             element={element}
//                             moveElement={moveElement}
//                             onClick={() => handleElementClick(index, element)}
//                             onDelete={() => handleDelete(index)}
//                             isSelected={contextValue.selectedIndex === index}
//                             preview={contextValue.preview}
//                         />
//                     ))
//                 ) : (
//                     <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
//                         Drag element here
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const DraggableElement = ({ index, element, moveElement, onClick, onDelete, isSelected, preview }) => {
//     const ref = React.useRef(null);

//     const [, drop] = useDrop({
//         accept: 'FORM_ELEMENT',
//         hover(item, monitor) {
//             if (!ref.current) {
//                 return;
//             }

//             const dragIndex = item.index;
//             const hoverIndex = index;

//             if (dragIndex === hoverIndex) {
//                 return;
//             }

//             const hoverBoundingRect = ref.current?.getBoundingClientRect();
//             const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//             const clientOffset = monitor.getClientOffset();
//             const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//                 return;
//             }
//             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//                 return;
//             }

//             moveElement(dragIndex, hoverIndex);

//             item.index = hoverIndex;
//         },
//     });

//     const [{ isDragging }, drag] = useDrag({
//         type: 'FORM_ELEMENT',
//         item: { index, element },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     });

//     drag(drop(ref));

//     return (
//         <div
//             ref={ref}
//             className={`mb-3 ${isDragging ? 'opacity-50' : ''}`}
//             onClick={onClick}
//         >
//             {isSelected && !preview ? (
//                 <ElementLayout data={element} onDelete={onDelete}>
//                     {component(element, preview)}
//                 </ElementLayout>
//             ) : (
//                 component(element, preview)
//             )}
//         </div>
//     );
// };

// export default Form;













// Without element up or down drag and drop
// Without element up or down drag and drop
// Without element up or down drag and drop
// Without element up or down drag and drop
// Without element up or down drag and drop



// import React, { useContext } from 'react';
// import { useDrop } from 'react-dnd';

// import Header from './Header';
// import Name from './Name';
// import Email from './Email';
// import Phone from './Phone';
// import Address from './Address';
// import SubmitButton from './SubmitButton';
// import ElementLayout from './ElementLayout';
// import { UserContext } from '../../pages/formBuilder';

// const component = (element, preview) => {
//     switch (element?.name) {
//         case 'Header':
//             return <Header data={element}/>;
//         case 'Name':
//             return <Name data={element} preview={preview}/>;
//         case 'Email':
//             return <Email data={element} preview={preview}/>;
//         case 'Phone':
//             return <Phone data={element} preview={preview}/>;
//         case 'Address':
//             return <Address data={element} preview={preview}/>;
//         case 'Submit':
//             return <SubmitButton data={element} />;
//     }
// }

// const Form = () => {
//     const contextValue = useContext(UserContext);

//     const [{ isOver }, drop] = useDrop(() => ({
//         accept: 'FORM_ELEMENT',
//         drop: (item) => {
//             const newItem = {
//                 ...item,
//                 id: Date.now(),
//                 title: item.name,
//                 style: {
//                     color: '#000000',
//                     fontSize: item.name === 'Header' ? '48' : '16',
//                     position: 'left'
//                 },
//                 type: item.name === 'Header' ? 'header' : item.name === 'Submit' ? 'button' : 'input',
//             };

//             const existingIndex = contextValue?.formElements?.findIndex(
//                 (element) => element.name === newItem?.name
//             );

//             if (existingIndex !== -1) {
//                 const updatedElements = [...contextValue?.formElements];
//                 updatedElements[existingIndex] = { ...updatedElements[existingIndex], ...newItem };
//                 contextValue?.setFormElements(updatedElements);
//             } else {
//                 contextValue?.setFormElements((prev) => [...prev, newItem]);
//             }
//         },
//         collect: (monitor) => ({
//             isOver: monitor?.isOver(),
//         }),
//     }));

//     const handleElementClick = (index, element) => {
//         contextValue?.setSelectedIndex(index);
//         contextValue?.setSelectedValue(element);
//     };

//     const handleDelete = (indexToDelete) => {
//         contextValue?.setFormElements((prev) => prev?.filter((_, index) => index !== indexToDelete));
//         contextValue?.setSelectedIndex(null);
//     };

//     return (
//         <div ref={drop} className='col-sm-8 p-2'>
//             <div className={`p-2 bg-light h-100 rounded form-body ${isOver ? 'bg-success' : ''}`}>
//                 {contextValue?.formElements?.length ? (
//                     contextValue?.formElements?.map((element, index) => (
//                         <div
//                             key={element?.id}
//                             className='mb-3'
//                             onClick={() => handleElementClick(index, element)}
//                         >
//                             {contextValue?.selectedIndex === index && !contextValue?.preview ? (
//                                 <ElementLayout data={contextValue?.formElements} onDelete={() => handleDelete(index)}>
//                                     {component(element, contextValue?.preview)}
//                                 </ElementLayout>
//                             ) : (
//                                 component(element, contextValue?.preview)
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div className='h-100 fw-bold fs-4 font-monospace rounded d-flex align-items-center justify-content-center empty-element'>
//                         Drag element here
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Form;




