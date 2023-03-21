import React, { useState } from 'react'

import "./style.scss";

const AdsFilter = ({ onInputChange, isDisabled, country, userName, adIds, setSearchFilter, searchFilter, searchHandler }) => {

    const [status, setStatus] = useState([
        { name: "Approved", value: 1 },
        { name: "Pending", value: 0 },
        { name: "Rejected", value: 10 },
        { name: "Banned", value: 11 }
    ]);

    const InputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchFilter(values => ({ ...values, [name]: value }))
    }

    console.log(searchFilter, "test seacrh filter wrok or not ")

    return (
        <div className="ads-filter-sections">

            <div className="country-select-filter-sections" >

                <label className="country-label">Country</label>

                <select onChange={onInputChange} name="country" className="country-select-filter">

                    <option >Select Country</option>
                    {
                        country?.map((country, index) =>

                            <option value={country?.country_name} key={index}>
                                {country?.country_name}
                            </option>
                        )
                    }
                </select>

            </div>

            <div className="username-select-filter-sections">

                <label className="username-label">Username</label>

                <select
                    disabled={isDisabled?.isActiveUserName}
                    onChange={onInputChange}
                    name="username"
                    className="username-select-filter" >
                    <option>Select Username </option>
                    {
                        userName?.map((user, index) =>

                            <option value={user} key={index}>
                                {user}
                            </option>
                        )
                    }
                </select>

            </div>

            <div className="adId-select-filter-sections">

                <label className="adIds-label">Ads ID</label>

                <select disabled={isDisabled?.isActiveAdId} onChange={onInputChange} name="addId" className="adId-select-filter">
                    <option>Please Select AdId</option>
                    {
                        adIds?.map((item, index) =>

                            <option value={item?.addId} key={index}>
                                {item?.addId}
                            </option>
                        )

                    }
                </select>

            </div>

            <div className="status-select-filter-sections">

                <label className="status-label">Status</label>

                <select disabled={isDisabled?.isActiveStaus} name="status" onChange={onInputChange} className="status-select-filter">
                    <option>Select Status</option>

                    {status?.map((status, index) =>
                        <option value={status.value} key={index}>
                            {status.name}
                        </option>
                    )}

                </select>

            </div>


            <div className="transcation-sections">
                {/* trnsId && notes */}
                <label className="transcation-label">Transcation ID</label>
                <input
                    onChange={InputChangeHandler}
                    name="trnsId"
                    disabled={isDisabled?.isActiveTranscationId}
                    className="transcation-id" placeholder="Trsncation id" />

            </div>

            <div className="notes-sections">

                <label className="notes-label">Notes</label>
                <input className="notes"
                    onChange={InputChangeHandler}
                    name="notes"
                    disabled={isDisabled?.isActiveNotes}
                    placeholder="Notes"/>

            </div>

            <button onClick={searchHandler} className="ads-filter-btn">Search</button>

        </div>
    )
}

export default AdsFilter;
