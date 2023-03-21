import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import DropdownCustome from "./DropdownCustome";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "15%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const months = ["Jan", "Fab", "March", "April", "Jun", "Jul"];
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

function Calender({ position }) {
  const classes = useStyles();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDays] = useState("");

  //   month changer
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const handleChangeDay = (event) => {
    setDays(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <div
      style={{
        height: "100%",
        // width: "80%",
        // padding: "0px 20px",
        margin: "0px 20px",
        // border: "1px solid red",
        justifyContent: "space-around",
        display: "flex",
        flex: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid style={{}} item xs={4}>
          <DropdownCustome datas={month} title={`${position} Year`} />
        </Grid>
        <Grid style={{}} item xs={4}>
          <DropdownCustome datas={year} title={`${position} Month`} />
        </Grid>
        <Grid style={{}} item xs={4}>
          <DropdownCustome datas={day} title={`${position} Day`} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Calender;
