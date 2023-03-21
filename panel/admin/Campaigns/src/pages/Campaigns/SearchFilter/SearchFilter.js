import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';

import { SearchCampaign } from "../../../store/campaign/action"
import { Countries } from '../../../shared';

import "./SearchFilter.scss";
import DeleteModal from '../../../shared/DeleteModal/DeleteModal';

const SearchFilter = ({ deleteMultipleHandler, ids, handleDeleteShow, handleDeleteClose, deleteShow }) => {

    const dispatch = useDispatch();

    const [geographyText, setGeographyText] = useState('');
    const [geographySuggest, setGeographySuggest] = useState([]);
    const [toggleSuggestBox, setToggleSuggestBox] = useState(false);

    const [formdata, setFormdata] = useState({});

    const onChange = (e) => {


        setFormdata({ ...formdata, [e.target.name]: e.target.value });

        // This is for geography filter
        if (e.target.name === "geography") {
            setGeographyText(e.target.value);
            setToggleSuggestBox(true);
            const filterCountry = Countries?.filter((item) => item.label.toLowerCase().includes(e.target.value.toLowerCase()));
            setGeographySuggest(filterCountry);

        }

    }

    // add geography using suggest click
    const handleSuggestClick = (item) => {

        setFormdata({ ...formdata, ['geography']: item });
        setGeographyText(item);
        setGeographySuggest([])
        setToggleSuggestBox(false);

    }

    // search text 
    const searchHandler = () => {
        // send search payload 
        dispatch(SearchCampaign(formdata))
    }


    return (


        <div className='campaign-search-filter-section'>

            <div className='campaign-id'>
                <h6>Campaign ID</h6>
                <input name='campaign_id' type="number" onChange={onChange} />

            </div>

            <div className='campaign-name'>
                <h6>Name</h6>
                <input name='name' type="text" onChange={onChange} />
            </div>

            <div className='status'>
                <h6>Status</h6>

                <select name='ban'
                    onChange={onChange}
                >
                    <option>Select Status</option>
                    <option value="1">Enable</option>
                    <option value="0">Disable</option>
                </select>

            </div>

            <div className='status'>
                <h6>Top</h6>

                <select name='top'
                    onChange={onChange}
                >
                    <option>Select Top</option>
                    <option value="1">ON</option>
                    <option value="0">OFF</option>
                </select>

            </div>

            <div className='geography'>
                <h6>Country</h6>
                <input name='geography' type="text" value={geographyText}
                    onChange={onChange}
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

                <button className='search-btn' onClick={searchHandler}>
                    Submit
                </button>

                <button className='delete-btn'
                    style={{ opacity: ids.length > 0 ? 1 : 0.5 }}
                    disabled={ids.length > 0 ? false : true}
                    // onClick={deleteMultipleHandler}
                    onClick={handleDeleteShow}>Delete</button>

            </div>

            {/* delete confirmation modal */}
            <DeleteModal
                text="Are you sure to delete this items?"
                show={deleteShow}
                handleClose={handleDeleteClose}
                id={ids}
                deleteHandler={deleteMultipleHandler}

            />


        </div>

    )
}

export default SearchFilter
