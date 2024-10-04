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

    return (
        <div className='navbar-section d-flex justify-content-between p-2 bg-white'>
            <p className='m-0' role='button' onClick={() => navigate('/')}>Dashboard</p>

            <p className='m-0 fs-5 font-monospace'>Form Builder <span><i className='fa-solid fa-pen-fancy'></i></span></p>

            <div className='d-flex align-items-center gap-1'>
                <button
                    className='btn btn-success' 
                    data-bs-toggle='modal' data-bs-target='#staticBackdrop' 
                    type='button'
                    disabled={(!contextValue?.formElements.length || contextValue?.preview) ?? true}
                    onClick={() => contextValue?.setShowModal(true)}>
                    Save
                </button>

                <button
                    className={`btn btn-danger`}
                    type='button'
                    disabled={(!contextValue?.formElements?.length || contextValue?.preview) ?? true}
                    onClick={() => contextValue?.setFormElements([])}>
                    Clear
                </button>

                <button
                    className='btn btn-secondary'
                    disabled={(!contextValue?.formElements?.length) ?? true}
                    onClick={handlePreviewButton}>
                    {contextValue?.preview ? 'Back' :  'Preview' }
                </button>
            </div>
        </div>
    )
}

export default Navbar;
