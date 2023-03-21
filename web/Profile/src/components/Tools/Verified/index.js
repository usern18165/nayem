import React, {useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Verified from '../../../assets/profile/Verified.png';
import { HoverOver } from '..';
import { Link } from 'react-router-dom';

export default ({ name, verified, width = 12 }) => {

  // const [edit, setEdit] = useState('<a href="https://www.w3schools.com">Read</a>');

  return (
    <span
      // style={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   // lineHeight: 1,
      //   fontSize: '20px',
      //   fontWeight: '500',
      // }}
      
      style={{
        display: 'flex',
        alignItems: 'center',
        // lineHeight: 1,
        // fontSize: '20px',
        // fontWeight: '500',
      }}

    >

{/* <div dangerouslySetInnerHTML={{ __html: edit }} /> */}

      {name?.join(' ')}
      {verified && (
        <HoverOver placement='right' title='Profile Verified'>
          <CheckCircleIcon
            style={{
              marginLeft: 5,
              marginTop:5,
              width,
              height: 'auto',
              color:'#0b99cf'
            }}
            alt=''
            src={Verified}
          ></CheckCircleIcon>
        </HoverOver>
      )}
    </span>
  );
};
