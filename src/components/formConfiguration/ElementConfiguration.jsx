import React from 'react';

const ElementConfiguration = ({ text, value, type, handleChangeTitle }) => {

    return (
        <div className='mt-1'>
            <p className='element-header mb-1'>{text}</p>
            <input
                className='w-100 border border-secondary rounded fs-6'
                value={value}
                onChange={(e) => handleChangeTitle(text, e?.target?.value)}
                type={type}
            />
        </div>
    );
};

export default ElementConfiguration;
























// import React, { useContext } from 'react';
// import { UserContext } from '../../pages/formBuilder';

// const ElementConfiguration = ({ text, type, value }) => {
//     const contextValue = useContext(UserContext);

//     const handleChangeValue = (e) => {
//         const newValue = e.target.value;

//         switch (text) {
//             case 'Color':
//                 contextValue.setStyle({ ...contextValue.style, color: newValue });
//                 break;
//             case 'Font size':
//                 contextValue.setStyle({
//                     ...contextValue.style,
//                     fontSize: (newValue >= 48) ? '48px' : (newValue < 15) ? '15px' : newValue + 'px'
//                 });
//                 break;
//             default:
//                 break;
//         }
//     };

//     return (
//         <div className='mt-1'>
//             <p className='element-header mb-1'>{text}</p>
//             <input
//                 className='w-100 border border-secondary rounded fs-6'
//                 value={value}
//                 onChange={handleChangeValue}
//                 type={type}
//             />
//         </div>
//     );
// };

// // export default ElementConfiguration;
















