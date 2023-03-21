import React from "react";
import { Avatar, Button } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import "./style.scss";
import { getUserAvatar } from "../../../../../shared/functions";

const ContactualPromotionAds = ({ item, loggedIn }) => {
  const history = useHistory();

  return (
    <>
      <span className="ads-text">Sponsored</span>

      <Button
        onClick={() => {
          if (loggedIn) {
            history.push(`/${item?.userName}`);
          } else {
            history.push("/signup");
          }
        }}>
        <Avatar
          style={{ border: "1px solid #0009" }}
          alt="profileImage"
          src={getUserAvatar(item?.adAvater, "male", item?.userName)}
        />
      </Button>

      <a className="contactual-ads-sections" href={item?.adUrl} target="_blank">
        <div className="ads-title">{item?.adTitle}</div>
        <div className="ads-description">{item?.description}</div>
      </a>
    </>
  );
};

export default ContactualPromotionAds;
