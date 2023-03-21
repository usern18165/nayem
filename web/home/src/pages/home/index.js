// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { DialogContent, Zoom, Dialog } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { parse } from "query-string";
import axios from "axios";

import {
  SupportIcon,
  ChatIcon,
  MailIcon,
  CameraIcon,
  VoiceIcon,
  LogoIcon,
  CallIcon,
} from "../../assets/home";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { MsgReceived, MsgSent } from "../../assets/sounds";
import {
  closeRingReceivedAlerm,
  getSiteInfo,
  ringReceivedAlerm,
} from "../../store/site/action";
import { HoverOver } from "../../components/Tools";
// import { getUrl } from "../../shared/functions"; //this one not used here
import { About, Downloads } from "./Dialogs";
import socket from "../../sockets";
import Chat from "./Support/Chat";
import Mail from "./Support/Mail";
import Call from "./Support/Call";
import Result from "./Result";
import Login from "./Login";
import "./style.scss";

import {
  MainUI,
  BottomUI,
  BottomLayer,
  BottomOptions,
  CenterUI,
  CustomInput,
  CameraImg,
  VoiceImgDiv,
  CustomSearchButton,
  ContactOption,
  Notice,
} from "./styles";

function Home(props) {
  const {
    location: { search },
    history,
    dispatch,
    site: {
      location: {
        country: { name, label },
        city,
      },
      dialCode,
      supportPhone,
      liveChat: { roomId, messages },
      alerm,
    },
    auth: { loggedIn },
  } = props;
  document.title = "Search Engine with Social Communication and AIO Platform";
  const [query, setQuery] = useState(parse(search).q);
  const [tab, setTab] = useState(parse(search).t);
  const [support, setSupport] = useState(false);
  const [chat, setChat] = useState(false);
  const [mail, setMail] = useState(false);
  const [call, setCall] = useState(false);
  const [input, setInput] = useState(parse(search).q);
  const [login, setLogin] = useState(false);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [openAbout, setOpenAbout] = useState(false);
  // const [openAdvertise, setOpenAdvertise] = useState(false);
  const [openDownloads, setOpenDownloads] = useState(false);
  const [notice, setNotice] = useState("");
  let receivedAudio = useRef();
  let sentAudio = useRef();
  useEffect(() => {
    const { t, q, l } = parse(search);
    setTab(t);

    setQuery(q);
    if (!q) {
      history.push("/");
    }
    if (l === "now") {
      setLogin(true);
    }
  }, [search]);

  useEffect(() => {
    if (!name || !label || !dialCode || !supportPhone || !city) {
      dispatch(getSiteInfo());
      //Sending ip with dispatch
      // const populateData = (data) => {
      //   if (data.ip) {
      //   } else {
      //     console.log('Please use a valid network');
      //   }
      // }

      // // Detecting ip
      // function axiosTest(populateData) {
      //   axios.get('https://api.ipify.org/?format=json')
      //     .then(function (response) {
      //       populateData(response.data);

      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }

      // axiosTest(populateData)
    }
  }, []);

  // Perviously left and right ads api call
  // useEffect(() => {
  //   if (leftItems.length < 1) {
  //     axios
  //       .get(`${BACKEND_URL}/api/front/home/left`)
  //       .then(({ data }) => setLeftItems(data))
  //       .catch((err) => err);
  //   }
  //   if (rightItems.length < 1) {
  //     axios
  //       .get(`${BACKEND_URL}/api/front/home/right`)
  //       .then(({ data }) => setRightItems(data))
  //       .catch((err) => err);
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/front/notice`)
      .then(({ data }) => setNotice(data))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (!!alerm.sent) {
      sentAudio.play();
    }
    console.log("alerm.sent", alerm.sent);
  }, [alerm.sent]);

  useEffect(() => {
    if (!!alerm.received) {
      receivedAudio.play();
    }
    console.log("alerm.received", alerm.received);
  }, [alerm.received]);

  const supportOptions = [
    {
      text: "Chat us",
      image: ChatIcon,
      popUpText: "chatWithUs",
      clickHandler: function () {
        socket.emit("user_open_support_chat", new Date().toISOString());
        setSupport(false);
        setChat(true);
      },
    },
    {
      text: "Call us",
      image: CallIcon,
      popUpText: "callUs",
      clickHandler: function () {
        setSupport(false);
        setCall(true);
      },
    },
    {
      text: "Email us",
      image: MailIcon,
      popUpText: "emailUs",
      clickHandler: function () {
        setSupport(false);
        setMail(true);
      },
    },
  ];
  function closeSupport() {
    setSupport(true);
    setChat(false);
    setMail(false);
    setCall(false);

    dispatch(closeRingReceivedAlerm());

    socket.emit("user_chat_close", () => {
      console.log("close caling");
    });
  }
  const [historyArray, setHistoryArray] = useState(["asadasd", "asdasd"]);
  function handleSearch() {
    setHistoryArray((historyArray) => [...historyArray, input]);
    console.log("input", input);
  }
  console.log("historyArray", historyArray);

  const CountryData = (data) => {
    setChat(false);
    setMail(false);
    setCall(false);
    setSupport(true);
  };

  return (
    // <HomePageSkeleton />
    <MainUI>
      {chat && (
        <Chat close={closeSupport} roomId={roomId} messages={messages} />
      )}
      {mail && <Mail close={closeSupport} />}
      {call && (
        <Call close={closeSupport} closeModal={() => setSupport(false)} />
      )}

      <Login login={login} />

      {/* Center UI */}
      <CenterUI>
        {/* Search */}
        <div id="resultPage" className={!!query ? "sdby resultMode " : "sdby "}>
          <div className="mnsb">
            {/* <Link to="/"> */}
            <img
              className="simg"
              src={LogoIcon}
              alt=""
              onClick={() => (window.location.href = "/")}
            />
            {/* </Link> */}
            <form
              className="sfrm "
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              onSubmit={(e) => {
                e.preventDefault();
                if (!!input) {
                  setQuery(input);
                  history.push(`/?t=${tab || "web"}&q=${input}`);
                } else {
                  history.push("/");
                }
              }}>
              <div className="inputDiv">
                <CustomInput
                  className=""
                  placeholder="What do you want finding?"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <CameraImg>
                  <HoverOver title="Not Available">
                    <img src={CameraIcon} alt="Camera" />
                  </HoverOver>
                </CameraImg>
                <VoiceImgDiv>
                  <HoverOver title="Not Available">
                    <img src={VoiceIcon} alt="Voice" />
                  </HoverOver>
                </VoiceImgDiv>
              </div>

              {/* {input && (
                <div className="searchHistory">
                  {historyArray.map((single) => (
                    <div
                      className="SearchHistryDiv"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        onClick={(e) => setInput(single)}
                        className="singleItem"
                      >
                        {single}
                      </p>
                      <p className="cross">X</p>
                    </div>
                  ))}
                </div>
              )} */}

              <CustomSearchButton type="Submit">Search</CustomSearchButton>
            </form>
            {!!query && (
              <Result
                country={name}
                query={query}
                tab={tab}
                loggedIn={loggedIn}
                setTab={(t) => {
                  setTab(t);
                  history.push(`/?t=${t}&q=${query}`);
                }}
              />
            )}
          </div>
        </div>
      </CenterUI>

      {/* Bottom UI */}
      <BottomUI>
        {!!notice &&
          window.location.protocol + "//" + window.location.host + "/" ==
            window.location.href && (
            <Notice>
              <div>{notice}</div>
            </Notice>
          )}
        <div className="customerCare">
          <div className="contact" onClick={() => setSupport(true)}>
            <img src={SupportIcon} alt="Support us" />
            <div className="link text-dark">Support us</div>
            {/* <div className="copyright">&#169; Copyright 2022</div> */}
          </div>
        </div>
        <div className="copyright">Copyright &#169;2022</div>
        <BottomLayer>
          <div className="bottomFlex">
            <div>
              {!!label && (
                <>
                  {!!city && `${city}, `}
                  {label}
                </>
              )}
            </div>
            <BottomOptions style={{ marginRight: "10px" }}>
              {/* <div className="inlineBlock" style={{ cursor: "pointer" }}>
                <Link to='/advertising-policy' style={{ "text-transform": "capitalize", "color": "#333", "font-weight": "700" }}>
                  Advertises</Link>
              </div> */}

              {/* about, privacy, terms area start*/}

              {/* career  */}

              <div
                // className="inlineBlock"
                style={{ cursor: "pointer" }}>
                <Link
                  to="/about"
                  style={{ color: "#333", "font-weight": "700" }}>
                  About us
                </Link>
              </div>

              <div
                // className="inlineBlock"
                style={{ cursor: "pointer" }}>
                <Link
                  to="/career"
                  style={{ color: "#333", "font-weight": "700" }}>
                  Career
                </Link>
              </div>

              <div className="inlineBlock" style={{ cursor: "pointer" }}>
                <Link
                  to="/privacy"
                  style={{
                    "text-transform": "capitalize",
                    color: "#333",
                    "font-weight": "700",
                  }}>
                  Privacy Policy
                </Link>
              </div>
              <div className="inlineBlock" style={{ cursor: "pointer" }}>
                <Link
                  to="/terms-and-conditions"
                  style={{
                    "text-transform": "capitalize",
                    color: "#333",
                    "font-weight": "700",
                  }}>
                  Terms & Conditions
                </Link>
              </div>
              {/* about, privacy, terms area end*/}

              <div
                className="inlineBlock"
                style={{ cursor: "pointer" }}
                onClick={() => setOpenDownloads(true)}>
                Downloads
              </div>
            </BottomOptions>
          </div>
        </BottomLayer>
      </BottomUI>

      {/* <Advertise open={openAdvertise} close={() => setOpenAdvertise(false)} /> */}
      {/* <About open={openAbout} close={() => setOpenAbout(false)} /> */}
      <Downloads open={openDownloads} close={() => setOpenDownloads(false)} />

      <Dialog
        TransitionComponent={Zoom}
        open={support}
        onClose={() => setSupport(false)}
        maxWidth="sm"
        fullWidth>
        <DialogContent className="dialogue-grid">
          <ContactOption>
            {supportOptions.map((item, i) => (
              <div className="option" key={i} onClick={item.clickHandler}>
                <div className="flexBox">
                  <img src={item.image} alt="chat" />
                  <div className="text-dark">{item.text}</div>
                </div>
              </div>
            ))}
          </ContactOption>
        </DialogContent>
      </Dialog>
      <audio src={MsgReceived} ref={(ref) => (receivedAudio = ref)} />
      <audio src={MsgSent} ref={(ref) => (sentAudio = ref)} />
    </MainUI>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(
  withRouter(Home)
);
