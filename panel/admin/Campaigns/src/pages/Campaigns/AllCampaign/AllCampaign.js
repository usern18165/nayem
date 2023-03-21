import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteCampaign, ToggleBan, ToggleTop } from '../../../store/campaign/action';

import DeleteModal from '../../../shared/DeleteModal/DeleteModal';
import EditCampaign from '../EditCampaign/EditCampaign';

import "./AllCampaign.scss";

const AllCampaign = ({ onChangeDeleteIds, ids }) => {

    const dispatch = useDispatch();

    const { campaigns } = useSelector(state => state.campaign);

    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState('');
    const [singleCampaign, setSingleCampaign] = useState({});

    const handleShow = (item) => {
        setShow(true);
        setSingleCampaign(item);
    }

    const handleClose = () => {
        setShow(false);
        setSingleCampaign({});
    }

    // delete show handler 
    const deleteShowHandler = (id) => {
        setId(id);
        setDeleteShow(true);
    }

    //  delete close handlers
    const deleteCloseHandler = () => {
        setDeleteShow(false);
        setId('');
    }

    const deleteHandler = (id) => {

        // here, need to database call 

        dispatch(DeleteCampaign(id));
        deleteCloseHandler()
    }

    //toggle campaign ban
    const toggleBanCampaign = (id) => {
        dispatch(ToggleBan(id));
    }

    // Toggle campaign Offer 
    const toggleCampaignOffer = (id) => {
        dispatch(ToggleTop(id))
    }

    return (

        <div>
            {
                campaigns.length > 0 && (
                    <div>

                        <div className="all-campaigns-section">
                            <table id='report' className="all-campaigns-table">
                                <thead>
                                    <tr>
                                        <th className="common"></th>

                                        <th className="common">Campaign ID</th>
                                        <th className="title">Campaign Name</th>
                                        <th className="title">Description</th>
                                        <th className="traffic-section">Countries Allowed</th>
                                        <th className="common">Traffic Type</th>
                                        <th className="common">Rev Type</th>
                                        <th className="common">Task Type</th>
                                        <th className="common">Daily Cap</th>
                                        <th className="traffic-section">Tracking Type</th>
                                        <th className="traffic-section">Restrictions Key</th>
                                        <th className="common">Device Type</th>
                                        <th className="rate">Rate</th>
                                        <th className="common">Expire Date</th>
                                        <th className="traffic-section">Contextual URL</th>
                                        <th className="traffic-section">Display URL</th>
                                        <th className="traffic-section">Search URL</th>
                                        <th className="traffic-section">Social URL</th>
                                        <th className="traffic-section">Email URL</th>
                                        <th className="traffic-section">Mobile Ads URL</th>
                                        <th className="traffic-section">Click</th>
                                        <th className="traffic-section">Task Completed</th>
                                        <th className="common">Offer</th>
                                        <th className="common">Status</th>
                                        <th className="action">Action</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {campaigns?.map((item, index) => (
                                        <tr key={index}>

                                            <td>
                                                <input
                                                    onChange={(e) => onChangeDeleteIds(e, item.id)}
                                                    type="checkbox" name="delete_item"
                                                    checked={ids?.includes(item.id)} />
                                            </td>

                                            <td>{item.campaign_id}</td>
                                            <td>
                                                <div className="name">{item?.name}</div>
                                            </td>
                                            <td>
                                                <div className="name">{item?.description}</div>
                                            </td>
                                            <td>

                                                {
                                                    item?.geography?.map((country, index) => (
                                                        <span className='geography' key={index}>{country} <small>,</small>&nbsp;</span>
                                                    ))

                                                }

                                            </td>
                                            <td className='traffic-type'>
                                                {
                                                    item?.traffic_type?.map((traffic, index) => (
                                                        <span className='geography' key={index}>  {traffic === "mobile_ads" ? "Mobile Ads" : traffic} <small>,</small>&nbsp;</span>
                                                    ))
                                                }

                                            </td>
                                            <td>{item?.rev_type}</td>
                                            <td>{item?.task_type}</td>
                                            <td><strong>{item?.daily_cap} Per Day</strong></td>
                                            <td>{item?.tracking_type}</td>
                                            <td>{
                                                item?.restricted_keyword?.map((keyword, index) => (
                                                    <span className='restricted-keyword' key={index}> {keyword}<small>,</small>&nbsp;</span>
                                                ))
                                            }</td>
                                            <td>

                                                <span> {item?.device_type.android ? "Android" : ""}</span>
                                                {(item?.device_type?.ios && item?.device_type.android) && <>&#184;</>}
                                                <span> {item?.device_type.ios ? "IOS" : ""}</span>
                                                {(item?.device_type?.windows && item?.device_type.ios) && <>&#184;</>}
                                                <span> {item?.device_type.windows ? "Windows" : ""}</span>
                                                <span> {item?.device_type.all ? "All" : ""}</span>
                                            </td>
                                            <td> <strong>${item?.rate}</strong></td>
                                            <td>{item?.expire_date}</td>
                                            <td >{item?.contextual_url}</td>
                                            <td >{item?.display_url}</td>
                                            <td >{item?.search_url}</td>
                                            <td>{item?.social_url}</td>
                                            <td>{item?.email_url}</td>
                                            <td >{item?.mobile_ads_url}</td>
                                            <td>{item?.click}</td>
                                            <td>{item?.task_complete}</td>

                                            <td>
                                                <div className="ban-check-box">
                                                    <input type="checkbox" name="ban" checked={item?.top} onChange={() => toggleCampaignOffer(item?.id)} />
                                                    <div className="tooltip-text">{item?.top ? "On" : "Off"}</div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="ban-check-box">
                                                    <input type="checkbox" name="ban" checked={item?.ban} onChange={() => toggleBanCampaign(item?.id)} />
                                                    <div className="tooltip-text">{item?.ban ? "Enable" : "Disable"}</div>
                                                </div>
                                            </td>

                                            <td className='action-btn'>
                                                <button className='edit' onClick={() => handleShow(item)} >Edit </button>
                                                <button className='delete'
                                                    onClick={() => deleteShowHandler(item?.id)}
                                                >Delete</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            {/* delete confirmation modal */}
                            <DeleteModal
                                show={deleteShow}
                                handleClose={deleteCloseHandler}
                                id={id}
                                deleteHandler={deleteHandler}
                                text="Are you sure to delete this Item?"
                            />

                            {/* Edit modal for campaign */}
                            <EditCampaign
                                show={show}
                                handleClose={handleClose}
                                campaign={singleCampaign}
                                setFormData={setSingleCampaign}
                            />

                        </div>

                        <div style={{ float: "right" }}>
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" role="button" tabIndex="0" href="#">Next</a></li>
                            </ul>
                        </div>

                    </div>
                )}
        </div>

    )
}

export default AllCampaign
