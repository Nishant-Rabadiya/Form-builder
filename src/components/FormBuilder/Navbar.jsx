import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../pages/formBuilder';

const Navbar = () => {
    const navigate = useNavigate();
    const contextValue = useContext(UserContext);

    const handlePreviewButton = () => {
        if (contextValue?.formElements?.length) {
            contextValue?.setPreview(prev => !prev);
            contextValue?.setSelectedValue(null);
        }
    }

    const buttons = [
        {
            text: 'Save',
            className: 'btn-success',
            onClick: () => contextValue?.setShowModal(true),
            disabled: !contextValue?.formElements.length || contextValue?.preview,
        },
        {
            text: 'Clear',
            className: 'btn-danger',
            onClick: () => contextValue?.setFormElements([]),
            disabled: !contextValue?.formElements.length || contextValue?.preview,
        },
        {
            text: contextValue?.preview ? 'Back' : 'Preview',
            className: 'btn-secondary',
            onClick: handlePreviewButton,
            disabled: !contextValue?.formElements.length,
        },
    ];

    return (
        <div className='navbar-section d-flex justify-content-between p-2 bg-white'>
            <p className='m-0' role='button' onClick={() => navigate('/')}>Dashboard</p>

            <p className='m-0 fs-5 font-monospace'>Form Builder <span><i className='fa-solid fa-pen-fancy'></i></span></p>

            <div className='d-flex align-items-center gap-1'>

                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={`btn ${button.className}`}
                        type='button'
                        disabled={button.disabled}
                        onClick={button.onClick}
                    >
                        {button.text}
                    </button>
                ))}

            </div>
        </div>
    )
}

export default Navbar;
