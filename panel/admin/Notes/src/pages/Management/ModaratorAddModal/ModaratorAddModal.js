import React, { useState } from 'react';

import './style.scss';
import { Button, Modal } from 'react-bootstrap';

const ModaratorAddModal = ({
    show,
    handleClose,
    setModaratorAdd,
    modaratorAdd,
    SaveHandler
}) => {

    const [isChecked, setIsChecked] = useState(false);

    const [roleItem, setRoleItem] = useState([
        { name: 'Dashboard', value: 'dashboard' },
        { name: 'Notice', value: 'notice' },
        { name: 'User', value: 'user' },
        { name: 'Ads', value: 'ads' },
        { name: 'Mail', value: 'mail' },
        { name: 'Chat', value: 'modarator' },
        { name: 'Report', value: 'report' },
        { name: 'Recycle', value: 'recycle' },
        { name: 'Notes', value: 'notes' },
        { name: 'Restrictions', value: 'restrictions' },
        { name: 'Ads Rate', value: 'adsRate' },
    ])



    const handleOnCheckbox = () => {
        setIsChecked(!isChecked);
    };


    return (
        <div className='modarator-adds-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >

                <Modal.Title className='header-title'>Add Modarator</Modal.Title>

                <Modal.Body>

                    <div className='management-modal-section'>


                        <div className='role-sections'>
                            <label className='role-label'>Select Role</label>

                            <select onChange={(e) => {
                                setModaratorAdd({
                                    ...modaratorAdd,
                                    role: e.target.value
                                })
                            }} name='role'>
                                <option>Select Role</option>
                                {
                                    roleItem?.map((roleType, index) =>
                                        <option value={roleType?.value} key={index}>{roleType.name}</option>
                                    )
                                }
                            </select>

                        </div>




                        <div className='name-sections'>
                            <label className='name-label'>Name</label>
                            <input
                                type="text"
                                className='name-input-field'
                                value={modaratorAdd?.name}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </div>


                        <div className='username-sections'>
                            <label className='username-label'>User Name</label>
                            <input
                                type="text"
                                className='username-input-field'
                                value={modaratorAdd?.username}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        username: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='phone-sections'>
                            <label className='phone-label'>Phone</label>
                            <input
                                type="number"
                                className='phone-input-field'
                                value={modaratorAdd?.phone}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='email-sections'>
                            <label className='email-label'>Email</label>
                            <input
                                type="text"
                                className='email-input-field'
                                value={modaratorAdd?.email}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='password-sections'>
                            <label className='password-label'>Password</label>
                            <input
                                type={isChecked ? "text": "password" }
                                className='password-input-field'
                                value={modaratorAdd?.password}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        password: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='c-password-sections'>
                            <label className='c-password-label'>Confirm Password</label>
                            <input
                                type={isChecked ? "text" : "password"}
                                className='c-password-input-field'
                                value={modaratorAdd?.confirmPassword}
                                onChange={(e) => {
                                    setModaratorAdd({
                                        ...modaratorAdd,
                                        confirmPassword: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='show-pass-sections'>
                            <input
                                type="checkbox"
                                id='show'
                                checked={isChecked}
                                onChange={handleOnCheckbox}
                            /> <label htmlFor="show">Show Password</label>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button onClick={SaveHandler} variant="primary">Submit</Button>

                </Modal.Footer>

            </Modal>

        </div>
    )
}

export default ModaratorAddModal;
