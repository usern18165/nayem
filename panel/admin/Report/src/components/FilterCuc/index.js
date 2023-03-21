import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import DropdownCustom from "../DropdownCustom";
import '../style.scss'
const useStyles = makeStyles((theme) => ({
  
  formControl: {
    margin: theme.spacing(1),
    minWidth:'15%'
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FilterCuc({
  setDob,
  setSelectedDayForDeactive,
  value,
  selectedYear,
  year,
  setSelectedYear,
  month,
  setSelectedMonth,
  selectedDay,
  setselectedDay,
}) {
  const classes = useStyles();
  const [slelctedmonth, setMonth] = useState("");
  const [dismon, setdismon] = useState(null);
  //   const [selectedYear, setYear] = useState(0);
  const [day, setDays] = useState("");

  // dynamic date month and years
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November	",
    "December",
  ];

  // date year calculation
  var currentTime = new Date();

  // returns the year (four digits)
  var Maxyear = parseInt(currentTime.getFullYear() - 100);
  var Minmyear = parseInt(currentTime.getFullYear() - 18);

  const Years = [];
  //   const days = [1, 2, 3, 45];

  for (let SelectYear = Minmyear; SelectYear > Maxyear; SelectYear--) {
    Years.push(SelectYear);
  }

  //   conver month to month number
  let slelctedmonthToString = slelctedmonth.toLowerCase();
  var monthToNum = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November	",
    "December",
  ];

  slelctedmonthToString = monthToNum.indexOf(slelctedmonthToString);

  const daysCount = daysInMonth(slelctedmonthToString, selectedYear);
  const days = [];
  for (let SelectYear = 1; SelectYear <= daysCount; SelectYear++) {
    days.push(SelectYear);
  }

  // days count
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  // // console.log("month year", daysInMonth(2, selectedYear));
  // // console.log("slelctedmonth", typeof slelctedmonth);
  // // console.log("selectedYear", typeof selectedYear);

  //   month changer
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  //   const handleChangeDay = (event) => {
  //     // setDays(event.target.value);
  //   };
  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [monthDis, setMonthDis] = React.useState("");

  // refactoring code
  // const [year, setYear] = React.useState("");
  // const [month, setSelectedMonth] = React.useState("");
  // const [selectedDay, setselectedDay] = React.useState("");

  // refactoring code

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    // alert(slelctedmonth);
  }, [slelctedmonth]);

  const handledaysetup = (e) => {
    setSelectedDayForDeactive(e.target.value);
    setselectedDay(e.target.value);
  };
  return (
    <div
      onClick={(e) => setDob("03/08/2021")}
      className="inp_info datrFIlter riiir"
      style={{
        padding: "auto 10px",
        border: 'none',
        justifyContent: "space-around",
        display: "flex",
      }}
    >
      <Grid container spacing={0}>
        <Grid style={{ alignItems: "center", display: "flex" }} item xs={4}>
          {/* <FormControl className={classes.formControl}>
            { 
              !selectedYear && (
                <InputLabel placeholder="Year" id="demo-simple-select-label" onClick={()=>{handleOpen()}}>
                  Year
                </InputLabel>
              )
            }
          
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="">
                <em>Year</em>
              </MenuItem>
              {Years.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
           */}
           <InputLabel placeholder="Year" id="demo-controlled-open-select-label" >
            {year === "" ? "Year" : year}
          </InputLabel>
          <FormControl  className={classes.formControl} >
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={"sadasd"}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="">
                <em>Year</em>
              </MenuItem>
              {Years.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <DropdownCustom
            mother={mother}
            gender={gender}
            setDob={setDob}
            value={value}
            datas={Years}
            title={`Year`}
            setYear={setYear}
          /> */}
        </Grid>
        <Grid style={{ alignItems: "center", display: "flex" }} item xs={4}>
          {/* <DropdownCustom
            mother={mother}
            gender={gender}
            setDob={setDob}
            value={value}
            datas={months}
            title={`Month`}
            monthempty={dismon}
            setMonth={setMonth}
          /> */}
          <InputLabel id="demo-controlled-open-select-label">
            {month === "" ? "Month" : month}
          </InputLabel>
          <FormControl  className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open1}
              onClose={handleClose1}
              onOpen={handleOpen1}
              value={20}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value="">
                <em>Month</em>
              </MenuItem>
              {monthToNum.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          style={{ alignItems: "center", display: "flex" }}
          item
          xs={4}
        >
          {/* <DropdownCustom
            mother={mother}
            gender={gender}
            setDob={setDob}
            value={value}
            datas={days}
            title={`Day`}
            setDays={setDays}
          /> */}
          <InputLabel id="demo-controlled-open-select-label">
            {selectedDay === "" ? "Day" : selectedDay}
          </InputLabel>
          <FormControl  className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open2}
              onClose={handleClose2}
              onOpen={handleOpen2}
              value={""}
              onChange={handledaysetup}
            >
              <MenuItem value="">
                <em>Day</em>
              </MenuItem>
              {days.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default FilterCuc;
