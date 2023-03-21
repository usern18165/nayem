import React, { useState, useRef } from 'react';
import { MoreVert, Public, People, Lock } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../../../shared/constants/Variables';
import { adminHeader } from '../../../../../shared/functions/Token';
import { getUserAvatar } from '../../../../../shared/functions';
import { UName } from '../../../../../components/Tools';
import { When } from '../../../../../components';
import './style.scss';
import { RiPushpin2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

import {
  editPrivacy,
  deletePost,
  editContent,
  hidePost,
} from "../../../../../sockets/emit";
import { getUrl } from "../../../../../shared/functions";
export default ({ user: { name, username, avatar, gender, verified }, privacy, date, status, edited, rejected, postId, media }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reject, setReject] = useState(rejected);
  const [privacyOpt, setPrivacyOpt] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState('');
  const [fileName, setFileName] = useState('');
  let downloadRef = useRef()
  function toggleReject() {
    setAnchorEl(null);
    axios
      .put(`${BACKEND_URL}/post/${postId}`, { rejected: !reject }, { headers: adminHeader() })
      .then(() => {
        setReject();
      })
      .catch((err) => {
        throw err;
      });
  }
  function onEdit() {
    setEdit(true);
    setAnchorEl(null);
  }
  function onSave(val) {
    editContent(postId, val);
    setEdit(false);
  }
  function onCopy(){
    navigator.clipboard.writeText(getUrl(media[0].url, username))
    // alert.success("Copied")
    setAnchorEl(null)
  }
   function onDownload(){
    fetch(getUrl(media[0].url, username))
      .then(res => res.blob()) 
      .then(blob => {
        console.log(media[0].id+'.'+media[0].types2, 'filename');
        console.log(media[0].types2, 'file extension');
        let objectURL = URL.createObjectURL(blob);
        setDownloadFile(objectURL)
        setFileName(media[0].id+'.'+media[0].types2)
        setAnchorEl(null)
        downloadRef.current.click()
    });
  }

  function onDelete() {
    deletePost(postId);
    setDeleteModal(false);
  }
  function onHide() {
    hidePost(postId);
    setAnchorEl(null);
  }
  function changePrivacy(p) {
    editPrivacy(postId, p);
    setPrivacyOpt(null);
  }
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className='top'>
      <div className='UserInfo'>
        <div className='userProfile'>
          <img className='userImg' src={getUserAvatar(avatar, gender, username)} alt='' />
          <div className='userInfo'>
            <a target='blank' href={`/${username}`} className='userName'>
              <UName name={name} verified={verified} /> {!!status && <small>{status}</small>}
            </a>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className='timeAgo'>
                <When date={date} />
              </p>
              <IconButton style={{ padding: '0 10px' }} disabled>
                {privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}
              </IconButton>
              {edited && <span style={{ fontSize: '12px' }}>Edited</span>}
            </div>
          </div>
        </div>
      </div>
      <div className='opts'>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={toggleReject}>{reject ? 'Undo Reject' : 'Reject'}</MenuItem>

          
        </Menu>
      </div>
    </div>
  );
};
