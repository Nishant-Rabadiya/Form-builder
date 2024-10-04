import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../pages/formBuilder';
import ElementConfiguration from '../formConfiguration/ElementConfiguration';
import { positionButton } from '../../@core/constants';

const RightSidebar = ({ preview }) => {
    const contextValue = useContext(UserContext);

    const handleChangeTitle = (text, value) => {
        const updatedStyle = { ...contextValue?.selectedValue?.style };
        const updatedSelectedValue = { ...contextValue?.selectedValue };
        
        switch (text) {
            case 'Text':
            updatedSelectedValue.title = value;
            break;
            case 'Color':
            updatedStyle.color = value;
            updatedSelectedValue.style = updatedStyle;
            break;
            case 'Font size':
            updatedStyle.fontSize = value;
            updatedSelectedValue.style = updatedStyle;
            break;
            default:
            break;
        }
        
        contextValue?.setSelectedValue(updatedSelectedValue);
        };

    const handlePosition = (position) => {
        const updatedStyle = { ...contextValue?.selectedValue?.style, position };
        contextValue?.setSelectedValue({ ...contextValue?.selectedValue, style: updatedStyle });
    };

    useEffect(() => {
        const findIndex = contextValue?.formElements?.findIndex((element) => element.id === contextValue?.selectedValue?.id);
        if (findIndex !== -1) {
            const updatedFormElements = [...contextValue?.formElements];
            updatedFormElements[findIndex] = contextValue?.selectedValue;
            contextValue.setFormElements(updatedFormElements);
        }
    }, [contextValue?.selectedValue]);

    return (
        <div className={`col-sm-2 p-2 ${preview && 'invisible'}`}>
            <div className='bg-light h-100 rounded'>
                <p className='text-center bg-dark text-light rounded-top py-1 pb-2 fw-bold'>
                    Element Configuration
                </p>
                {contextValue?.formElements?.length && contextValue?.selectedValue ? (
                    <>
                        <div className='px-2'>
                            <p className='element-configuration-header text-light-emphasis m-0 pb-1'>
                                General
                            </p>

                            <ElementConfiguration
                                text="Text"
                                value={contextValue?.selectedValue?.title}
                                type="text"
                                handleChangeTitle={handleChangeTitle}
                            />

                            <ElementConfiguration
                                text="Color"
                                value={contextValue?.selectedValue?.style?.color}
                                type="color"
                                handleChangeTitle={handleChangeTitle}
                            />
                        </div>

                        <div className='px-2 mt-3'>
                            <p className='element-configuration-header text-light-emphasis m-0 pb-1'>
                                Text Style
                            </p>

                            <ElementConfiguration
                                text="Font size"
                                value={contextValue?.selectedValue?.style?.fontSize}
                                type="number"
                                handleChangeTitle={handleChangeTitle}
                            />
                        </div>

                        <div className='px-2 mt-3'>
                            <p className='element-configuration-header text-light-emphasis m-0 pb-1'>
                                Settings
                            </p>

                            <div className='mt-1'>
                                <p className='element-header mb-1'>Position</p>
                                <div className='w-100 text-center'>
                                {positionButton.map((position, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePosition(position.toLowerCase())}
                                        className={`py-1 border border-secondary ${index === 0 ? 'rounded-start' : index === positionButton.length - 1 ? 'rounded-end' : ''} ${contextValue?.selectedValue?.style?.position === position.toLowerCase() ? 'bg-success text-light' : ''}`}
                                    >
                                        {position}
                                    </button>
                                ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default RightSidebar;














































// import React, { useContext, useEffect } from 'react';
// import { UserContext } from '../../pages/formBuilder';

// const RightSidebar = ({preview}) => {
//     const contextValue = useContext(UserContext);

//     const handleTextChangeValue = (e) => {
//         contextValue?.setSelectedValue({ ...contextValue?.selectedValue, title: e?.target?.value });
//     }

//     const handleColorChangeValue = (e) => {
//         contextValue?.setSelectedValue({ 
//             ...contextValue?.selectedValue, 
//             style: { 
//                 ...contextValue?.selectedValue?.style, 
//                 color: e?.target?.value 
//             } 
//         });
//     }

//     const handleFontChangeValue = (e) => { 
//         contextValue?.setSelectedValue({ 
//             ...contextValue?.selectedValue, 
//             style: { 
//                 ...contextValue?.selectedValue?.style,  
//                 fontSize: e?.target?.value
//             } 
//         });
//     };

//     const handlePosition = (position) => {
//         switch (position) {
//             case 'left':
//                 contextValue?.setSelectedValue({ 
//                     ...contextValue?.selectedValue, 
//                     style: { 
//                         ...contextValue?.selectedValue?.style, 
//                         position: 'left' 
//                     } 
//                 });
//                 break;
//             case 'center':
//                 contextValue?.setSelectedValue({ 
//                     ...contextValue?.selectedValue, 
//                     style: { 
//                         ...contextValue?.selectedValue?.style, 
//                         position: 'center' 
//                     } 
//                 });
//                 break;
//             case 'right':
//                 contextValue?.setSelectedValue({ 
//                     ...contextValue?.selectedValue, 
//                     style: { 
//                         ...contextValue?.selectedValue?.style, 
//                         position: 'right' 
//                     } 
//                 });
//                 break;
        
//             default:
//                 break;
//         }
//     }


//     useEffect(() => {
//         const findIndex = contextValue?.formElements?.findIndex((element) => element.id === contextValue?.selectedValue?.id);
//         if (findIndex !== -1) {
//             const updatedFormElements = [...contextValue?.formElements];  
//             updatedFormElements[findIndex] = contextValue?.selectedValue; 
    
//             contextValue.setFormElements(updatedFormElements);
//         }
//     }, [contextValue?.selectedValue]);
    

//     return (
//         <div className={`col-sm-2 p-2 ${preview && 'invisible'}`}>
//             <div className='bg-light h-100 rounded'>
//                 <p className='text-center bg-dark text-light rounded-top py-1 pb-2 fw-bold'>Element Configuration</p>
//                 {
//                     (contextValue?.formElements?.length && contextValue?.selectedValue) ?
                    
//                 (<>
//                         <div className='px-2'>
//                             <p className='element-configuration-header text-light-emphasis m-0 pb-1'>General</p>

//                             <div className='mt-1'>
//                                 <p className='element-header mb-1'>Text</p>
//                                 <input 
//                                     onChange={handleTextChangeValue} 
//                                     value={contextValue?.selectedValue?.title} 
//                                     className='w-100 border border-secondary rounded fs-6' 
//                                     type='text' />
//                             </div>

//                             <div className='mt-1'>
//                                 <p className='element-header mb-1'>Color</p>
//                                 <input 
//                                     onChange={handleColorChangeValue} 
//                                     value={contextValue?.selectedValue?.style?.color} 
//                                     className='w-100 border border-secondary rounded fs-6' 
//                                     type='color' />
//                             </div>
//                         </div>

//                         <div className='px-2 mt-3'>
//                                 <p className='element-configuration-header text-light-emphasis m-0 pb-1'>Text Style</p>

//                                 <div className='mt-1'>
//                                     <p className='element-header mb-1'>Font size</p>
//                                     <input 
//                                         onChange={handleFontChangeValue} 
//                                         value={contextValue?.selectedValue?.style?.fontSize} 
//                                         className='w-100 border border-secondary rounded fs-6' 
//                                         type='number' />
//                                 </div>
//                         </div>

//                         <div className='px-2 mt-3'>
//                                 <p className='element-configuration-header text-light-emphasis m-0 pb-1'>Settings</p>

//                                 <div className='mt-1'>
//                                     <p className='element-header mb-1'>Position</p>
//                                     <div className='w-100 text-center'>
//                                         <button 
//                                             onClick={() => handlePosition('left')} 
//                                             className={`py-1 border border-secondary rounded-start ${contextValue?.selectedValue?.style?.position === 'left' ? 'bg-success text-light' : ''}`}>
//                                             Left
//                                         </button>
//                                         <button 
//                                             onClick={() => handlePosition('center')} 
//                                             className={`py-1 border border-secondary ${contextValue?.selectedValue?.style?.position === 'center' ? 'bg-success text-light' : ''}`}>
//                                             Center
//                                         </button>
//                                         <button 
//                                             onClick={() => handlePosition('right')} 
//                                             className={`py-1 border border-secondary rounded-end ${contextValue?.selectedValue?.style?.position === 'right' ? 'bg-success text-light' : ''}`}>
//                                             Right
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                             </>) : ("")
//                 }

//             </div>
//         </div>
//     )
// };

// export default RightSidebar;







