import React, { useState } from 'react';
import { Button, TextField, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Public, Lock, People, Edit, Language } from '@material-ui/icons';
import axios from 'axios';
import PoliticalIcon from '../../../../assets/about/Political.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
import { Spinner } from '../../../../shared';

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '1px solid lightgray'
    },
    "& .MuiInputLabel-outlined": {
      color: "black"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    }
  }
});

export default ({ politics, setPolitics, isMe }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState('');
  const [politicsI, setPoliticsI] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [working, setWorking] = useState(false);

  const materialClass = useStyles()

  const origin = {
    vertical: 'top',
    horizontal: 'right',
  };
  function onSave() {
    if (!politicsI) {
      return;
    }
    setWorking(true);
    const body = {
      name: politicsI,
      privacy,
    };
    const req = {
      data: body,
      method: 'PUT',
      url: `${BACKEND_URL}/profile/about/personal/politics`,
      headers: userHeader(),
    };
    axios(req)
      .then(() => {
        setPolitics(body);
        setEdit('');
        setWorking(false);
        setPoliticsI('');
        setPrivacy('public');
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function onDelete() {
    setWorking(true);
    axios
      .delete(`${BACKEND_URL}/profile/about/personal/politics`, { headers: userHeader() })
      .then(() => {
        setPrivacy('public');
        setPoliticsI('');
        setWorking(false);
        setPolitics({});
        setEdit('');
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function editClick() {
    setPoliticsI(politics?.name);
    setPrivacy(politics?.privacy);
  }
  return (
    <Works>
      {/* !politics?.name && !edit && isMe() && */}
      
      {(!politics && isMe() ) && (
        <AddButton
          variant="outlined"
          startIcon={<img src={PoliticalIcon} style={{ width: "20px" }} />}
          onClick={() => setEdit("new")}
        >
          Add Politics
        </AddButton>
      )}


      {!!edit ? (
        <WorkForm>
          <div className="e">
            <TextField
              variant="outlined"
              className={materialClass.root}
              label="Politics"
              value={politicsI}
              onChange={(e) => setPoliticsI(e.target.value)}
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
              <IconButton
                disabled={working}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {privacy === "private" ? (
                  <Lock />
                ) : privacy === "friends" ? (
                  <People />
                ) : (
                  <Public />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={origin}
                keepMounted
                transformOrigin={origin}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setPrivacy("public");
                    setAnchorEl(null);
                  }}
                >
                  Public
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPrivacy("friends");
                    setAnchorEl(null);
                  }}
                >
                  Followers
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPrivacy("private");
                    setAnchorEl(null);
                  }}
                >
                  Private
                </MenuItem>
              </Menu>
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
        <>
          {Object.keys(politics || {}).length > 0 && (
            <WorkItem>
              <div className="a">
                <img src={PoliticalIcon} alt="" />
              </div>
              <div className="m">
                <h3 onClick={() => window.open(`${politics?.name}`, "blank")}>
                  {politics?.name}
                </h3>
                <div className="d">Politics</div>
              </div>
              <span style={{ flex: "1 1 auto" }}></span>
              <span>
              {isMe() && (
                  <IconButton
                    onClick={() => {
                      setEdit("edit");
                      editClick();
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                <IconButton disabled={!isMe()}>
                  {politics?.privacy === "private" ? (
                    <Lock />
                  ) : politics?.privacy === "friends" ? (
                    <People />
                  ) : (
                    <Public />
                  )}
                </IconButton>
                
              </span>
            </WorkItem>
          )}
        </>
      )}
    </Works>
  );
};
