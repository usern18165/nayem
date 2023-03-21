import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import './style.scss';

const Rejection = ({ show, handleClose, report, setReport, rejectedAds, id, postId }) => {


  const onInputChange = (e) => {
    setReport(e.target.value);
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
      >
        <Modal.Title className='header-title'>Rejected</Modal.Title>

        <Modal.Body>
          <div className='rejected-modal-main-sections'>

            <div className='report-sections'>
              <label className="report-label">Report</label>
              <textarea
                name="report"
                className="report-field"
                onChange={onInputChange}
              />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => rejectedAds(id,postId)}>Submit</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>

      </Modal>
    </div>
  )
}

export default Rejection
