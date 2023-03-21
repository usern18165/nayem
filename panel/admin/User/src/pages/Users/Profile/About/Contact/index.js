import React, {useState} from 'react';
import {
  Button,
  TextField,
  IconButton
} from "@material-ui/core";
import { Public, AlternateEmail, Edit } from '@material-ui/icons';
import EmailIcon from '../../../../../assets/profile/about/Email.png'
import Website from './Website';
import axios from 'axios';
import Phone from './Phone';
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


export default ({ about, isMe, setAbout, username }) => {
  const [edit, setEdit] = useState('')
  const [working, setWorking] = useState()
  const [newEmail, setNewEmail] = useState(`${username}@micple.com`)
  const materialClass = useStyles();
  function onSave(){
    axios({
      method: 'PUT',
      data: {email: newEmail},
      url: `${BACKEND_URL}/profile/about/${username}/email`,
      headers: adminHeader(),
    })
      .then(() => {
        setEdit("")
      })
      .catch((err) => {
        throw err;
      });
  }
  function setPhone(phone) {
    setAbout({
      ...about,
      phone,
    });
  }
  function setWebsite(website) {
    setAbout({
      ...about,
      website,
    });
  }
  function editClick(id) {
   
  }
  return (
    <>
      <h2>Contact Info</h2>

      <Works>
        {
          edit ? (
            <WorkForm>
         
              <div className='e'>
                <TextField
                  variant="outlined"
                  className={materialClass.root}
                  label="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
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
            <img src={EmailIcon} alt="" />
          </div>
          <div className='m'>
            <h3>{newEmail}</h3>
            <div className='d'>Email</div>
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

      <Phone phone={about?.phone} setPhone={setPhone} isMe={isMe} username={username}/>
      <Website website={about?.website} setWebsite={setWebsite} isMe={isMe} />
    </>
  );
};
