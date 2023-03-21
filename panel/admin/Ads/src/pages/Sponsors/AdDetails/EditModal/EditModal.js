import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

import "./style.scss";

const EditModal = ({ show, handleClose, selectedPostData, type, inputChange, updateHandler }) => {


    const [adsType, setAdsType] = useState([
        { name: 'Views', value: "views" },
        { name: 'Clicks', value: "clicks" },
        { name: 'Reactions', value: "reactions" },
        { name: 'Comments', value: "comments" },
        { name: 'Shares', value: "shares" },
        { name: 'Sales', value: "sales" }
    ]);

    const [gender, setGender] = useState([
        { name: 'All', value: "ALL" },
        { name: 'Male', value: "MALE" },
        { name: 'Female', value: "FEMALE" },
        { name: 'Others', value: "OTHERS" }
    ]);



    return (
        <div className='update-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Title className='header-title'>Update ads</Modal.Title>

                <Modal.Body>

                    <div className='ads-update-modal-main-setions'>


                        {
                            (type === "ads_type") &&
                            <div className='ads-category'>
                                <label className='ads-title-label'><strong>Add Type</strong></label>
                                <select
                                    name='add_type'
                                    onChange={inputChange}
                                >
                                    <option>{selectedPostData[0]?.add_type}</option>
                                    {
                                        adsType?.map((type, index) =>
                                            <option value={type.value} key={index}>{type.name}</option>
                                        )

                                    }
                                </select>
                            </div>

                        }

                        {
                            (type === "title") &&
                            <div className='ads-titles'>
                                <label className='ads-title-label'><strong>Ads Title</strong></label>
                                <textarea type="text"
                                    name='adTitle'
                                    onChange={inputChange}
                                    defaultValue={selectedPostData[0]?.adTitle ? selectedPostData[0]?.adTitle : ''}
                                />
                            </div>
                        }

                        {
                            (type === "ads_url") &&
                            <div className='ads-url'>
                                <label className='ads-url-label'><strong>Ads URL</strong></label>
                                <textarea type="text" name='adUrl'
                                    onChange={inputChange}
                                    defaultValue={selectedPostData[0]?.adUrl ? selectedPostData[0]?.adUrl : ''}
                                />
                            </div>

                        }

                        {

                            (type === "description") &&
                            <div className='ads-description'>
                                <label className='ads-description-label'><strong>Ads Description</strong></label>
                                <textarea
                                    name='description'
                                    onChange={inputChange}
                                    defaultValue={selectedPostData[0]?.description ? selectedPostData[0]?.description : ''}
                                />
                            </div>
                        }

                        {
                            (type === 'gender') &&
                            <div className='ads-gender'>
                                <label className='ads-gender-label'><strong>Gender</strong></label>

                                <select
                                    name='gender'
                                    onChange={inputChange}
                                >
                                    <option>{selectedPostData[0]?.gender}</option>
                                    {
                                        gender.map((gender, index) =>
                                            <option value={gender.value} key={index}>{gender.name}</option>
                                        )
                                    }
                                </select>

                            </div>
                        }


                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => updateHandler(selectedPostData[0]?._id)} >Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditModal;

