import React, { useState, useEffect, Children } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { AuthGuard } from "../../shared";
import Sponsor from "./Sponsor";
import "./styles.scss";
import Rejection from "./Modal/Rejection/Rejection";
import Success from "./Sponsor/success";

import axios from "axios";
import {
  BACKEND_URL_Micple_App,
  PROMOTIONS_BACKEND_URL,
} from "../../shared/constants/Variables";
import { adminHeader } from "../../shared/functions/Token";
import Reject from "./Sponsor/Filter/Reject";
import AdsFilter from "./Filter/AdsFilter";
import AdDetails from "./AdDetails/AdDetails";
import DeleteModal from "../../shared/DeleteModal/DeleteModal";

const Headers = (
  <Grid className="ads-header-sections" container>
    <Grid className="all-header" item xs={1}>
      Country
    </Grid>
    <Grid className="all-header" item xs={1}>
      {" "}
      Username
    </Grid>

    <Grid className="all-header" item xs={2}>
      Ads ID
    </Grid>

    {/* All details data  header sactions */}
    <Grid className="all-header" item xs={3}>
      Details
    </Grid>

    <Grid className="all-header" item xs={1}>
      Target People
    </Grid>

    <Grid className="all-header" item xs={2}>
      Transcation ID{" "}
    </Grid>

    <Grid className="all-header" item xs={1}>
      Notes
    </Grid>

    <Grid className="all-header" item xs={1}>
      Status
    </Grid>
  </Grid>
);

