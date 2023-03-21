import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import "./style.scss"

const ModaratorUpdateModal = ({ show, handleClose, items, inputChange, updateHandler }) => {


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

    return (

        <div className='modarator-update-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >

                <Modal.Title className='header-title'>Update Modarator</Modal.Title>

                <Modal.Body>

                    <div className='modarator-update-modal-main-setions'>

                        <div className='role-sections'>
                            <label className='role-label'>Update Role</label>

                            <select name='role'
                                onChange={inputChange}
                            >
                                <option>{items?.role}</option>
                                {
                                    roleItem?.map((roleType, index) =>
                                        <option value={roleType.value} key={index}>{roleType.name}</option>
                                    )
                                }
                            </select>

                        </div>

                        <div className='update-name-sections'>
                            <label className='update-name-label'>Name</label>
                            <input
                                onChange={inputChange}
                                name='name'
                                type="text"
                                className='update-name-modal'
                                defaultValue={items?.name ? items?.name : ''}
                            />
                        </div>

                        <div className='update-username-sections'>
                            <label className='update-username-label'>Username</label>
                            <input
                                onChange={inputChange}
                                name='username'
                                type="text"
                                className='update-username-modal'
                                defaultValue={items?.username ? items?.username : ''}
                            />
                        </div>

                        <div className='update-eamil-sections'>
                            <label className='update-eamil-label'>Email</label>
                            <input
                                onChange={inputChange}
                                name="email"
                                type="text"
                                className='update-eamil-modal'
                                defaultValue={items?.email ? items?.email : ''}
                            />
                        </div>

                        <div className='update-phone-sections'>
                            <label className='update-phone-label'>Phone</label>
                            <input
                                onChange={inputChange}
                                name='phone'
                                type="number"
                                className='update-phone-modal'
                                defaultValue={items?.phone ? items?.phone : ''}
                            />
                        </div>


                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        onClick={() => updateHandler(items?._id)}
                        variant="primary">Update</Button>

                </Modal.Footer>


            </Modal>
        </div>
    )
}

export default ModaratorUpdateModal
