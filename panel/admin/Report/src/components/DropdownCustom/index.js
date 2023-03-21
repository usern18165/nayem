
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import '../style.scss'
const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function({
  mother,
  gender,
  value,
  title,
  datas,
  setMonth,
  setYear,
  setDays,
  monthempty,
}) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  datas.length === 12
    ? setMonth(age)
    : datas.length === 82
    ? setYear(age)
    : setDays(age);

  return (
    <div>
      <FormControl disabled={!mother} className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Hwlo</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{title}</em>
          </MenuItem>
          {datas.map((data) => (
            <MenuItem value={data}>{data}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
