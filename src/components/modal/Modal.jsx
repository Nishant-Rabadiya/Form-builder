import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { UserContext } from '../../pages/formBuilder';
import { formMutation } from '../commonFunction';
import { sendFormBuilderData, updateForm } from '../../api/api';

function ConfirmModal() {
  const navigate = useNavigate();
  const contextValue = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const paramValue = searchParams?.get('id');

  const mutation = formMutation('formBuilder', paramValue ? updateForm : sendFormBuilderData);

  const handleClose = (value) => {
    contextValue?.setShowModal(false);

    if (contextValue?.formElements?.length) {
      if (paramValue) {
        mutation.mutate({
          id: paramValue,
          elements: contextValue?.formElements
        });
      } else {
        mutation.mutate({ elements: contextValue?.formElements });
        contextValue?.setFormElements([]);
      }
      toast.success('Form save successfully !');
    }

    (value !== 'yes') ? navigate('/') : "";
  };

  return (
      <Modal
        show={contextValue?.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='d-flex justify-content-between ailgn-items-center'>
          <Modal.Title>Save Form</Modal.Title>
          <button type="button" className='btn btn-outline-secondary' onClick={() => contextValue?.setShowModal(false)}>X</button>
        </Modal.Header>
        <Modal.Body className='fs-5'>
          Your form will be saved, Do you want to create another form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose('yes')}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmModal;


