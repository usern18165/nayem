import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';
import { useDispatch } from 'react-redux';


import "./EditCampaign.scss";

import { Countries } from "../../../shared";
import { EditCampaigns } from '../../../store/campaign/action'


const EditCampaign = ({ show, handleClose, campaign, setFormData }) => {

    const dispatch = useDispatch();

    const [geographyText, setGeographyText] = useState('');
    const [keyword, setKeyword] = useState('');

    const [geographySuggest, setGeographySuggest] = useState([]);
    const [toggleSuggestBox, setToggleSuggestBox] = useState(false);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [supportFormate, setSupportFormate] = useState({
        android: false,
        ios: false,
        windows: false,
        all: false
    });

    const imageArrayOne = ["First", "Second", "Third"];
    const imageArrayTwo = ["First", "Second", "Third"];
    const supportedImgFormat = ["jpg", "jpeg", "png"];

    const [imageData, setImageData] = useState(imageArrayOne);

    const taskType = [
        { label: "SOI", value: "soi" },
        { label: "DOI", value: "doi" },
        { label: "Form Submit", value: "form submit" },
        { label: "CC Submit", value: "cc submit" }
    ]



    // change data for edit
    const onInputChange = (e) => {

        setFormData({
            ...campaign,
            [e.target.name]: e.target.value
        });

    }

    // here, data change for geography suggest box
    const geographyChangeHandler = (e) => {

        setGeographyText(e.target.value);
        setToggleSuggestBox(true);

        const filterCountry = Countries?.filter((item) => item.label.toLowerCase().includes(e.target.value.toLowerCase()));
        setGeographySuggest(filterCountry);
    }


    //remove traffic type 
    const removeTrafficTypeHandler = (item) => {
        const filterData = campaign?.traffic_type.filter(type => type !== item);
        setFormData({
            ...campaign,
            ['traffic_type']: filterData
        });

    }


    //handle traffic type  
    const handleTrafficType = (e) => {

        const value = e.target.value;

        if (!campaign?.traffic_type.includes(value)) {
            setFormData({
                ...campaign,
                ['traffic_type']: [...campaign?.traffic_type, value]
            });
        }

    }


    // handle restricted key 
    const restrictedKeyChange = (e) => {

        if (e.key === 'Enter') {
            setKeyword('');

            // Add new restrict  
            if (!campaign?.restricted_keyword.includes(keyword.trim())) {
                setFormData({
                    ...campaign,
                    ['restricted_keyword']: [...campaign?.restricted_keyword, keyword.trim()]
                });
            }
        }

    }

    // remove restricted key
    const removeKeyRestrictedWord = (item) => {

        const filterData = campaign?.restricted_keyword?.filter(key => key !== item);
        setFormData({
            ...campaign,
            ['restricted_keyword']: filterData
        });

    }

    // add geography using suggest click
    const handleSuggestClick = (item) => {

        if (!campaign?.geography?.includes(item)) {
            setGeographyText('')
            setGeographySuggest([])
            setToggleSuggestBox(false);
            setFormData({
                ...campaign,
                ['geography']: [...campaign?.geography, item]
            });
        }

    }


    //remove geography from geography array  
    const removeGeographyHandler = (item) => {

        const filterData = campaign?.geography?.filter(country => country !== item);
        setFormData({
            ...campaign,
            ['geography']: filterData
        });

    }



    // device support change handler
    const onFormatSupportChangeHandler = (e) => {

        if (e.target.name === "all") {
            setToggleCheckBox(false);
        } else {
            if (!e.target.checked) {
                if (e.target.name == "windows" && supportFormate.windows && !supportFormate.ios && !supportFormate.android) {
                    setToggleCheckBox(false);
                } else if (e.target.name == "ios" && !supportFormate.windows && supportFormate.ios && !supportFormate.android) {
                    setToggleCheckBox(false);
                } else if (e.target.name == "android" && !supportFormate.windows && !supportFormate.ios && supportFormate.android) {
                    setToggleCheckBox(false);
                } else {
                    setToggleCheckBox(true);
                }

            } else {
                setToggleCheckBox(true);
            }
        }

        setFormData({
            ...campaign,
            ['device_type']: {
                ...campaign.device_type,
                [e.target.name]: e.target.checked
            }
        });

    }



    // update image for campaign
    const handleImageUpload = (e, item) => {

        let file = e.target.files[0];
        const fileReader = new FileReader();
        const splitFile = file?.type?.split("/")[1];

        if (supportedImgFormat.includes(splitFile)) {
            fileReader.onload = () => {
                const updatedImageArray = imageData?.map((element, index) => {
                    if (element === item) {
                        return fileReader.result;
                    }
                    return element;
                });

                setImageData(updatedImageArray);
            }

            if (file) {
                fileReader.readAsDataURL(file)
            }
        }

    }


    // handle submit 
    const handleSubmit = () => {

        dispatch(EditCampaigns(campaign));
        handleClose();

    }


    return (
        <div className='edit-campaign'>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
                className='campaign-edit-modal-sections'
            >
                <Modal.Title className='header-title'>Edit</Modal.Title>

                <Modal.Body className='edit-campaign-modal-body'>

                    <div className='campaign-modal-section'>
                        <div className='campaign-modal-section'>

                            <div className='campaigns-id'>
                                <label>Campaign ID</label>
                                <input name='campaign_id'
                                    defaultValue={campaign?.campaign_id || ''}
                                    onChange={onInputChange}
                                    type="number" />
                            </div>

                            <div className='campaigns-name'>
                                <label>Name</label>
                                <input name='name'
                                    onChange={onInputChange}
                                    defaultValue={campaign?.name || ''}
                                    type="text"
                                />
                            </div>

                            <div className='description'>
                                <label>Description</label>
                                <textarea name='description' defaultValue={campaign?.description || ''}
                                    onChange={onInputChange} type="text" />
                            </div>


                            <div className='geography'>
                                <label>Countries Allowed</label>

                                <div className='multi-select-sections'>

                                    <input name='geography'
                                        value={geographyText}
                                        type="text"
                                        onChange={geographyChangeHandler}
                                    />

                                    {geographySuggest.length > 0 && (
                                        <div
                                            className="suggest-box"
                                            style={{ display: toggleSuggestBox && geographyText.length > 0 ? "flex" : "none" }}
                                        // style={{ display: toggleSuggestBox ? "flex" : "none", }}
                                        >
                                            <div>
                                                {geographySuggest?.slice(0, 10)?.map((country, index) => (
                                                    <button
                                                        key={index}
                                                        className="suggest-box-search-btn"
                                                        onClick={() => handleSuggestClick(country.label)}
                                                    >
                                                        <ReactCountryFlag countryCode={country.code} svg />
                                                        <span className="suggest-box-line-climb">
                                                            {country.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {
                                        campaign?.geography?.map((item, index) => (
                                            <div key={index} className='single-item'>
                                                <span className='country-name'>{item}</span>
                                                <span className='geography-cross' onClick={() => removeGeographyHandler(item)}>x</span>
                                            </div>
                                        ))

                                    }


                                </div>


                            </div>



                            <div className='traffic-type'>
                                <label>Traffic Type</label>

                                <div className='multi-select-traffic'>

                                    {
                                        campaign?.traffic_type?.map((item, index) => (
                                            <div className='single-item' key={index}>
                                                <span className='traffic-name'>{item === 'mobile_ads' ? 'Mobile Ads' : item}</span>
                                                <span className='traffic-cross' onClick={() => removeTrafficTypeHandler(item)} >x</span>
                                            </div>
                                        ))
                                    }


                                    <select name='traffic_type' onChange={handleTrafficType}>
                                        <option>Select Traffic Type</option>
                                        <option value="contextual">Contextual</option>
                                        <option value="display">Display</option>
                                        <option value="search">Search</option>
                                        <option value="social">Social</option>
                                        <option value="mobile_ads">Mobile Ads</option>
                                        <option value="email">Email</option>
                                    </select>

                                </div>

                            </div>

                            <div className='rev-type'>
                                <label>Rev Type</label>
                                <select name='rev_type' onChange={onInputChange}>
                                    <option>{campaign?.rev_type}</option>
                                    {
                                        campaign?.rev_type === "fixed" ?
                                            <option className='percentage'>Percentage</option> :
                                            <option className='fixed'>Fixed</option>
                                    }
                                </select>
                            </div>

                            <div className='task-type'>
                                <label>Task Type</label>
                                <select name='task_type' onChange={onInputChange}>
                                    <option>{campaign?.task_type}</option>

                                    {
                                        taskType.map((item, index) => (
                                            !(item?.value === campaign?.task_type?.toLowerCase()) ?
                                                <option key={index} className={item.value} value={item.value}>{item.label}</option> : ""

                                        ))
                                    }


                                </select>
                            </div>

                            <div className='daily-cap'>
                                <label>Daily Cap</label>
                                <input name='daily_cap' type="number"
                                    defaultValue={campaign?.daily_cap || ''}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='rate'>
                                <label>Rate</label>
                                <input name='rate' type="number"
                                    defaultValue={campaign?.rate || ''}
                                    onChange={onInputChange}
                                />

                                <div className='usd-symbol'>USD</div>
                                <div className='dollar-symbol'>$</div>
                            </div>


                            <div className='expire-date'>
                                <label>Expire Date</label>

                                <input name='expire_date' type="text"
                                    defaultValue={campaign?.expire_date}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='tracking-date'>
                                <label>Tracking Type</label>

                                <select name='tracking_type' onChange={onInputChange}>
                                    <option>{campaign?.tracking_type}</option>
                                    <option className='manual' value="manual">Manual</option>
                                    <option className='server_to_server' value="Server to Server">Server to Server</option>
                                </select>
                            </div>

                            <div className='keyword-restrictions'>
                                <label>Restrictions Key</label>
                                {/* <textarea name='restricted_keyword' defaultValue={campaign?.restricted_keyword || ''}
                                    onChange={onInputChange} type="text" /> */}

                                <div className='multi-keyword-sections'>

                                    {
                                        campaign?.restricted_keyword?.map((item, index) => (
                                            <div key={index} className='single-item'>
                                                <span className='country-name'>{item}</span>
                                                <span className='geography-cross' onClick={() => removeKeyRestrictedWord(item)}>x</span>
                                            </div>
                                        ))

                                    }

                                    <input name='restricted_keyword'
                                        type="text"
                                        value={keyword || ''}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyDown={restrictedKeyChange}
                                    />



                                </div>

                            </div>

                            <hr />

                            {/* I will fix it later there is a on off issues */}
                            <div className='display-supported-sections'>

                                <h6>Device Type</h6>

                                <div className='display-supported'>

                                    <div className='android'>
                                        <input type="checkbox"
                                            disabled={(toggleCheckBox === '' && supportFormate.all) ? true : false}
                                            id="android" name="android" onChange={onFormatSupportChangeHandler} value="false" defaultChecked={campaign?.device_type?.android} />
                                        <label htmlFor="android">Android</label>
                                    </div>

                                    <div className='ios'>
                                        <input type="checkbox"
                                            disabled={(toggleCheckBox === '' && supportFormate.all) ? true : false}
                                            id="ios" name="ios" onChange={onFormatSupportChangeHandler} value="false" defaultChecked={campaign?.device_type?.ios} />
                                        <label htmlFor="ios">iOS</label>
                                    </div>

                                    <div className='windows'>
                                        <input type="checkbox"
                                            disabled={(toggleCheckBox === '' && supportFormate.all) ? true : false}
                                            id="windows"
                                            name="windows" onChange={onFormatSupportChangeHandler}
                                            defaultChecked={campaign?.device_type?.windows}
                                            value="false" />
                                        <label htmlFor="windows">Windows</label>
                                    </div>

                                    <div className='all'>
                                        <input type="checkbox"
                                            defaultChecked={campaign?.device_type?.all}
                                            // disabled={toggleCheckBox ? true : false}
                                            id="all" name="all" onChange={onFormatSupportChangeHandler} value="false" />
                                        <label htmlFor="all">All device operating systems allowed</label>
                                    </div>
                                </div>


                            </div>

                            <hr />

                            <div className='contextual'>
                                <label>Contextual URL</label>
                                <textarea name='contextual_url' defaultValue={campaign?.contextual_url || ''}
                                    onChange={onInputChange} type="text" />
                            </div>

                            <div className='display'>
                                <label>Display URL</label>
                                <textarea name='display_url' type="text"
                                    defaultValue={campaign?.display_url || ''}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='search-url'>
                                <label>Search URL</label>
                                <textarea name='search_url' type="text"
                                    defaultValue={campaign?.search_url || ''}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='social'>
                                <label>Social URL</label>
                                <textarea name='social_url' type="text"
                                    defaultValue={campaign?.social_url || ''}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='email'>
                                <label>Email URL</label>
                                <textarea name='email_url' type="text"
                                    defaultValue={campaign?.email_url || ''}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className='mobile-adss'>
                                <label>Mobile Ads URL</label>
                                <textarea name='mobile_ads_url' type="text"
                                    defaultValue={campaign?.mobile_ads_url || ''}
                                    onChange={onInputChange}
                                />
                            </div>


                            <div className='campaign-img-sections'>
                                <h6>Landing Page</h6>

                                <span className="campaign-img-section">

                                    {
                                        imageData?.map((item, index) => (
                                            // <div key={index} className={(validation[item] != item) ? 'single-image' : 'single-image border-red'}>
                                            <div key={index} className='single-image'>
                                                <input type="file" accept='.jpg, .jpeg, .png' name='thumb_img'
                                                    onChange={(e) => handleImageUpload(e, item)}
                                                />
                                                {
                                                    imageArrayTwo.includes(item) ? <p>Select({index + 1})</p> :
                                                        <img src={item} style={{ width: "100px" }} />
                                                }
                                            </div>
                                        ))
                                    }

                                </span>
                            </div>

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCampaign
