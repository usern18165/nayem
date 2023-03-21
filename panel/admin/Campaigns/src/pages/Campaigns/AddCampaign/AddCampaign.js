import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import ReactCountryFlag from "react-country-flag";

import "./AddCampaign.scss";

import { Countries } from "../../../shared"
import { AddCampaign as AddCamp } from '../../../store/campaign/action';


const AddCampaigns = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { campaigns } = useSelector(state => state.campaign);

    const [formData, setFormData] = useState({
        offer: false,
        status: 0
    });
    const [supportFormate, setSupportFormate] = useState({
        android: false,
        ios: false,
        windows: false,
        all: false
    });


    const [geography, setGeography] = useState([]);
    const [geographyText, setGeographyText] = useState('');
    const [toggleSuggestBox, setToggleSuggestBox] = useState(false);

    const [restrictedKey, setRestrictedKey] = useState([]);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [geographySuggest, setGeographySuggest] = useState([]);
    const [trafficType, setTrafficType] = useState([]);

    // data validation 
    const [validation, setValidation] = useState({})

    // url validation
    const [urlValidity, setUrlValidity] = useState({});
    const [noUrlSet, setNoUrlSet] = useState(false);

    // image validation 
    const [firstRender, setFirstRender] = useState(true);
    const [imageValidity, setImageValidity] = useState(false);

    const imageArrayOne = ["First", "Second", "Third"];
    const imageArrayTwo = ["First", "Second", "Third"];
    const supportedImgFormat = ["jpg", "jpeg", "png"];

    // this array for traffic type options
    const [traffic_type, setTraffic_type] = useState([
        { value: "contextual", label: "Contextual" },
        { value: "display", label: "Display" },
        { value: "search", label: "Search" },
        { value: "mobile_ads", label: "Mobile Ads" },
        { value: "email", label: "Email" },
    ]);

    const [imageData, setImageData] = useState(imageArrayOne);


    // change geography for suggest box
    const geographyChangeHandler = (e) => {

        setGeographyText(e.target.value);
        setToggleSuggestBox(true);

        const filterCountry = Countries?.filter((item) => item.label.toLowerCase().includes(e.target.value.toLowerCase()));
        setGeographySuggest(filterCountry);
    }

    // add geography using suggest click
    const handleSuggestClick = (item) => {

        if (!geography.includes(item)) {
            setGeographyText('')
            setGeography([...geography, item]);
            setGeographySuggest([])
            setToggleSuggestBox(false);
        }

    }

    //Handle traffic type  
    const handleTrafficType = (e) => {

        const value = e.target.value;

        if (!trafficType.includes(value)) {
            setTrafficType([...trafficType, e.target.value]);
            const filterData = traffic_type.filter(item => item.value !== e.target.value);
            console.log(filterData, "filter data ");
            setTraffic_type(filterData)
        }


    }

    //remove traffic type 
    const removeTrafficTypeHandler = (item) => {
        const filterData = trafficType.filter(type => type !== item);
        setTrafficType(filterData);
        setTraffic_type([...traffic_type, { label: item, value: item }]);
    }

    // here we change all data
    const onInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }


    //remove geography from geography array  
    const removeGeographyHandler = (item) => {
        const filterData = geography.filter(country => country !== item);
        setGeography(filterData);

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

        setSupportFormate({
            ...supportFormate,
            [e.target.name]: e.target.checked
        });

    }

    // handle restricted keyword
    const restrictedKeyChange = (e) => {

        if (e.key === 'Enter' && formData.restricted_keyword && !restrictedKey.includes(formData.restricted_keyword.trim())) {
            setRestrictedKey([...restrictedKey, formData.restricted_keyword.trim()])
            setFormData({
                ...formData,
                ['restricted_keyword']: ''
            });
        }
    }

    //handle remove keyword
    const removeRestrictedKey = (item) => {
        const filterData = restrictedKey.filter(country => country !== item);
        setRestrictedKey(filterData);
    }

    // handle upload image
    const handleImageUpload = (e, item) => {

        let file = e.target.files[0];
        const fileReader = new FileReader();
        const splitFile = file?.type?.split("/")[1];

        if (supportedImgFormat.includes(splitFile)) {
            fileReader.onload = () => {
                const updatedImageArray = imageData.map((element, index) => {
                    if (element === item) {
                        return fileReader.result;
                    }
                    return element;
                });
                setFirstRender(true);
                setImageValidity(true);
                setImageData(updatedImageArray);
            }

            if (file) {
                fileReader.readAsDataURL(file)
            }

        }

    }

    // it checked white space 
    const isValidUrl = urlString => {

        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

        return !!urlPattern.test(urlString);
    }

    // this object used as flag 
    let dataValidation = {
        campaign_id: false,
        name: false,
        description: false,
        rev_type: false,
        task_type: false,
        daily_cap: false,
        rate: false,
        tracking_type: false,
        device_type: false,
        contextual_url: false,
        display_url: false,
        search_url: false,
        social_url: false,
        email_url: false,
        mobile_ads_url: false,
        geography: false,
        traffic_type: false,
        keyword: false
    };


    // url validations for warning users 
    let isUrlValid = {
        contextual_url: '',
        display_url: '',
        search_url: '',
        social_url: '',
        email_url: '',
        mobile_ads_url: ''
    }

    // restore data as initial state
    const restoreData = () => {
        setFormData({});
        setGeography([]);
        setTrafficType([]);
        setImageData(imageArrayOne);
        setNoUrlSet(false);
        setRestrictedKey([]);
        setImageValidity(false);
        setValidation({ ...validation, dataValidation });
        // setFirstRender(true);
    }

    // handle submit 
    const handleSubmit = () => {

        let urlValidation = false;
        let deviceTypeValidation = true;
        let isAnyInvalidUrl = false;

        // This is our valid body
        const body = {
            id: campaigns.length + 1,
            ...formData,
            geography,
            traffic_type: trafficType,
            device_type: supportFormate,
            imageData,
            restricted_keyword: restrictedKey
        }


        // url validations 
        if (formData?.contextual_url || formData?.display_url
            || formData?.search_url || formData?.social_url
            || formData?.email_url || formData?.mobile_ads_url) {

            // this variable is use as flag to check any url is valid or not
            let flag = false;

            if (formData?.contextual_url) {
                const context = isValidUrl(formData?.contextual_url);
                dataValidation['contextual_url'] = context;

                if (!context) {
                    isUrlValid['contextual_url'] = true;
                    flag = true;
                }
            }

            if (formData?.display_url) {
                const display = isValidUrl(formData?.display_url);
                dataValidation['display_url'] = display;

                if (!display) {
                    isUrlValid['display_url'] = true;
                    flag = true;
                }

            }

            if (formData?.search_url) {
                const search = isValidUrl(formData?.search_url);
                dataValidation['search_url'] = search;

                if (!search) {
                    isUrlValid['search_url'] = true;
                    flag = true;
                }

            }

            if (formData?.social_url) {
                const social = isValidUrl(formData?.social_url);
                dataValidation['social_url'] = social;

                if (!social) {
                    isUrlValid['social_url'] = true;
                    flag = true;
                }

            }

            if (formData?.email_url) {
                const email = isValidUrl(formData?.email_url);
                dataValidation['email_url'] = email;

                if (!email) {
                    isUrlValid['email_url'] = true;
                    flag = true;
                }
            }

            if (formData?.mobile_ads_url) {
                const mobile_ads = isValidUrl(formData?.mobile_ads_url);
                dataValidation['mobile_ads_url'] = mobile_ads;

                if (!mobile_ads) {
                    isUrlValid['mobile_ads_url'] = true;
                    flag = true;
                }
            }

            // this is for url changes 
            urlValidation = true;

            // all data validation
            setValidation({ ...validation, dataValidation });
            // only for url validation
            setUrlValidity({ ...urlValidity, isUrlValid });

            if (flag) {
                isAnyInvalidUrl = true;
            }

        } else { // there is no url
            setNoUrlSet(true);
        }


        // device type validation 
        if (toggleCheckBox === supportFormate.all) {
            deviceTypeValidation = false;
            dataValidation['device_type'] = true;
            setValidation({ ...validation, dataValidation })
        }

        // if matches all conditions 
        if (formData?.campaign_id && formData?.name &&
            formData?.description && formData?.rev_type && formData?.task_type
            && formData?.daily_cap && formData?.rate && formData?.tracking_type
            && urlValidation && deviceTypeValidation && geography.length > 0
            && trafficType.length > 0 && imageValidity) {


            // at least one url is stayed 
            if (dataValidation?.contextual_url || dataValidation?.display_url
                || dataValidation?.search_url || dataValidation?.social_url
                || dataValidation?.email_url || dataValidation?.mobile_ads_url) {

                // if all url is valid then submit data 
                if (!isAnyInvalidUrl) {

                    restoreData();

                    // database call from here ...
                    dispatch(AddCamp(body));

                    handleClose();
                }

            }

        } else {  // here checked which data is missing 

            if (formData?.campaign_id?.trim() === '' || formData?.campaign_id?.trim() === undefined) {
                dataValidation['campaign_id'] = true;
            }

            if (formData?.name?.trim() === '' || formData?.name?.trim() === undefined) {
                dataValidation['name'] = true;
            }

            if (formData?.description?.trim() === '' || formData?.description?.trim() === undefined) {
                dataValidation['description'] = true;
            }

            if (formData?.rev_type?.trim() === '' || formData?.rev_type?.trim() === undefined) {
                dataValidation['rev_type'] = true;
            }

            if (formData?.task_type?.trim() === '' || formData?.task_type?.trim() === undefined) {
                dataValidation['task_type'] = true;
            }

            if (formData?.daily_cap?.trim() === '' || formData?.daily_cap?.trim() === undefined) {
                dataValidation['daily_cap'] = true;
            }

            if (formData?.rate?.trim() === '' || formData?.rate?.trim() === undefined) {
                dataValidation['rate'] = true;
            }

            if (formData?.tracking_type?.trim() === '' || formData?.tracking_type?.trim() === undefined) {
                dataValidation['tracking_type'] = true;
            }

            if (geography.length === 0) {
                dataValidation['geography'] = true;
            }

            if (trafficType.length === 0) {
                dataValidation['traffic_type'] = true;
            }

            if (restrictedKey.length === 0) {
                dataValidation['keyword'] = true;
            }

            // at least one image need to given
            if (!imageValidity) {
                setFirstRender(false);
            } else {
                setFirstRender(true);
            }

            setValidation({ ...validation, dataValidation });

        }

    }


    return (
        <div className='campaign-modal-section'>

            <Modal
                show={show}
                onHide={() => {
                    restoreData()
                    handleClose()
                }}
                backdrop="static"
                keyboard={true}
                centered
                className='campaign-modal-sections'
            >

                <Modal.Title className='header-title text-center'>Add Campaign Details</Modal.Title>

                <Modal.Body className='campaign-modal-body'>

                    <div className='campaign-modal-section'>

                        <div className='campaigns-id' >
                            <label>Campaign ID</label>
                            <input name='campaign_id'
                                className={validation?.dataValidation?.campaign_id ? 'border-red' : ''}
                                value={formData?.campaign_id || ''}
                                onChange={onInputChange}
                                type="number" />
                        </div>

                        <div className='campaigns-name'>
                            <label>Name</label>
                            <input name='name'
                                onChange={onInputChange}
                                className={validation?.dataValidation?.name ? 'border-red' : ''}
                                value={formData?.name || ''}
                                type="text"
                            />
                        </div>

                        <div className='description'>
                            <label>Description</label>
                            <textarea name='description' value={formData?.description || ''}
                                className={validation?.dataValidation?.description ? 'border-red' : ''}
                                onChange={onInputChange} type="text" />
                        </div>


                        <div className='geography'>
                            <label>Countries Allowed</label>

                            <div className={validation?.dataValidation?.geography ? 'border-red multi-select-sections' : 'multi-select-sections'}>

                                <input name='geography'
                                    value={geographyText}
                                    type="text"
                                    onChange={geographyChangeHandler}
                                />

                                {geographySuggest.length > 0 && (
                                    <div
                                        className="suggest-box"
                                        style={{ display: toggleSuggestBox && geographyText.length > 0 ? "flex" : "none" }}
                                    >
                                        <div>
                                            {geographySuggest?.slice(0, 10).map((country, index) => (
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
                                    geography?.map((item, index) => (
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

                            <div className={validation?.dataValidation?.traffic_type ? 'border-red multi-select-traffic' : 'multi-select-traffic'} >

                                {
                                    trafficType.map((item, index) => (
                                        <div className='single-item' key={index}>
                                            <span className='traffic-name'>{item == 'mobile_ads' ? 'Mobile Ads' : item}</span>
                                            <span className='traffic-cross' onClick={() => removeTrafficTypeHandler(item)} >x</span>
                                        </div>
                                    ))
                                }


                                <select name='traffic_type' onChange={handleTrafficType} value="Select Traffic Type">
                                    <option>Select Traffic Type</option>

                                    {
                                        traffic_type.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label} </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </div>

                        <div className='rev-type'>
                            <label>Revenue Type</label>
                            <select name='rev_type' onChange={onInputChange}
                                className={validation?.dataValidation?.rev_type ? 'border-red' : ''}>
                                <option>Select Revenue Type</option>
                                <option className='fixed'>Fixed</option>
                                <option className='percentage'>Percentage</option>
                            </select>
                        </div>

                        <div className='task-type'>
                            <label>Task Type</label>
                            <select name='task_type' onChange={onInputChange}
                                className={validation?.dataValidation?.task_type ? 'border-red' : ''}  >
                                <option>Select Task Type</option>
                                <option className='soi' value='soi'>SOI</option>
                                <option className='doi' value='doi'>DOI</option>
                                <option className='form submit' value='form submit'>Form Submit</option>
                                <option className='cc submit' value='cc submit'>CC Submit</option>
                            </select>
                        </div>

                        <div className='daily-cap'>
                            <label>Daily Cap</label>
                            <input name='daily_cap' type="number"
                                className={validation?.dataValidation?.daily_cap ? 'border-red' : ''}
                                value={formData?.daily_cap || ''}
                                onChange={onInputChange}
                            />

                            <div className='per-day'>Per Day</div>
                        </div>

                        <div className='rate'>
                            <label>Rate</label>
                            <input name='rate' type="number"
                                className={validation?.dataValidation?.rate ? 'border-red' : ''}
                                value={formData?.rate || ''}
                                onChange={onInputChange}
                            />

                            <div className='usd-symbol'>USD</div>
                            <div className='dollar-symbol'>$</div>
                        </div>


                        <div className='expire-date'>
                            <label>Expire Date</label>
                            <input name='expire_date' type="date"
                                value={formData?.expire_date || ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='tracking-date'>
                            <label>Tracking Type</label>

                            <select className={validation?.dataValidation?.tracking_type ? 'border-red' : ''}
                                name='tracking_type' onChange={onInputChange}>
                                <option>Select Tracking Type</option>
                                <option className='manual' value="manual">Manual</option>
                                <option className='server_to_server' value="Server to Server">Server to Server</option>
                            </select>
                        </div>


                        <div className='keyword-restrictions'>
                            <label>Restrictions Key</label>

                            <div className={validation?.dataValidation?.keyword ? 'border-red multi-keyword-sections' : 'multi-keyword-sections'}>

                                {
                                    restrictedKey?.map((item, index) => (
                                        <div key={index} className='single-item'>
                                            <span className='country-name'>{item}</span>
                                            <span className='geography-cross' onClick={() => removeRestrictedKey(item)}>x</span>
                                        </div>
                                    ))

                                }
                                <input name='restricted_keyword'
                                    type="text"
                                    value={formData?.restricted_keyword || ''}
                                    onChange={onInputChange}
                                    onKeyDown={restrictedKeyChange}
                                />

                            </div>

                        </div>

                        <hr className={validation?.dataValidation?.device_type ? 'border-red' : ''} />
                        <div className='display-supported-sections'>

                            <h6>Device Type</h6>

                            <div className='display-supported'>

                                <div className='android'>
                                    <input type="checkbox"
                                        disabled={(toggleCheckBox == '' && supportFormate.all) ? true : false}
                                        id="android" name="android" onChange={onFormatSupportChangeHandler} value="false" />
                                    <label htmlFor="android">Android</label>
                                </div>

                                <div className='ios'>
                                    <input type="checkbox"
                                        disabled={(toggleCheckBox == '' && supportFormate.all) ? true : false}
                                        id="ios" name="ios" onChange={onFormatSupportChangeHandler} value="false" />
                                    <label htmlFor="ios">iOS</label>
                                </div>

                                <div className='windows'>
                                    <input type="checkbox"
                                        disabled={(toggleCheckBox == '' && supportFormate.all) ? true : false}
                                        id="windows"
                                        name="windows" onChange={onFormatSupportChangeHandler}
                                        value="false" />
                                    <label htmlFor="windows">Windows</label>
                                </div>

                                <div className='all'>
                                    <input type="checkbox"
                                        disabled={toggleCheckBox ? true : false}
                                        id="all" name="all" onChange={onFormatSupportChangeHandler} value="false" />
                                    <label htmlFor="all">All device operating systems allowed</label>
                                </div>
                            </div>


                        </div>

                        <hr className={validation?.dataValidation?.device_type ? 'border-red' : ''} />

                        <div className='contextual'>
                            <label>Contextual URL</label>
                            <textarea name='contextual_url'
                                className={urlValidity?.isUrlValid?.contextual_url ? 'border-red'
                                    : noUrlSet ? 'border-red' : ''
                                }
                                value={formData?.contextual_url || ''}
                                onChange={onInputChange} type="text" />
                        </div>

                        <div className='display'>
                            <label>Display URL</label>
                            <textarea name='display_url' type="text"
                                className={urlValidity?.isUrlValid?.display_url ? 'border-red' : noUrlSet ? 'border-red' : ''}
                                value={formData?.display_url || ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='search-url'>
                            <label>Search URL</label>
                            <textarea name='search_url' type="text"
                                className={urlValidity?.isUrlValid?.search_url ? 'border-red'
                                    : noUrlSet ? 'border-red' : ''}
                                value={formData?.search_url || ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='social'>
                            <label>Social URL</label>
                            <textarea name='social_url' type="text"
                                className={urlValidity?.isUrlValid?.social_url ? 'border-red' : noUrlSet ? 'border-red' : ''}
                                value={formData?.social_url || ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='email'>
                            <label>Email URL</label>
                            <textarea name='email_url' type="text"
                                className={urlValidity?.isUrlValid?.email_url ? 'border-red' : noUrlSet ? 'border-red' : ''}
                                value={formData?.email_url || ''}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='mobile-adss'>
                            <label>Mobile Ads URL</label>
                            <textarea name='mobile_ads_url' type="text"
                                className={urlValidity?.isUrlValid?.mobile_ads_url ? "border-red" : noUrlSet ? 'border-red' : ''}
                                value={formData?.mobile_ads_url || ''}
                                onChange={onInputChange}
                            />
                        </div>


                        <div className='campaign-img-sections'>
                            <h6>Landing Page</h6>

                            <span className="campaign-img-section">

                                {
                                    imageData.map((item, index) => (
                                        // <div key={index} className={(validation[item] != item) ? 'single-image' : 'single-image border-red'}>
                                        <div key={index}
                                            className={firstRender ? 'single-image' : 'single-image border-red'}>

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

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        restoreData()
                        handleClose()
                    }}>
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

export default AddCampaigns
