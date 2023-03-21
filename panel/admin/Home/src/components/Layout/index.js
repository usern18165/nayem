import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Menu, ButtonGroup, Button, MenuItem, Badge } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { ChatusReceived, ChatusSend } from "../../assets/sounds";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { Left, Profile, Nav, Body, Container, Sidebar } from "./style";
import { adminHeader, decodeToken } from "../../shared/functions/Token";
import { fetchCounts, closeMailCompose } from "../../store/site/action";
import { logout } from "../../store/auth/action";
// import AdminImg from '../../assets/Admin.png';
import socket1 from "../../sockets/socket";
import socket0 from "../../sockets";
import Compose from "./CreateMail";
import Edit from "./Edit";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
function Indicator({ children, count }) {
  return (
    <Badge badgeContent={count} color={count > 0 ? "secondary" : "default"}>
      {children}
    </Badge>
  );
}

socket0.connect();
socket1.connect();

function Layout({
  auth: { name, username },
  site: {
    counts,
    alerm,
    mail: { address, compose },
  },
  dispatch,
  children,
}) {
  console.log("our all counts", counts);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let receivedAudio = useRef();
  let sentAudio = useRef();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/admin/counts`, { headers: adminHeader() })
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchCounts(data));
      })
      .catch((err) => {
        throw err;
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!!alerm.sent) {
      sentAudio.play();
    }
  }, [alerm.sent]);
  useEffect(() => {
    if (!!alerm.received) {
      receivedAudio.play();
    }
  }, [alerm.received]);
  function onOpenEdit() {
    setAnchorEl(null);
    setEdit(true);
  }
  function onLogout() {
    setAnchorEl(null);
    dispatch(logout());
    window.location.assign("/");
  }

  return (
    <Container>
      <Left>
        <Sidebar>
          <Profile>
            {decodeToken()?.type === "admin" ? (
              <AiOutlineSetting
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  cursor: "pointer",
                }}
                onClick={onOpenEdit}
              />
            ) : (
              ""
            )}

            <BiLogOutCircle
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                cursor: "pointer",
              }}
              onClick={onLogout}
            />

            {/* <img alt={username} src={AdminImg} /> */}
            <h2 style={{ marginBottom: "0px" }}>{name}</h2>
            {/* <h5>(CEO)</h5> */}
            <p
              style={{
                fontSize: "14px",
                marginTop: "2px",
                marginBottom: "0px",
              }}>
              {username}
            </p>
            {/* <p style={{ fontSize: '14px', marginBottom: '10px', marginBottom: '0px' }}>Dhaka, Bangladesh</p> */}
          </Profile>

          {decodeToken()?.type === "admin" ? (
            <Nav>
              <NavLink exact to="/dashboard">
                Dashboard
              </NavLink>
              {/* <a href="/dashboard">Dashboard</a>
              <a href="/notices">Notice</a> */}
              <NavLink to="/notices">Notice</NavLink>
              <NavLink to="/users">
                User <span>({counts.users.size})</span>
              </NavLink>
              <NavLink to="/ads">Ads</NavLink>
              <NavLink to="/mails">
                Mail <span>({counts.mails.size})</span>
              </NavLink>
              <NavLink to="/chats">
                Chat <span>({counts.messages.size})</span>
              </NavLink>
              {/* <NavLink to='/calling'>Calling</NavLink> */}

              {/* <NavLink to='/monitoring'>Management</NavLink> */}
              <NavLink to="/reports">
                Report <span>({counts.reports.size})</span>
              </NavLink>
              <NavLink to="/recycles">Recycle</NavLink>
              {/* manage  */}
              <NavLink to="/management">Management</NavLink>
              <NavLink to="/notes">Notes</NavLink>
              <NavLink to="/restricted">Restrictions</NavLink>
              <NavLink to="/adds-rate">Ads Rate</NavLink>
              <NavLink to="/campaign">Campaigns</NavLink>
            </Nav>
          ) : decodeToken()?.type === "dashboard" ? (
            <Nav>
              <NavLink exact to="/dashboard">
                Dashboard
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "notice" ? (
            <Nav>
              <NavLink exact to="/notices">
                Notice
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "user" ? (
            <Nav>
              <NavLink to="/users">
                User <span>({counts.users.size})</span>
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "ads" ? (
            <Nav>
              <NavLink exact to="/ads">
                Ads
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "mail" ? (
            <Nav>
              <NavLink exact to="/mails">
                Mail <span>({counts.mails.size})</span>
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "modarator" ? (
            <Nav>
              <NavLink to="/chats">
                Chat <span>({counts.messages.size})</span>
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "report" ? (
            <Nav>
              <NavLink to="/reports">
                Report <span>({counts.reports.size})</span>
              </NavLink>
            </Nav>
          ) : decodeToken()?.type === "recycle" ? (
            <Nav>
              <NavLink to="/recycles">Recycle</NavLink>
            </Nav>
          ) : decodeToken()?.type === "notes" ? (
            <Nav>
              <NavLink to="/notes">Notes</NavLink>
            </Nav>
          ) : decodeToken()?.type === "restrictions" ? (
            <Nav>
              <NavLink to="/restricted">Restrictions</NavLink>
            </Nav>
          ) : decodeToken()?.type === "adsRate" ? (
            <Nav>
              <NavLink to="/adds-rate">Ads Rate</NavLink>
            </Nav>
          ) : decodeToken()?.type === "campaign" ? (
            <Nav>
              <NavLink to="/campaign">Ads Rate</NavLink>
            </Nav>
          ) : (
            ""
          )}
        </Sidebar>
      </Left>

      <Body>{children}</Body>

      <Edit user={username} open={edit} close={() => setEdit(false)} />
      <audio src={ChatusReceived} ref={(ref) => (receivedAudio = ref)} />
      <audio src={ChatusSend} ref={(ref) => (sentAudio = ref)} />
      {compose && (
        <Compose user={address} close={() => dispatch(closeMailCompose())} />
      )}
    </Container>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(
  Layout
);
