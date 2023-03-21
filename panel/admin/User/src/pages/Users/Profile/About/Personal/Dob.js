import React, { useState } from 'react';
import {
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Public, Lock, People, Edit, Language } from "@material-ui/icons";
import axios from 'axios';
import { userHeader, adminHeader } from '../../../../../shared/functions/Token';
import { BACKEND_URL } from '../../../../../shared/constants/Variables';
import BirthdayIcon from '../../../../../assets/profile/about/Birthday.png'
import { PrivacyOpt } from '../../../../../components/Tools';
import { Works, WorkItem, WorkForm } from '../style';
import { makeStyles } from "@material-ui/core/styles";
import FilterCuc from '../../../../../components/FilterCuc'

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
export default ({ dob, isMe, setPrivacy, username }) => {
  
  console.log(username, 'dob usrname');
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const [edit, setEdit] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [religionI, setReligionI] = useState("");
  const [working, setWorking] = useState(false);
  const materialClass = useStyles();
  const [selectedDayForDeactive, setSelectedDayForDeactive] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date(dob?.date).getFullYear()||'');
  const [selectedMonth, setSelectedMonth] = useState(monthNames[new Date(dob?.date).getMonth()]||'');
  const [selectedDay, setSelectedDay] = useState(new Date(dob?.date).getDate()||'');
  const [newDob, setNewDob] = useState('');

  console.log(selectedDay, selectedMonth, selectedYear, 'selected day month year');
  console.log(dob?.date, 'dob date');
  console.log(new Date(dob?.date), 'new Date(dob?.date)');

  function onSave(){
   let mydate = new Date(`${selectedMonth} ${selectedDay} ${selectedYear}`)
    axios({
      method: 'PUT',
      data: { date: mydate },
      url: `${BACKEND_URL}/profile/about/${username}/dob`,
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
        edit ? 
        (
          <WorkForm>
          <div >
            <FilterCuc
                setSelectedYear={setSelectedYear}
                year={selectedYear}
                month={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedDay={selectedDay}
                setselectedDay={setSelectedDay}
                setSelectedDayForDeactive={setSelectedDayForDeactive}
                selectedYear={selectedYear}
                setYear={setSelectedYear}
                value={"02/08/2021"}
                setDob={setNewDob}

                />
          </div>
            {/* <div className='e'>
              <TextField
                variant="outlined"
                className={materialClass.root}
                label="Date of Birth"
                value={newDo b}
                onChange={(e) => setNewDob(e.target.value)}
              />
            </div> */}
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
          <img src={BirthdayIcon} alt="" />
        </div>
        <div className='m'>
          <h3>{selectedDay} {selectedMonth} {selectedYear}</h3>
          <div className='d'>Date of birth</div>
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