function Sponsors({ match: { url }, history: { push } }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [country, setCountry] = useState([]);
  const [userName, setUserName] = useState([]);
  const [adIds, setAdIds] = useState([]);
  const [selectedPostData, setSelectedPostData] = useState([]);
  const [transcationId, setTranscationId] = useState("");
  const [notes, setNotes] = useState("");
  const [report, setReport] = useState("");
  const [deleteId, setDeleteId] = useState("");

  //search filter trnscation and notes
  const [searchFilter, setSearchFilter] = useState({});

  //boolean for filter active and deactive
  const [isDisabled, setIsDisabled] = useState({
    isActiveUserName: true,
    isActiveAdId: true,
    isActiveStaus: true,
    isActiveTranscationId: true,
    isActiveNotes: true,
  });

  //Rejected modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //delete modal
  const [deleteShow, setDeleteShow] = useState(false);

  const handleDeleteShow = (id) => {
    setDeleteId(id);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteId("");
    setDeleteShow(false);
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      axios
        .get(`${PROMOTIONS_BACKEND_URL}/country?sort=country_name`, {
          headers: adminHeader(),
        })
        .then(({ data }) => {
          console.log("data all country", data?.data);
          setCountry(data?.data);
        });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    if (selectedItem && !unmounted) {
      setSelectedUser(null);
      getCountryWiseUsers();
    }

    return () => {
      unmounted = true;
    };
  }, [selectedItem]);

  useEffect(() => {
    let unmounted = false;

    if (selectedPost && !unmounted) {
      getAdidwisePaymentAndFilterAds();
    }

    return () => {
      unmounted = true;
    };
  }, [selectedPost]);

  useEffect(() => {
    let unmounted = false;

    if (selectedUser && !unmounted) {
      getUserWiseAdIds();
    }
    return () => {
      unmounted = true;
    };
  }, [selectedUser]);

  //get country wise users
  const getUserWiseAdIds = () => {
    let body = {
      fields: "postId addId status",
      userName: selectedUser,
      country: selectedItem,
      sortBy: -1,
    };

    axios
      .get(`${PROMOTIONS_BACKEND_URL}/add/filter-adds`, {
        params: body,
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setAdIds(data?.data);
      })
      .catch((err) => {
        console.log("error happen in user select", err);
      });
  };

  // get user name wise ad id
  const getCountryWiseUsers = () => {
    let body = {
      country: selectedItem,
    };
    axios
      .post(`${PROMOTIONS_BACKEND_URL}/add/getAdds`, body, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        // setAdIds([]);
        // setSelectedPostData([]);
        // setTranscationId('');
        // setNotes('');

        setUserName(data?.userName);
      })
      .catch((err) => {
        console.log("error in country select", err);
      });
  };

  // get ad id wise both payment and filter ads(ad descriptions)
  const getAdidwisePaymentAndFilterAds = () => {
    let body = {
      addId: selectedPost,
    };

    // get payment details using add id
    let payment = {
      add_id: selectedPost,
    };

    axios
      .get(`${PROMOTIONS_BACKEND_URL}/add/filter-adds`, {
        params: body,
        headers: adminHeader(),
      })
      .then(({ data }) => {
        setSelectedPostData(data?.data);
      })
      .catch((err) => {
        console.log("error happen in user select", err);
      });

    axios
      .get(`${PROMOTIONS_BACKEND_URL}/payment/filter-payments`, {
        params: payment,
        headers: adminHeader(),
      })
      .then(({ data }) => {
        const paymentId = data?.data[0];

        setTranscationId(paymentId?.transcation_id);
        setNotes(paymentId?.notes);
      })
      .catch((err) => {
        console.log("error happen in select users", err);
      });
  };

  // status wise addId filter
  const getStatuswiseAdIds = (adsstatus) => {
    let body = {
      userName: selectedUser,
      country: selectedItem,
      status: adsstatus,
    };

    console.log("this is the adsstuts", adsstatus);

    axios
      .get(`${PROMOTIONS_BACKEND_URL}/add/filter-adds`, {
        params: body,
        headers: adminHeader(),
      })
      .then(({ data }) => {
        console.log(" status wise post id ", data?.data);
        setSelectedPost(null);
        setSelectedPostData([]);
        setAdIds(data?.data);
      })
      .catch((err) => {
        console.log("error happen in user select", err);
      });
  };

  // search/filter  handlers for trnascation and notes
  const searchHandler = () => {
    axios
      .get(`${PROMOTIONS_BACKEND_URL}/add/transaction-notes-wise-addId`, {
        params: searchFilter,
        headers: adminHeader(),
      })
      .then(({ data }) => {
        console.log(" status wise ads id ", data?.data);
        setSelectedPost(null);
        setSelectedPostData([]);
        setAdIds(data?.data);
      })
      .catch((err) => {
        console.log("error happen in user select", err);
      });
  };

  // Filter issues
  const onInputChange = (e) => {
    if (e.target.name === "country") {
      setIsDisabled({
        ...isDisabled,
        isActiveUserName: false,
      });

      setSelectedItem(e.target.value);
    } else if (e.target.name === "username") {
      setIsDisabled({
        ...isDisabled,
        isActiveAdId: false,
        isActiveStaus: false,
        isActiveTranscationId: false,
        isActiveNotes: false,
      });

      setSelectedUser(e.target.value);
    } else if (e.target.name === "addId") {
      setSelectedPost(e.target.value);
    } else if (e.target.name === "status") {
      // console.log("status is clicked", e.target.value);
      // setStatus(e.target.value);
      let status = e.target.value;
      getStatuswiseAdIds(status);
    }
  };

  // Rejected functions
  const rejectedAds = (id, postId) => {
    console.log(report, "", id, "id", postId);

    let addStatusBody = {
      report: report,
    };
    let postStatusBody = {
      promoteStatus: 10,
    };
    const promise1 = axios.patch(
      `${PROMOTIONS_BACKEND_URL}/add/change-report-status/${id}`,
      addStatusBody,
      { headers: adminHeader() }
    );

    const promise2 = axios.patch(
      `${BACKEND_URL_Micple_App}/promotion-app/change-status-admin/${postId}`,
      postStatusBody,
      { headers: adminHeader() }
    );

    Promise.all([promise1, promise2])
      .then((data) => {
        console.log(data);
        selectedPostData[0].status = 10;
        setSelectedPostData([...selectedPostData]);
        handleClose();
      })
      .catch((err) => {
        console.log("this is err", err);
      });
  };

  //Approved functions
  const approvedAds = (id, postId) => {
    console.log(report, "", id, "id", postId);

    // To do
    const addStatus = {
      status: 1, //here status 1 mean admin give access to users make payment
    };

    //To do
    const promoteStatus = {
      promoteStatus: 3, //here status 3 mean user ready to payment
    };

    const promise1 = axios.patch(
      `${BACKEND_URL_Micple_App}/promotion-app/change-status-admin/${postId}`,
      promoteStatus,
      { headers: adminHeader() }
    );

    const promise2 = axios.patch(
      `${PROMOTIONS_BACKEND_URL}/add/change-status/${id}`,
      addStatus,
      { headers: adminHeader() }
    );

    Promise.all([promise1, promise2])
      .then((data) => {
        selectedPostData[0].status = 1;
        setSelectedPostData([...selectedPostData]);
      })
      .catch((err) => {
        console.log("this is err", err);
      });
  };

  // Complete the status for running the ads
  const completeAdsForRunning = (id, postId) => {
    try {
      let adsStatus = {
        status: 5, // here ads status 5 mean ads runing
      };

      let promoteStatus = {
        promoteStatus: 5, //here status 5 mean post runs for ads
      };

      const promise1 = axios.patch(
        `${BACKEND_URL_Micple_App}/promotion-app/change-status-admin/${postId}`,
        promoteStatus,
        { headers: adminHeader() }
      );

      const promise2 = axios.patch(
        `${PROMOTIONS_BACKEND_URL}/add/change-status/${id}`,
        adsStatus,
        { headers: adminHeader() }
      );

      Promise.all([promise1, promise2])
        .then((data) => {
          // console.log(data, "Sucess data ");
          selectedPostData[0].status = 5;
          setSelectedPostData([...selectedPostData]);
        })
        .catch((err) => {
          console.log("this error comes from Promise all functions:", err);
        });
    } catch (err) {
      console.log("Something went wrong in compelting status", err);
    }
  };

  // Banned ads
  const bannedAdsAfterRunning = (id, postId) => {
    console.log(id, "id");
    console.log(postId, "post id.");

    let adsStatus = {
      status: 13,
    };

    let promoteStatus = {
      promoteStatus: 13, // this post ads
    };

    const promise1 = axios.patch(
      `${PROMOTIONS_BACKEND_URL}/add/ban-ads/${id}`,
      adsStatus,
      { headers: adminHeader() }
    );

    const promise2 = axios.patch(
      `${BACKEND_URL_Micple_App}/promotion-app/change-status-admin/${postId}`,
      promoteStatus,
      { headers: adminHeader() }
    );

    Promise.all([promise1, promise2])
      .then((data) => {
        // console.log(data, "Sucess data ");
        selectedPostData[0].status = 13;
        setSelectedPostData([...selectedPostData]);
      })
      .catch((err) => {
        console.log("this error comes from Promise all functions:", err);
      });
  };

  const deleteHandler = (id) => {
    const postId = selectedPostData[0]?.postId;

    const postStatusBody = {
      promoteStatus: 0,
    };

    const promise1 = axios.delete(
      `${PROMOTIONS_BACKEND_URL}/add/delet-ads-by-admin/${id}`,
      {
        headers: adminHeader(),
      }
    );

    const promise2 = axios.patch(
      `${BACKEND_URL_Micple_App}/promotion-app/change-status-admin/${postId}`,
      postStatusBody,
      { headers: adminHeader() }
    );

    Promise.all([promise1, promise2])
      .then((data) => {
        const filterAds = adIds.filter((item) => item?._id !== id);

        setAdIds(filterAds);
        setSelectedPostData([]);
        setTranscationId("");
        setNotes("");
        handleDeleteClose();
      })
      .catch((err) => {
        console.log("This is an err", err);
      });
  };

  return (
    <div className="adstable">
      <AdsFilter
        onInputChange={onInputChange}
        isDisabled={isDisabled}
        country={country}
        userName={userName}
        adIds={adIds}
        setSearchFilter={setSearchFilter}
        searchFilter={searchFilter}
        searchHandler={searchHandler}
      />

      <div className="adsData">
        <div className="Header">{Headers}</div>

        <Grid container>
          {/* Country */}
          <Grid className="country-showign-section" item xs={1}>
            {country?.map((country, index) => (
              <p
                className="all-country-list"
                key={index}
                onClick={() => setSelectedItem(country?.country_name)}
                style={{
                  backgroundColor:
                    selectedItem === country.country_name ? "#e4e4e4" : "white",
                }}>
                {country?.country_name} ({country?.allCount})
              </p>
            ))}
          </Grid>

          {/* User Name */}
          {selectedItem === null ? (
            ""
          ) : (
            <Grid className="username-showing-section" item xs={1}>
              {userName?.map((item, index) => (
                <p
                  className="all-username-list"
                  key={index}
                  onClick={() => setSelectedUser(item)}
                  style={{
                    backgroundColor:
                      selectedUser === item ? "#e4e4e4" : "white",
                  }}>
                  {item}
                </p>
              ))}
            </Grid>
          )}

          {/* Adds */}
          {selectedUser === null ? (
            ""
          ) : (
            <Grid className="ad-id-sections" item xs={2}>
              {adIds?.map((item, index) => (
                <div className="ad-id-all-items-sections" key={index}>
                  <p
                    onClick={() =>
                      setSelectedPost(item?.addId ? item?.addId : item?.add_id)
                    }
                    className="ads-items"
                    style={{
                      backgroundColor:
                        selectedPost == (item?.addId || item?.add_id)
                          ? "#e4e4e4"
                          : "white",
                    }}>
                    {item?.addId ? item?.addId : item?.add_id}
                  </p>

                  <div className="staus-design">
                    <div
                      style={{
                        backgroundColor:
                          item?.status === 0
                            ? "blue"
                            : item?.status === 1
                            ? "yellow"
                            : item?.status === 3
                            ? "#009cde"
                            : item?.status === 10
                            ? "red"
                            : item?.status === 11
                            ? "#8d2a2a"
                            : item?.status === 5
                            ? "green"
                            : "#0048ba",
                      }}></div>
                  </div>
                </div>
              ))}
            </Grid>
          )}

          {/* Details Sections  */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid className="ads-id-wise-details-sections" item xs={3}>
              <AdDetails
                selectedPostData={selectedPostData}
                setSelectedPostData={setSelectedPostData}
              />
            </Grid>
          )}

          {/* Traget People */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid className="target-people-sections" item xs={1}>
              {selectedPostData.map((row, index) => (
                <p
                  key={index}
                  className="target-people-list"
                  style={{
                    backgroundColor:
                      selectedPost === row?.postId ? "#e4e4e4" : "white",
                  }}>
                  {row?.target_people}
                </p>
              ))}
            </Grid>
          )}

          {/* Transcation ids */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid className="transcation-id-sections" item xs={2}>
              <p className="transcation-id">
                {/* Transcation will comes Here. */}
                {transcationId ? transcationId : "Transcation will comes Here."}
              </p>
            </Grid>
          )}

          {/* Notes */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid className="notes-sections" item xs={1}>
              <p className="notes">
                {/* {row?.days} */}
                {/* Notes comes here */}
                {notes ? notes : "Notes comes here."}
              </p>
            </Grid>
          )}

          {/* Status Change Sections */}
          {selectedPost === null ? (
            ""
          ) : (
            <Grid className="staus-sections" item xs={1}>
              {selectedPostData.map((row, index) => (
                <p
                  key={index}
                  style={{
                    padding: "0px 10px",
                    backgroundColor:
                      selectedPost === row?.postId ? "#e4e4e4" : "white",
                  }}>
                  {row?.status == 0 && (
                    <div>
                      <button
                        className="btn-approve"
                        onClick={() => approvedAds(row?._id, row?.postId)}>
                        Approve
                      </button>
                      <button className="btn-rejecte" onClick={handleShow}>
                        Reject
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteShow(row?._id)}>
                        Delete
                      </button>

                      <Rejection
                        report={report}
                        setReport={setReport}
                        show={show}
                        handleClose={handleClose}
                        rejectedAds={rejectedAds}
                        id={row?._id}
                        postId={row?.postId}
                      />
                    </div>
                  )}
                  {row?.status == 1 && (
                    <div>
                      <div style={{ color: "green" }}>
                        Watiing For complete payment Procedure.
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteShow(row?._id)}>
                        Delete
                      </button>
                    </div>
                  )}

                  {/*Payment already done need to verify it and run it as a add.*/}
                  {row?.status == 3 && (
                    <div>
                      <button
                        onClick={() =>
                          completeAdsForRunning(row?._id, row?.postId)
                        }
                        className="complete-ads-after-payment-done">
                        Runs Ads
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteShow(row?._id)}>
                        Delete
                      </button>

                      {/* To do :---->here we need to payment reject options */}
                      {/* 
                      <button className="btn-rejecte" onClick={handleShow}>Reject</button>

                      <Rejection
                        report={report} setReport={setReport}
                        show={show} handleClose={handleClose}
                        rejectedAds={rejectedAds}
                        id={row?._id} postId={row?.postId}
                      /> */}
                    </div>
                  )}

                  {/* Ads already running*/}
                  {row?.status == 5 && (
                    <div className="runing-ads-sections">
                      <div className="runs-ads-label">Running Ads.</div>

                      <button
                        onClick={() =>
                          bannedAdsAfterRunning(row?._id, row?.postId)
                        }
                        className="ban-ads-after-payment-done">
                        Ban
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteShow(row?._id)}>
                        Delete
                      </button>
                    </div>
                  )}

                  {row?.status == 10 && (
                    <div>
                      <div style={{ color: "red" }}>
                        Ads is rejected For Bad content.
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteShow(row?._id)}>
                        Delete
                      </button>
                    </div>
                  )}

                  {row?.status == 13 && (
                    <div>
                      <div style={{ color: "red" }}>
                        Ads is Banned Parmanently.
                      </div>
                      <button
                        onClick={() => handleDeleteShow(row?._id)}
                        className="btn-delete">
                        Delete
                      </button>
                    </div>
                  )}
                </p>
              ))}
            </Grid>
          )}
        </Grid>
      </div>

      {/* Delete conformation Modal  */}
      <DeleteModal
        show={deleteShow}
        handleClose={handleDeleteClose}
        id={deleteId}
        deleteHandler={deleteHandler}
        text="Are you sure to delete the ads?"
      />
    </div>
  );
}

export default withRouter(Sponsors);
