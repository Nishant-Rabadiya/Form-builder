import React from 'react';
import FormElement from '../formElement/FormElement';

const LeftSidebar = ({ preview }) => {
  return (
    <div className={`col-sm-2 p-2 ${preview && 'invisible'}`}>
      <div className='bg-light h-100 rounded'>
        <p className='text-center bg-dark text-light rounded-top py-1 pb-2 fw-bold'>Form Element</p>

        <div className='px-2'>
          <p className='element-header m-0 pb-1'>TEXT</p>
          <FormElement icon='fa-solid fa-comment-dots' name='Header' />
        </div>

        <div className='px-2'>
          <p className='element-header m-0 pb-1 pt-3'>INPUT</p>
          <FormElement icon='fa-solid fa-user' name='Name' />
          <FormElement icon='fa-solid fa-envelope' name='Email' margin='mt-1' />
          <FormElement icon='fa-solid fa-phone' name='Phone' margin='mt-1' />
          <FormElement icon='fa-solid fa-address-card' name='Address' margin='mt-1' />
        </div>

        <div className='px-2'>
          <p className='element-header m-0 pb-1 pt-3'>Button</p>
          <FormElement icon='fa-regular fa-closed-captioning' name='Submit' />
        </div>

      </div>
    </div>
  );
}

export default LeftSidebar;

