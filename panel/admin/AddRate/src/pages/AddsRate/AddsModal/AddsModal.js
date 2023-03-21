import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import './style.scss';

const AddsModal = ({
  show, handleClose, country, setCountry,
  state, setState, city, setCity, pricePerGoals,
  setPricePerGoals, timePerGoals, setTimePerGoals,
  SaveHandler, setCategoryType, vat, setVat }) => {

  const [sdiType, setsdf] = useState([
    { name: 'CLICKS', value: "clicks" },
    { name: 'VIEWS', value: "views" },
    { name: 'REACTIONS', value: "reactions" },
    { name: 'SALES', value: "sales" },
    { name: 'COMMENTS', value: "comments" },
    { name: 'SHARES', value: "shares" }
  ]);

  return (
    <div className='adds-modal-sections'>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
      >
        {/* <Modal.Header closeButton> */}
        <Modal.Title className='header-title'>Add Price Rate</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>



          <div className="add-modal-main-section">

            <div className='country-sections'>
              <label className="country-label">Country</label>
              <input
                // maxLength="66"
                type="text"
                className="country-input-field"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value)
                }}
              />
            </div>

            <div className='state-sections'>
              <label className="state-label">State</label>
              <input
                // maxLength="66"
                type="text"
                className="state-input-field"
                value={state == null ? ' ' : state}
                onChange={(e) => {
                  setState(e.target.value)
                }}
              />
            </div>

            <div className='city-sections'>
              <label className="state-label">City</label>
              <input
                // maxLength="66"
                type="text"
                className="city-input-field"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
            </div>

            <div className='category-sections'>
              <label className="state-label">Category Type</label>

              <select onChange={(e) => {
                setCategoryType(e.target.value)
              }} name='category_type'>
                <option>Select Category Type</option>
                {sdiType?.map((categoryType, index) =>
                  <option value={categoryType.value} key={index}>{categoryType.name}</option>
                )}

              </select>

            </div>

            <div className='price-per-goals-sections'>
              <label className="state-label">Price Per Goals</label>
              <input
                // maxLength="66"
                type="number"
                className="price-per-goals-input-field"
                value={pricePerGoals}
                onChange={(e) => {
                  setPricePerGoals(e.target.value)
                }}
              />
            </div>

            <div className='time-per-goals-sections'>
              <label className="state-label">Time Per Goals</label>
              <input
                // maxLength="66"
                type="number"
                className="time-per-goals-input-field"
                value={timePerGoals}
                onChange={(e) => {
                  setTimePerGoals(e.target.value)
                }}
              />
            </div>

            <div className='vat-sections'>
              <label className='vat-label'>Vat (%)</label>
              <input
                className='vat-input-field'
                type="number"
                value={vat}
                onChange={(e) => {
                  if (vat.length > 1) {
                    setVat('')
                  } else {
                    setVat(e.target.value);
                  }

                }}
              />

              <div className='usd-symbol'>USD</div>
            </div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={SaveHandler} variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AddsModal
