import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '15%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const months = ['Jan', 'Fab','March','April','Jun','Jul']
const Years = [2021,2022,2023,2024,2025,2026,2027,2028]

function ChartFilter() {
    const classes = useStyles();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
  
    const handleChange = (event) => {
        setMonth(event.target.value);
    };
    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };
  
    return (
      <div>
        
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={month}
            onChange={handleChange}
            label="Month"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
                months.map((month, index) => <MenuItem key={index} style={{textTransform: "capitalize "}} value={index}>
                    {month}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={year}
            onChange={handleChangeYear}
            label="year"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
                Years.map((Year, index) => <MenuItem key={index} value={12}>{Year}</MenuItem>)
            }
          </Select>
        </FormControl>
    
      </div>
    );
  }

export default ChartFilter;
