import React, { useState } from 'react';

import './style.scss';

import edit from "../../../assets/edit.png";
import EditModal from './EditModal/EditModal';
import axios from 'axios';
import { PROMOTIONS_BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

const AdDetails = ({ selectedPostData, setSelectedPostData }) => {

    const [show, setShow] = useState(false);
    const [type, setType] = useState('');

    const [formdata, setFormdata] = useState({
        add_type: '',
        adUrl: '',
        adTitle: '',
        description: '',
        gender: ''
    });

    const handleClose = () => {
        setType('');
        setShow(false);
    }
    const hadleShow = (type) => {
        setType(type)
        setShow(true);
    }

    const dateConverver = (currentDate) => {

        const localDate = new Date(currentDate);
        const localDateString = localDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });


        const localTimeString = localDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        // console.log(localDateString, localTimeString);
        const resultData = localDateString + ' ' + localTimeString;
        return resultData;

    }

    //change updated input value
    const inputChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }



    const updateHandler = (id) => {
        console.log(id, "id is clicked .");
        console.log(type, "id is clicked .");

        let body = {};
        if (type === "ads_type") {
            body = { add_type: formdata?.add_type }
        } else if (type === "title") {
            body = { adTitle: formdata?.adTitle }
        } else if (type === 'ads_url') {
            body = { adUrl: formdata?.adUrl }
        } else if (type === 'description') {
            body = { description: formdata?.description }
        } else if (type === 'gender') {
            body = { gender: formdata?.gender }
        }

        axios.put(`${PROMOTIONS_BACKEND_URL}/add/update-ads-by-admin/${id}`, body,
            { headers: adminHeader() }).then(({ data }) => {
                console.log(data?.data, "response data ");
                setSelectedPostData([data?.data]);
                handleClose();
            }).catch((err) => {
                console.log("Something went wrong!", err);
            })



    }



    return (
        <div className="ads-details">

            {selectedPostData.map((selectedPostData, index) => (


                <div className='details' key={index} >


                    <div>
                        <strong>Post Id: </strong>
                        <a style={{ textDecoration: "none" }} target="_blanck" href={`http://localhost:3000/${selectedPostData?.userName}/timeline?post=${selectedPostData?.postId}`} >{selectedPostData?.postId}</a>
                    </div>

                    <div className='category'>
                        <strong>Category: </strong>  {selectedPostData?.category}
                    </div>

                    <div className='ads-type'>

                        <span>
                            <strong>Add Type: </strong> <span className='type'> {selectedPostData?.add_type}</span>
                        </span>

                        <span className='edit-section'>
                            <img className='edit-btn' src={edit} alt="edit"
                                onClick={() => hadleShow('ads_type')}
                            />
                        </span>

                    </div>

                    <div className='ads-titles'>
                        <span className='a-title'>
                            <strong>Ads Title: </strong> <span className='title'> {selectedPostData?.adTitle}</span>
                        </span>
                        <span className='edit-section'>
                            <img className='edit-btn' src={edit} alt="edit"
                                onClick={() => hadleShow('title')}
                            />
                        </span>

                    </div>

                    <div className='ads-url'>
                        <span className='url'>
                            <strong>Ads Url: </strong>
                            <a style={{ textDecoration: "none" }} target="_blanck" href={selectedPostData?.adUrl}>
                                {selectedPostData?.adUrl}
                            </a>
                        </span>

                        <span className='edit-section'>
                            <img className='edit-btn' src={edit} alt="edit"
                                onClick={() => hadleShow('ads_url')}
                            />
                        </span>

                    </div>

                    <div className='ads-description'>
                        <span className='ads-descriptions'>
                            <strong>Descriptions: </strong>  <span className='description'>{selectedPostData?.description}</span>
                        </span>
                        <span className='edit-section'>
                            <img className='edit-btn' src={edit} alt="edit"
                                onClick={() => hadleShow('description')}
                            />
                        </span>

                    </div>
                    <div className='ads-gender'>
                        <span>
                            <strong>Gender: </strong>  <span className='gender'> {selectedPostData?.gender}</span>
                        </span>

                        <span className='edit-section'>
                            <img className='edit-btn' src={edit} alt="edit"
                                onClick={() => hadleShow('gender')}
                            />
                        </span>


                    </div>

                    <div className='ads-age'>
                        <strong>Age: </strong>  {selectedPostData?.age}
                    </div>

                    <div>
                        <strong>Target Audience: </strong>  {selectedPostData?.target_people}
                    </div>

                    <div>
                        <strong>Budgest: </strong>  ${selectedPostData?.budget}
                    </div>

                    <div>
                        <strong>Vat: </strong>  ${selectedPostData?.totatlVat}
                    </div>

                    <div>
                        <strong>Start Date: </strong>  {dateConverver(selectedPostData?.createdAt)}
                    </div>

                    <div className='days'>
                        <strong>Total Day: </strong>  {selectedPostData?.days}
                    </div>

                </div>

            ))}

            <div className='edit-sections'>

                <EditModal
                    show={show}
                    handleClose={handleClose}
                    selectedPostData={selectedPostData}
                    type={type}
                    inputChange={inputChange}
                    updateHandler={updateHandler}
                />

            </div>

        </div>
    )
}

export default AdDetails
