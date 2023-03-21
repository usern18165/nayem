/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense, lazy } from "react";
import {
  Paper,
  Tabs,
  Tab,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Link, withRouter, Route, Switch, NavLink } from "react-router-dom";
import { Pagination, Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";

import { BACKEND_URL, BACKEND_URL_Micple_App } from "../../shared/constants/Variables";
import { adminHeader } from "../../shared/functions/Token";
import { getUserAvatar } from "../../shared/functions";
import { Spinner, AuthGuard } from "../../shared";
import { getUserInfo, getUsers } from "./Hooks";
import { UName } from "../../components/Tools";
import "./style.scss";
import Timer from "../../shared/Timeer/Timer";
import Calender from "./Calender";
import DropdownCustome from "./DropdownCustome";

const Profile = lazy(() => import("./Profile"));
// const User = lazy(() => import("./User"));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "15%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Users({ match: { url } }) {
  const sortItems = ["A-Z", "Z-A", "Oldeest", "Newest"];
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  document.title = "Users";
  const statusStates = [
    "pending",
    "approved",
    "banned",
    "rejected",
    "verified",
    "all",
  ];
  const [headerHight, setHeaderHight] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("pending");
  const [pageIndex, setPageIndex] = useState(1);
  const [updating, setUpdating] = useState(false);
  const { counts, countries } = getUserInfo();







  // need to work here
  const { users, totalUsers, working } = getUsers(
    country,
    status,
    input,
    sortBy,
    start,
    end,
    pageIndex
  );
  console.log(totalUsers);




  function clearFilter() {
    setCountry("");
    setStart("");
    setEnd("");
    setInput("");
    setSortBy("");
  }
  function updateUserStatus(id, name, value, type = '') {
    setUpdating(true);

    // only for password reset start
    if (name === 'passwordResetStatus') {
      const username = id.username;
      axios
        .post(
          `${BACKEND_URL_Micple_App}/user/auth/forgotpassword`,
          { username, type },
          { headers: adminHeader() }
        )
        .then((user) => {
          const resetExpireTime = user?.data.user.passwordResetExpires

          users.map((user) => {
            if (user.username === id.username) {
              console.log(user.username);
              user[name] = value;
              user['passwordResetExpires'] = resetExpireTime
            }
            return user;
          });
          setUpdating(false);
        })
        .catch((err) => {
          setUpdating(false);
          throw err;
        });
    } else {
      axios
        .put(
          `${BACKEND_URL}/users/${id}/status`,
          { name, value },
          { headers: adminHeader() }
        )
        .then(() => {
          users.map((user) => {
            if (user.id === id) {
              user[name] = value;
            }
            return user;
          });
          setUpdating(false);
        })
        .catch((err) => {
          setUpdating(false);
          throw err;
        });
    }
  }

  const classes = useStyles();

  // datas
  const sortByData = ["dummy", "Oldest", "Newest", "A-Z", "Z-A"];
  return (
    <div className="users">
      <Timer />
      <Switch>
        <Route exact path={url}>
          <div
            ref={(el) => setHeaderHight(el?.clientHeight)}
            className="header"
          >
            <Paper square>
              <Tabs
                indicatorColor=""
                textColor="primary"
                onChange={(e, i) => setStatus(statusStates[i])}
                value={statusStates.indexOf(status)}
              >
                {/* here under review meaning pending */}
                <Tab label={`Under Review (${counts.pending})`} />
                <Tab label={`Approved (${counts.approved})`} />
                <Tab label={`Banned (${counts.banned})`} />
                <Tab label={`Rejected (${counts.rejected})`} />
                <Tab label={`Verified (${counts.verified})`} />
                <Tab label={`All (${counts.total})`} />
              </Tabs>
            </Paper>
            {/* <Grid container className="tabs">
              <Grid style={{ padding: "0px 5px" }} item xs={1}>
                <form>
                  <input
                    placeholder="User ID"
                    style={{
                      height: "30px",
                      border: "none",
                      borderBottom: "1px solid #e4e4e4",
                      marginTop: "16px",
                    }}
                    id="outlined-basic"
                    label="User ID"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </form>
              </Grid>

             
              <Grid style={{}} item xs={2}>
                <DropdownCustome datas={sortByData} title="Country" />
                
              </Grid>

              <Grid item xs={1}>
                <DropdownCustome datas={sortByData} title="Sort by" />
                
              </Grid>

             
              <Grid style={{}} item xs={8}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "space-around",
                      display: "flex",
                    }}
                    className="dbdt"
                  >
                    <Calender position={"Start"} />
                    <Calender position={"End"} />
                    
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              <Button
                size="small"
                variant=""
                startIcon={<GrPowerReset />}
                onClick={clearFilter}
              ></Button>
            </Grid> */}
          </div>
          <div
            style={{
              height: `calc(100vh - ${headerHight}px)`,
              opacity: working || updating ? 0.5 : 1,
            }}
            className="YhdbS"
          >
            {users.length > 0 && !working ? (
              <ul className="user-list">
                {users.map((user, i) => (
                  <li key={user.id}>
                    <div className="i profile">
                      <img
                        src={getUserAvatar(user.avatar, user.gender, user.username)}
                        alt=""
                      />
                      <div className="inf">
                        <Link style={{ textDecoration: "none" }} to={`${url}/profile/${user.username}/timeline`}>
                          <h3 style={{ color: 'black' }}>
                            <UName name={user.name} verified={user.verified} />
                          </h3>
                        </Link>
                        {/* <Link to={`${url}/user/${user.id}`}>
                          <h3>
                            <UName name={user.name} verified={user.verified} />
                          </h3>
                        </Link> */}
                        <p>
                          (<strong>{user.username}</strong>) - ({user.country})
                        </p>
                      </div>
                      {/* work here  */}
                      {/* <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Store</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Campaign</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Shortner</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Locker</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Exchanger</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Wallet</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Looking for</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Education</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Laboratory</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Treatment</h4>
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/" className="nav">
                          <h4 className="branch">Investor</h4>
                        </NavLink>
                      </div> */}
                    </div>

                    {/* password reset button */}

                    {/* <button className="reset_btn">
                          Reset Password
                        </button> */}


                    <div className={(user.approved || user.rejected) ? 'i buttons' : 'i buttons2'}>
                      {/* password reset button start */}
                      {user.passwordResetStatus ?
                        <Button
                          size="small"
                          variant="contained"
                          color={"primary"}
                          onClick={() => {
                            updateUserStatus(user, "passwordResetStatus", false, 'cancel');
                          }
                          }
                          disabled={updating}
                        >
                          Undo Reset Password
                          <span>&nbsp;(Ex: {new Date(Date.parse(user.passwordResetExpires)).toLocaleTimeString()})</span>
                        </Button>
                        :
                        <Button
                          size="small"
                          variant="contained"
                          color={"primary"}
                          onClick={() => {
                            updateUserStatus(user, "passwordResetStatus", true, 'allow');
                          }
                          }
                          disabled={updating}
                        >
                          Reset Password

                        </Button>
                      }

                      {/* password reset button end */}

                      {!user.verified ? (
                        <Button
                          size="small"
                          variant="contained"
                          color="dark"
                          onClick={() =>
                            updateUserStatus(user.id, "verified", true)
                          }
                          disabled={updating}
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          style={{ background: '#0048ba', color: 'white' }}
                          onClick={() =>
                            updateUserStatus(user.id, "verified", false)
                          }
                          disabled={updating}
                        >
                          Unverified
                        </Button>
                      )}
                      {user.approved && !user.rejected && (
                        <Button
                          size="small"
                          variant="contained"
                          color={!user.banned ? "dark" : "secondary"}
                          onClick={() =>
                            updateUserStatus(user.id, "banned", !user.banned)
                          }
                          disabled={updating}
                        >
                          {user.banned ? "Undo Ban" : "Ban"}
                        </Button>
                      )}
                      {!user.approved && !user.rejected && (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              updateUserStatus(user.id, "approved", true)
                            }
                            disabled={updating}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              updateUserStatus(
                                user.id,
                                "rejected",
                                !user.rejected
                              )
                            }
                            disabled={updating}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {user.rejected && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            updateUserStatus(
                              user.id,
                              "rejected",
                              !user.rejected
                            )
                          }
                          disabled={updating}
                        >
                          Undo Rejection
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>{!working && <h3 className="notfound">No user found.</h3>}</>
            )}
            {/* {console.log(Math.ceil(totalUsers / 10))} */}
            {working && <Spinner height={30} />}
            <div className="pgntn">
              <Pagination
                color="primary"
                page={pageIndex}
                onChange={(e, page) => setPageIndex(page)}
                count={Math.ceil(totalUsers / 10)}
              />
            </div>

          </div>
        </Route>
        {/* <Route
          path={`${url}/user/:userid`}
          component={() => (
            <Suspense fallback={<Spinner height={100} />}>
              <User updateUserStatus={updateUserStatus} />
            </Suspense>
          )}
        /> */}
        <Route
          path={`${url}/profile/:username`}
          component={() => (
            <Suspense fallback={<Spinner height={100} />}>
              <Profile />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

export default AuthGuard(withRouter(Users));
