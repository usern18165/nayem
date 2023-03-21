import React, { useState } from 'react';
import { Public, Lock, People, Phone } from '@material-ui/icons';
import {
  Button,
  TextField,
  IconButton
} from "@material-ui/core";
import {Edit } from '@material-ui/icons';
import axios from 'axios';
import PhoneIcon from '../../../../../assets/profile/about/Phone.png'
import { PrivacyOpt } from '../../../../../components/Tools';
import { Works, WorkItem, WorkForm } from '../style';
import store from '../../../../../store'
import { makeStyles } from "@material-ui/core/styles";
import { userHeader, adminHeader } from '../../../../../shared/functions/Token';
import { BACKEND_URL } from '../../../../../shared/constants/Variables';
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid lightgray",
    },
    "& .MuiInputLabel-outlined": {
      color: "black",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black",
    },
  },
});

export default ({ phone, isMe, setPhone, username }) => {
  const [optEl, setOptEl] = useState(null);
  const [edit, setEdit] = useState('')
  const [working, setWorking] = useState()
  const [newPhone, setNewPhone] = useState(phone.number)
  const materialClass = useStyles();
  function onSave(){
    axios({
      method: 'PUT',
      data: {phone: newPhone},
      url: `${BACKEND_URL}/profile/about/${username}/phone`,
      headers: adminHeader(),
    })
      .then(() => {
        setEdit("")
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Works>
      {
        edit ? (
          <WorkForm>
         
              <div className='e'>
                <TextField
                  variant="outlined"
                  className={materialClass.root}
                  label="Phone"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
            <div className="b">
              {/* {edit === 'edit' && (
                <Button variant='contained' style={{textTransform:"none", textShadow:"none"}} color='primary' disabled={working} onClick={onDelete}>
                  {working ? <Spinner height='20px' /> : 'Delete'}
                </Button>
              )} */}
              {/* <span style={{ flex: '1 1 auto' }}></span> */}
              <span
                style={{ display: "flex", marginLeft: "77%", marginTop: "-60px" }}
              >
                
                <Button
                  style={{
                    border: "1px solid #3f51b5",
                    color: "black",
                    textTransform: "none",
                    textShadow: "none",
                  }}
                  variant="outlined"
                  onClick={() => setEdit("")}
                  disabled={working}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none", textShadow: "none" }}
                  disabled={working}
                  
                  onClick={onSave}
                >
                  Save
                </Button>
              </span>
            </div>
          </WorkForm>
        ) : (
          <WorkItem>
          <div className='a'>
            <img src={PhoneIcon} alt="" />
          </div>
          <div className='m' >
            <h3>{newPhone}</h3>
            <div className='d'>Phone Number</div>
          </div>
          <span style={{ flex: '1 1 auto' }}></span>
          <span>
                  {isMe() && (
                    <IconButton onClick={()=>setEdit('edit')}>
                      <Edit />
                    </IconButton>
                  )}
                
            </span>
        </WorkItem>
        )
      }
     
    </Works>
  );
};
