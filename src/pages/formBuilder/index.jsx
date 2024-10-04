import React, { createContext, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSearchParams } from 'react-router-dom';

import Navbar from '../../components/FormBuilder/Navbar';
import LeftSidebar from '../../components/FormBuilder/LeftSidebar';
import RightSidebar from '../../components/FormBuilder/RightSidebar';
import Form from '../../components/FormBuilder/Form';
import { getFormBuilderData } from '../../api/api';
import ConfirmModal from '../../components/modal/Modal';
import { getFormData } from '../../components/commonFunction';

export const UserContext = createContext();

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const [preview, setPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [searchParams] = useSearchParams();
  const paramValue = searchParams?.get('id');

  const formData = getFormData('formBuilder', getFormBuilderData);

  useEffect(() => {
    if (paramValue) {
      const currentForm = formData?.find(form => form?.id === paramValue);
      if (currentForm) {
        const { elements } = currentForm;
        setFormElements(elements || []);
      }
    }
  }, [paramValue, formData]);

  const contextValue = {
    formElements,
    setFormElements,
    selectedIndex,
    setSelectedIndex,
    selectedValue,
    setSelectedValue,
    preview,
    setPreview,
    showModal,
    setShowModal
  };

  return (
      <UserContext.Provider value={contextValue}>
        <DndProvider backend={HTML5Backend}>
          <div className='main-section'>
            <Navbar />
            <div className='row form-builder-container'>
              <LeftSidebar preview={preview} />
              <Form />
              <RightSidebar preview={preview} />
            </div>
          </div>
        </DndProvider>
        <ConfirmModal />
      </UserContext.Provider>
  );
};

export default FormBuilder;



