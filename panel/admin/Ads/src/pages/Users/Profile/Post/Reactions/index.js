import React, {useState} from 'react';
import Share from "../Share";
import { RiShareForwardLine } from "react-icons/ri";
import { CommentIcon, ShareIcon, BoostIcon, AngryIcon, HahaIcon, LikeIcon, LoveIcon, SadIcon, WowIcon } from "../../../../../assets/reactions";
import { makeStyles } from "@material-ui/core/styles";
import Payment from "./Payment";
import { reactPost, unreactPost } from "../../../../../sockets/emit";
import {Menu} from "@material-ui/core";
import {
  AngryGif,
  HahaGif,
  LikeGif,
  LoveGif,
  SadGif,
  WowGif,
} from "../../../../../assets/reactions/gif";
import './style.scss';

const reactions = [
  { id: 'like', icon: LikeIcon, gif:LikeGif },
  { id: 'love', icon: LoveIcon, gif:LoveGif },
  { id: 'wow', icon: WowIcon, gif:WowGif },
  { id: 'sad', icon: SadIcon, gif: SadGif },
  { id: 'haha', icon: HahaIcon, gif:HahaGif },
  { id: 'angry', icon: AngryIcon, gif:AngryGif },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
export default ({ reacts, comments, setActive, active, myreact, shares, postId, boosts }) => {
  const [boostModal, setBoostModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const reactions = [
    { id: "like", icon: LikeIcon, gif: LikeGif },
    { id: "love", icon: LoveIcon, gif: LoveGif },
    { id: "wow", icon: WowIcon, gif: WowGif },
    { id: "sad", icon: SadIcon, gif: SadGif },
    { id: "haha", icon: HahaIcon, gif: HahaGif },
    { id: "angry", icon: AngryIcon, gif: AngryGif },
  ];
  function onReaction(id) {
    if (myreact === id) {
      unreactPost(postId);
    } else {
      reactPost(postId, id);
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
   
    <div className="CommentIconsContainer">
      <div className="CommentIconsWrapper">
        {reactions.map(({ id, gif, icon }, i) => (
          <div  key={i} className="CommentIcon">
            <div onClick={() => onReaction(id)} style={{cursor:'pointer'}}>
              <img
                onMouseEnter={() => {}}
                src={myreact === id ? gif : icon}
                alt=""
                
              />
              <p style={{ textTransform: "capitalize" }}>{id}</p>
            </div>
            <p>{reacts ? reacts[id] : 0}</p>
          </div>
        ))}

        <div className="CommentIcon">
          <div style={{cursor:'pointer'}} onClick={() => setActive(!active)} >
            <img src={CommentIcon} alt="" />
            <p>Comments</p>
          </div>
          <p>{comments || 0}</p>
        </div>
        <div className="CommentIcon">
          {/* <img src={ShareIcon} alt="" onClick={() => setShareModal(true)} />
           */}
          <div style={{cursor:'pointer'}}  >
            {/* <RiShareForwardLine style={{fontSize:'35px !important'}}
              onClick={() => setShareModal(true)}
            /> */}
            <img src={ShareIcon} alt="" />
            <p>Share</p>
          </div>
          <p>{shares || 0}</p>
        </div>
        <div className="CommentIcon">
          <div style={{cursor:'pointer'}}>
            <img src={BoostIcon} alt="" onClick={() => setBoostModal(true)} />
            <p>Promote</p>
          </div>
          <p>{boosts || 0}</p>
        </div>
      </div>
      <Payment  close={() => setBoostModal(false)} />
      {/* <Share
        close={() => setShareModal(false)}
        open={shareModal}
        postId={postId}
        username={username}
      /> */}
      
      <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={origin}
          transformOrigin={origin}
        >
          <Share />
        </Menu>
    </div>
  );
};
