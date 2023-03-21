import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AddCampaign from './AddCampaign/AddCampaign';
import AllCampaign from './AllCampaign/AllCampaign';
import SearchFilter from './SearchFilter/SearchFilter';

import { multipleDelete } from '../../store/campaign/action';

import "./Campaigns.scss";

const Campaigns = () => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // this is used as delete confirmation modal 
  const [deleteShow, setDeleteShow] = useState(false);

  const handleDeleteShow = () => { setDeleteShow(true) }
  const handleDeleteClose = () => { setDeleteShow(false) }


  // Multiple checkbox 
  const [ids, setIds] = useState([]);

  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  // delete ids change handler 
  const onChangeDeleteIds = (e, id) => {

    if (e.target.checked) {
      // add id for delete
      setIds([...ids, id]);
    } else {
      // remove id from ids array if unchecked id 
      const filterData = ids.filter(item => item !== id);
      setIds(filterData);
    }
  }


  // multiple delete handler 
  const deleteMultipleHandler = () => {
    dispatch(multipleDelete(ids));
    setIds([]);
    handleDeleteClose();
  }

  return (

    <div className='campaign-adding-sections' >

      <div className='campaign-top-sections'>
        <button
          className='add-modal'
          variant="primary"
          onClick={handleShow}
        >Add</button>

        {/*Campaign  Add modal here*/}
        <AddCampaign
          show={show}
          handleClose={handleClose}
        />
      </div>

      {/*Campaign  Search Filter here*/}
      <div>
        <SearchFilter
          deleteMultipleHandler={deleteMultipleHandler}
          ids={ids}
          handleDeleteShow={handleDeleteShow}
          handleDeleteClose={handleDeleteClose}
          deleteShow={deleteShow}
        />
      </div>

      {/* Campaign table here */}
      <AllCampaign
        onChangeDeleteIds={onChangeDeleteIds}
        ids={ids}
      />


    </div>
  )
}

export default Campaigns
