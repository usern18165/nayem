import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import "./style.scss"

const PasswordChangeModal = ({ show, handleClose, changePass, setChangePass, id, passwordChangeHandler }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleOnCheckbox = () => {
        setIsChecked(!isChecked);
    }


    return (

        <div className='modarator-password-change-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Title className='header-title'>Change Password</Modal.Title>

                <Modal.Body>

                    <div className='password-change-modal-main-section'>

                        {/* <div className='message-for-worng'>Old password won't match.</div> */}

                        <div className='new-pass-section'>
                            <label className='oldpass-label'>New Password</label>
                            <input
                                className='newpass-input'
                                type={isChecked ? "text" : "password"}
                                value={changePass?.newPassword}
                                onChange={(e) => {
                                    setChangePass({
                                        ...changePass,
                                        newPassword: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='confirm-pass-section'>
                            <label className='oldpass-label'>Confirm Password</label>
                            <input
                                className='confirm-pass-input'
                                type={isChecked ? "text" : "password"}
                                value={changePass?.confirmNewPassword}
                                onChange={(e) => {
                                    setChangePass({
                                        ...changePass,
                                        confirmNewPassword: e.target.value
                                    })
                                }}

                            />
                        </div>

                        <div className='show-pass-sections'>
                            <input
                                type="checkbox"
                                id="show"
                                checked={isChecked}
                                onChange={handleOnCheckbox}
                            /><label htmlFor="show">Show Password</label>
                        </div>

                    </div>

                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}
                    >Close</Button>
                    <Button
                        onClick={() => passwordChangeHandler(id)}
                        variant="primary">Submit</Button>

                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default PasswordChangeModal;
