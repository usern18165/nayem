import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

// arrow/
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function DropdownCustome({ title, datas }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectInput, setSelectInout] = useState(title);
  const inputsetHandler = (inputData) => {
    setAnchorEl(null);
    setSelectInout(inputData);
  };

  return (
    <div>
      <Button
        style={{
          borderBottom: "1px solid #e4e4e4",
          textTransform: "none",
          borderRadius: "0px",
          marginTop: "8px",
          width: "100%",
        }}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {title} <ArrowDropDownIcon />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* {datas.map((data) => {})} */}
        <MenuItem onClick={() => inputsetHandler("data")}>{"data"}</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
