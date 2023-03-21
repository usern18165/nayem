import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Zoom, TextField, Button, DialogActions } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';
import {InputContainer} from './style.js'
function Edit({ open, close, auth, dispatch }) {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  const [username, setUsername] = useState('');
  const [position, setPosition] = useState('');
  const [id, setId] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    if (auth.username) {
      setUsername(auth.username);
    }
  }, [auth]);

  function handlePass(e){
    setPassword(e.target.value)
    if(confirmPassword && confirmPassword === e.target.value){
      setBtnDisable(true)
    } else{
      setBtnDisable(false)
    }
    if(!confirmPassword){
      setBtnDisable(true)
    }
  }

  function handleConfirmPass(e){
    setConfirmPassword(e.target.value)

    if(password && password === e.target.value){
      setBtnDisable(false)
    }
    else {
      setBtnDisable(true)
    }
    if(!password){
      setBtnDisable(true)
    }
  }
  function passTest(p) {
    return p.length >= 8 || p.length <= 32;
  }
  function onSave() {
    setWorking(true);
    const body = {
      username,
      position,
      id,
      location,
      password,
      confirmPassword
    };
   
    

    axios
      .put(`${BACKEND_URL}/admin/edit`, body, { headers: adminHeader() })
      .then(() => {
        setWorking(false);
        setUsername(body.username);
        setPassword('');
        setConfirmPassword('');
        setError('')
        dispatch({ type: 'SET_AUTH', payload: { username: body.username } });
        localStorage.setItem('a', JSON.stringify({ ...JSON.parse(localStorage.getItem('a')), username: body.username }));
        close();
      })
      .catch((err) => {
        setWorking(false);
        setPassword('');
        setConfirmPassword('')
        setError('Authentication Failed');
        throw err;
      });
  }
  function validate() {
    return password === confirmPassword
  }
  return (
    <Dialog open={open} TransitionComponent={Zoom} keepMounted onClose={close} fullWidth maxWidth='sm'>
     
       <InputContainer>
          {
            error && <h4 className="error">{error}</h4>
          }
          <input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          <input type="text" value={position} placeholder="Position" onChange={(e)=>setPosition(e.target.value)} />
          <input type="text" value={id} placeholder="ID" onChange={(e)=>setId(e.target.value)} />
          <input type="text" value={location} placeholder="Location" onChange={(e)=>setLocation(e.target.value)} />
          <input type="password" value={password} placeholder="New password" onChange={(e)=>handlePass(e)} />
          <input type="password" value={confirmPassword} placeholder="Repeat password" onChange={(e)=>handleConfirmPass(e)} />
          <div>
            
          
              <button disabled={btnDisable} style={btnDisable ? {backgroundColor:'lightgray'}:{backgroundColor:'#0048ba'}}  onClick={onSave}>Save</button>
            
          </div>
      </InputContainer>
    </Dialog>
  );
}

export default connect((store) => ({ auth: store.auth }))(Edit);
