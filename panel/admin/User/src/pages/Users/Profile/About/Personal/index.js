import React, {useState} from "react";
import { Edit } from "@material-ui/icons";
import {
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Relation from "./Relation";
import Family from "./Family";
import Dob from "./Dob";
import GenderIcon from "../../../../../assets/profile/about/Gender.png";
import Nickname from "./Nickname";
import Religion from "./Religion";
import Language from "./Language";
import Political from "./Political";
import Interested from "./Interested";
import { Works, WorkItem, WorkForm } from '../style';
import Color from "./Color";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
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
  
  const [newGender, setNewGender] = useState(about.gender)
  const [edit, setEdit] = useState('')
  const [working, setWorking] = useState(false);
  const materialClass = useStyles();
  function onSave(){
      axios({
        method: 'PUT',
        data: {gender: newGender},
        url: `${BACKEND_URL}/profile/about/${username}/gender`,
        headers: adminHeader(),
      })
        .then(() => {
          setEdit("")
        })
        .catch((err) => {
          throw err;
        });
    }
  function setFamily(family) {
    setAbout({
      ...about,
      family,
    });
  }
  function setDobPrivacy(p) {
    setAbout({
      ...about,
      dob: {
        ...about.dob,
        privacy: p,
      },
    });
  }
  function setRelation(relation) {
    setAbout({
      ...about,
      relation,
    });
  }
  function setNickname(nickname) {
    setAbout({
      ...about,
      nickname,
    });
  }
  function setReligion(religion) {
    setAbout({
      ...about,
      religion,
    });
  }
  function setLanguage(language) {
    setAbout({
      ...about,
      language,
    });
  }
  function setPolitics(politics) {
    setAbout({
      ...about,
      politics,
    });
  }
  function setInterest(interest) {
    setAbout({
      ...about,
      interest,
    });
  }
  function setColor(color) {
    setAbout({
      ...about,
      color,
    });
  }
  // console.log(about, 'about');
  return (
    <>
      <h2>Basic Info</h2>

      <Works>
        {
          edit ? (
            <WorkForm>
         
              <div className='e'>
                <TextField
                  variant="outlined"
                  className={materialClass.root}
                  label="Gender"
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
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
          <div className="a">
            <img src={GenderIcon} alt="" />
          </div>
          <div className="m">
            <h3>{newGender}</h3>
            <div className="d">Gender</div>
          </div>
          <span style={{ flex: "1 1 auto" }}></span>
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

      <Dob username={username} dob={about.dob} setPrivacy={setDobPrivacy} isMe={isMe} />
      <Nickname
        nickname={about.nickname}
        setNickname={setNickname}
        isMe={isMe}
      ></Nickname>
      <Religion
        religion={about.religion}
        setReligion={setReligion}
        isMe={isMe}
      ></Religion>
      <Language
        language={about.language}
        setLanguage={setLanguage}
        isMe={isMe}
      ></Language>
      <Political
        politics={about.politics}
        setPolitics={setPolitics}
        isMe={isMe}
      ></Political>
      <Interested
        interest={about.interest}
        setInterest={setInterest}
        isMe={isMe}
      ></Interested>
      <Color color={about.color} setColor={setColor} isMe={isMe}></Color>

      <h2>Family members</h2>

      {(isMe() || about?.family?.length > 0) && (
        <Family
          family={about?.family || []}
          setFamily={setFamily}
          isMe={isMe}
        />
      )}

      <h2>Relationship</h2>

      {(isMe() || about?.relation) && (
        <Relation
          relation={about?.relation}
          setRelation={setRelation}
          isMe={isMe}
        />
      )}
    </>
  );
};
