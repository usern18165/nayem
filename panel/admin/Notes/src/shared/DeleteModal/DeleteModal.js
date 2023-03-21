import React from 'react'
import { Button, Modal } from 'react-bootstrap';

import "./style.scss";

const DeleteModal = ({ show, handleClose, id, deleteHandler, text }) => {
 
  return (
    <div className='delete-modal-section'>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
        size="sm"
      >
        <Modal.Title className='mt-2 text-center'>Delete</Modal.Title>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
          onClick={() =>deleteHandler(id)}
          variant="primary">Confirm</Button>
        </Modal.Footer>

      </Modal>
    </div>
  )
}

export default DeleteModal
