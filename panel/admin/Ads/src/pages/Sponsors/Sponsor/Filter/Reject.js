import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      "& + $track": {
        backgroundColor: theme.palette.grey[200],//focus color
        opacity: 1,
        border: "none",
        color: "blue!importantz",
      },
    },
    "&$focusVisible $thumb": {
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
    // color: 'yellow',
  },
  track: {
    borderRadius: 26 / 2,
    // border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[200],
   
    opacity: 1,

    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function Reject({onOff,approve,setApprove, reject ,setReject,unseen,setUnseen}) {
  const [state, setState] = React.useState({

    checkedB: reject,
  });
  useEffect(() => {}, [approve, reject, unseen])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if(reject === false){
        setApprove(false)
        setReject(true)
        setUnseen(false)
        
    }
    else{
        setReject(false)

    }

  };

  return (
    <div className="success">
      <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
      />
    </FormGroup>
    </div>
  );
}
