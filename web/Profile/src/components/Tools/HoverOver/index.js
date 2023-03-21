import React, { Fragment, useState } from 'react';
import { Tooltip, Typography, Fade } from '@material-ui/core';
import { MdReply } from 'react-icons/md';
import { BsFillForwardFill } from 'react-icons/bs';
import { IoIosCopy } from 'react-icons/io';
export default ({ children, title, placement = 'top' }) => {
  const [entered, setEntered] = useState(false);
  // console.log(entered)
  return (
    <Tooltip
      placement={placement}
      leaveDelay ={2000}
      enterNextDelay={1500}
    
      title={
        <Fragment>
          <Typography component='h4' variant='body1'>
            {title}
          </Typography>
        </Fragment>
      }
      TransitionComponent={Fade}
    >
      {children}
    </Tooltip>
    
  );
};
