import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { PROMOTIONS_BACKEND_URL } from "../../../shared/constants/Variables";

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

export default function Success({ id, status }) {


  const [state, setState] = React.useState({
    checkedB: status == 0 ? false : true,

  });

  useEffect(() => {

    let unmount = false;
    if (!unmount) {
      setState({
        checkedB: status == 0 ? false : true,
      })
    }

    return () => {
      unmount = true;
    }

  }, [status])


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });



    // here chage the status to active or rejected 

    if (event.target.checked) {
      console.log("checked true", event.target.checked);
      console.log(id, status, "id of ads ");


      // let body = {
      //   country: selectedItem
      // }

      // axios.patch(`${PROMOTIONS_BACKEND_URL}/add/getAdds`, body,
      //   { headers: adminHeader() }
      // ).then(({ data }) => {
      //   console.log("username", data?.userName);
      //   setUserName(data?.userName);
      // }).catch((err) => {
      //   console.log("error in country select", err);
      // })


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
