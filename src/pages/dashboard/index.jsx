import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteForm, getFormBuilderData } from '../../api/api';
import { formMutation, getFormData } from '../../components/commonFunction';

const Dashboard = () => {
    const navigate = useNavigate();

    const formData = getFormData('formBuilder', getFormBuilderData);
    const mutation = formMutation('formBuilder', deleteForm);

    const handleDeleteFormButton = (id) => {
        const userConfirmation = window.confirm('Are you sure you want to delete this form?');
        userConfirmation ? mutation.mutate(id) ?? toast.success('Form deleted successfully !') : '';
    };

    const handleEditFormButton = (id) => {
        const editForm = formData?.find(form => form?.id === id);
        navigate(`/formbuilder?id=${editForm?.id}`);
    }

    return (
        <div>
            <div className='navbar d-flex justify-content-end p-3'>
                <button className='navbar-create-button' onClick={() => navigate('/formbuilder')}>Create</button>
            </div>

            <div className='form-list-section px-3'>
                <h1 className='mb-3'>All forms</h1>
                <div className='form-list d-flex'>
                    {formData?.length ? (
                        formData?.map((form) => (
                            <div className='list d-flex justify-content-between mb-2' key={form?.id}>
                                <div className='d-flex align-items-center'>
                                    <p className='list-icon m-1 px-1'>
                                        <i className='fa-regular fa-rectangle-list'></i>
                                    </p>
                                    <p className='list-title m-0 '>Form <span className='text-secondary fs-6'>{form?.id}</span></p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button className='edit-button' onClick={() => handleEditFormButton(form?.id)}>Edit</button>
                                    <button className='delete-button' onClick={() => handleDeleteFormButton(form?.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='h-100 d-flex align-items-center font-monospace fs-5'>No form created yet!</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;