import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import { Twitter, Facebook, LinkedIn, Instagram, Link } from '@material-ui/icons';
import styled from 'styled-components';
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdLink } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { HoverOver } from '../../../../../components/Tools';
import { getUrl } from '../../../../../shared/functions';
import VK from '../../../../../assets/reactions/VK.png';

const shares = [
  { name: 'facebook', Icon: Facebook, color: '#3b5998' },
  { name: 'twitter', Icon: Twitter, color: '#00acee' },
  { name: 'instagram', Icon: Instagram, color: '#3f729b' },
  { name: 'linkedin', Icon: LinkedIn, color: '#0e76a8' },
];

export default ({ open, close, postId, username }) => {
  function openWith(name) {
    window.open(getUrl(`/api/share?to=${name}&post=/${username}/timeline?post=${postId}`), 'blank');
  }
  return (
    <div>
        
    </div>
  );
};

const IconContainer = styled('div')`
  display: flex;
  button {
    margin: auto;
    span {
      svg {
        font-size: 5rem;
        color: #fff;
      }
      img {
        height: 50px;
        width: auto;
      }
    }
  }
`;
