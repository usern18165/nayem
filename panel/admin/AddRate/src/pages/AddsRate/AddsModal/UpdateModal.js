import React from 'react'

import { Button, Modal } from 'react-bootstrap';

const UpdateModal = ({ onInputChange, items, show, handleClose, updateHandler, filterValidation }) => {

    return (
        <div className='update-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                {/* <Modal.Header closeButton> */}
                <Modal.Title className='header-title'>Update Price Rate</Modal.Title>
                {/* </Modal.Header> */}
                <Modal.Body>



                    <div className="add-modal-main-section">

                        <div className='country-sections'>
                            <label className="country-label">Country</label>
                            <input
                                // maxLength="66"
                                readOnly
                                type="text"
                                className="country-input-field"
                                value={items?.country ? items?.country : ''}
                            />
                        </div>

                        <div className='state-sections'>
                            <label className="state-label">State</label>
                            <input
                                // maxLength="66"
                                readOnly
                                type="text"
                                className="state-input-field"
                                value={items?.country_state == null ? '' : items?.country_state}
                            />
                        </div>

                        <div className='city-sections'>
                            <label className="state-label">City</label>
                            <input
                                // maxLength="66"
                                readOnly
                                type="text"
                                className="city-input-field"
                                value={items?.city ? items?.city : ' '}
                            />
                        </div>

                        <div className='city-sections'>
                            <label className="state-label">Category Type</label>
                            <input
                                // maxLength="66"
                                readOnly
                                type="text"
                                className="city-input-field"
                                value={items?.category_type ? items?.category_type : ''}
                            />
                        </div>

                        <div className='price-per-goals-sections'>
                            <label className="state-label">Price Per Goals</label>
                            <input
                                // maxLength="66"
                                type="number"
                                name='price_per_goals'
                                className="price-per-goals-input-field"
                                defaultValue={items?.price_per_goals ? items?.price_per_goals : ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='time-per-goals-sections'>
                            <label className="state-label">Time Per Goals</label>
                            <input
                                // maxLength="66"
                                type="number"
                                name='time_per_goals'
                                className="time-per-goals-input-field"
                                defaultValue={items?.time_per_goals ? items?.time_per_goals : ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='vat-sections'>
                            <label className='vat-label'>Vat(%)</label>
                            <input
                                name='vat'
                                className={filterValidation.vat ? 'vat-input-field bg' : 'vat-input-field' }
                                type="number"
                                defaultValue={items?.vat}
                                onChange={onInputChange}
                            />

                            <div className='usd-symbol'>USD</div>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => updateHandler(items?._id)} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default UpdateModal
