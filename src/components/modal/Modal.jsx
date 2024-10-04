import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { UserContext } from '../../pages/formBuilder';
import { sendFormBuilderData, updateForm } from '../../api/api';
import { formMutation } from '../commonFunction';

function ConfirmModal() {
  const contextValue = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('id');

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
    <>
      <Modal
        show={contextValue.showModal}
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
    </>
  );
}

export default ConfirmModal;

