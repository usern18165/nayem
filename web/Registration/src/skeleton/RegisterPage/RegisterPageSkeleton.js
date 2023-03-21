import React from 'react'

import "./style.scss";

const RegisterPageSkeleton = () => {
  return (
    <div className='register-skeleton-section'>

      <div className='register-page-logo skeleton'></div>

      <div className='personal-info-section'>
        <div className='skeleton skeleton-text'></div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>
      </div>

      <div className='residence-info-section'>
        <div className='skeleton skeleton-text'></div>

        <div className='input-section'>
          <div className="skeleton skeleton-address-input"> </div>
        </div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>
      </div>

      <div className='user-info-section'>
        <div className='skeleton skeleton-text'></div>
        <div className='skeleton skeleton-small-text'></div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='phonenumber-input-field-section'>
          <div className='phone-input '>
            <div className="skeleton dial-code"> </div>
            <div className="skeleton number-filed  "> </div>
          </div>

          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='skeleton skeleton-small-text'></div>

        <div className='input-section'>
          <div className="skeleton skeleton-input  "> </div>
          <div className="skeleton skeleton-input  "> </div>
        </div>

        <div className='skeleton skeleton-progressbar'></div>

        <div className='terms-and-conditions'>
          <div className=' skeleton checkbox'></div>
          <div className='skeleton condition-text'></div>
        </div>
      </div>

      <div className='submit-btn'>
        <button type="button" className="submit-button skeleton" ></button>
      </div>



    </div>
  )
}

export default RegisterPageSkeleton
