
import { connect } from 'react-redux';
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
} from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';
import {  withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { AiOutlineSend } from "react-icons/ai";
import { AuthGuard } from "../../shared";
import Tooltip from '@material-ui/core/Tooltip';
import "../Sponsors/styles.scss";

import Timer from "../../shared/Timeer/Timer";
import { dummydata } from '../Sponsors/Sponsor/Data';


const rows = dummydata;
function Reports({ history: { push }, dispatch }) {
  let time = new Date().toLocaleTimeString();


//   document.title = 'Reports';
//   const [reports, setReports] = useState([]);
//   const [working, setWorking] = useState(true);
//   const [u1Menu, setU1Menu] = useState(null);
//   const [u2Menu, setU2Menu] = useState(null);
//   useEffect(() => {
//     axios
//       .get(`${BACKEND_URL}/reports`, { headers: adminHeader() })
//       .then(({ data }) => {
//         setReports(data.reports);
//         setWorking(false);
//       })
//       .catch((err) => {
//         setWorking(false);
//         throw err;
//       });
//   }, []);
//   function onDelete(id) {
//     axios
//       .delete(`${BACKEND_URL}/reports/${id}`, { headers: adminHeader() })
//       .then(() => {
//         const updates = reports.filter((i) => i.id !== id);
//         setReports(updates);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }
//   function makeAnswered(id) {
//     axios
//       .put(`${BACKEND_URL}/reports/${id}`, {}, { headers: adminHeader() })
//       .then(() => {
//         const updates = reports.map((i) => {
//           if (i.id === id) {
//             i.answered = true;
//           }
//           return i;
//         });
//         setReports(updates);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }
//   function openProfile(id) {
//     setU1Menu(null);
//     setU2Menu(null);
//     push(`/users/user/${id}`);
//   }
//   function openMail(username) {
//     setU1Menu(null);
//     setU2Menu(null);
//     dispatch(openMailCompose(username));
//   }
//   if (working && reports.length < 1) {
//     if (working) {
//       return <Spinner height={100} />;
//     } else {
//       return (
//         <Typography component='h3' align='center' style={{ marginTop: 30 }}>
//           No reports found.
//         </Typography>
//       );
//     }
//   } else {
//     return (
//       <div>
//         <List>
//           {reports.map((item) => (
//             <ListItem key={item.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
//               <ListItemAvatar>
//                 <Avatar src={getUserAvatar(item.from.avatar, item.from.gender)} alt='' />
//               </ListItemAvatar>
//               <div style={{ flex: '1 1 auto', marginRight: 10 }}>
//                 <p>
//                   <strong>{`${item.from.username} reported '${item.title}' to ${item.to.username}`}</strong>
//                 </p>
//                 <p>
//                   <small>
//                     <strong>
//                       <When date={item.date} />
//                     </strong>
//                   </small>
//                 </p>
//                 <p>{item.detail}</p>
//               </div>
//               <div style={{ display: 'flex' }}>
//                 <Button
//                   size='small'
//                   variant='outlined'
//                   onClick={(_) => setU1Menu(_.currentTarget)}
//                   style={{ textTransform: 'initial', fontSize: 14, marginRight: 5 }}
//                 >
//                   {item.from.username}
//                 </Button>
//                 <Menu anchorEl={u1Menu} keepMounted open={!!u1Menu} onClose={() => setU1Menu(null)} TransitionComponent={Fade}>
//                   <MenuItem onClick={() => openProfile(item.from.id)}>Open Profile</MenuItem>
//                   <MenuItem onClick={() => openMail(item.from.username)}>Send A Mail</MenuItem>
//                 </Menu>

//                 <Button
//                   size='small'
//                   variant='outlined'
//                   onClick={(_) => setU2Menu(_.currentTarget)}
//                   style={{ textTransform: 'initial', fontSize: 14, marginRight: 5 }}
//                 >
//                   {item.to.username}
//                 </Button>
//                 <Menu anchorEl={u2Menu} keepMounted open={!!u2Menu} onClose={() => setU2Menu(null)} TransitionComponent={Fade}>
//                   <MenuItem onClick={() => openProfile(item.to.id)}>Open Profile</MenuItem>
//                   <MenuItem onClick={() => openMail(item.to.username)}>Send A Mail</MenuItem>
//                 </Menu>

//                 <HoverOver title='Make answered'>
//                   <IconButton hidden={!item.answered} onClick={() => makeAnswered(item.id)}>
//                     <Visibility />
//                   </IconButton>
//                 </HoverOver>
//                 <IconButton color='secondary' onClick={() => onDelete(item.id)}>
//                   <Delete />
//                 </IconButton>
//               </div>
//             </ListItem>
//           ))}
//         </List>
//       </div>
//     );
//   }
// }
const [selectedItem, setSelectedItem] = useState(null);
const [selectedPost, setSelectedPost] = useState(null);
const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {}, [selectedPost, selectedItem, selectedUser]);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "83vh",
  },
  visible: {
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
});
const classes = useStyles();

return (
  <div className="adstable">
    
    <div className="adsData">
  
      <div className="Header">
        <Grid container>
          <Grid
            style={{
              borderRight: "1px solid #7a8dea",
              color: " black",
              padding: "10px",
              fontWeight: 700,
              fontSize: "14px",
              backgroundColor: "#e4e4e4",
            }}
            item
            xs={2}
          >
            Reporter
          </Grid>
          <Grid
            style={{
              borderRight: "1px solid #7a8dea",
              color: " black",
              padding: "10px",
              fontWeight: 700,
              fontSize: "14px",
              backgroundColor: "#e4e4e4",
            }}
            item
            xs={2}
          >
            Claimer
          </Grid>
          <Grid
            style={{
              borderRight: "1px solid #7a8dea",
              color: " black",
              padding: "10px",
              fontWeight: 700,
              fontSize: "14px",
              backgroundColor: "#e4e4e4",
            }}
            item
            xs={3}
          >
            Post ID
          </Grid>
          <Grid
            style={{
              borderRight: "1px solid #7a8dea",
              color: " black",
              padding: "10px",
              fontWeight: 700,
              fontSize: "14px",
              backgroundColor: "#e4e4e4",
            }}
            item
            xs={2}
          >
            Reason
          </Grid>
          <Grid
            style={{
              borderRight: "1px solid #7a8dea",
              color: " black",
              padding: "10px",
              fontWeight: 700,
              fontSize: "14px",
              backgroundColor: "#e4e4e4",
            }}
            item
            xs={3}
          >
            Comments
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <Grid
          style={{
            height: "80vh",
            overflow: "scroll",
          }}
          item
          xs={2}
        >
          {rows.map((row) => (
            <p
              onClick={() => setSelectedItem(row.CountryName)}
              style={{
                color: 'black',
                fontSize: '15px',
                backgroundColor: 'white',
                padding: "10px",
                // margin: "4px",
                backgroundColor:
                  selectedItem === row.CountryName
                    ? "#e4e4e4"
                    : "white",
              }}
            >
              {row.CountryName}({Math.floor(Math.random() * 10) + 1})
            </p>
          ))}
        </Grid>
        {/* 2nd item */}
        {selectedItem === null ? (
          ""
        ) : (
          <Grid
            style={{
              height: "80vh",
              overflow: "scroll",
              //
            }}
            item
            xs={2}
          >
            {rows.map((row) => (
              <p
                onClick={() => setSelectedUser(row.UserID)}
                style={{
                 
                  color: "black",
                  padding: "10px",
                  margin: "4px",
                  fontSize: "12px",
                  backgroundColor:
                    selectedUser === row.UserID
                      ? "#e4e4e4"
                      : "white",
                }}
              >
                {row.User}
              </p>
            ))}
          </Grid>
        )}
        {/* 3rd item */}
        {selectedUser === null ? (
          ""
        ) : (
          <Grid
            style={{
              height: "80vh",
              overflow: "scroll",
              //
            }}
            item
            xs={3}
          >
            {rows.map((row) => (
              <p
                onClick={() => setSelectedPost(row.PostID.$oid)}
                style={{
                
                  color: "black",
                  padding: "10px",
                  margin: "4px",
                  fontSize: "12px",
                  backgroundColor:
                    selectedPost === row.PostID.$oid
                      ? "#e4e4e4"
                      : "white",
                }}
              >
                {row.PostID.$oid}
              </p>
            ))}
          </Grid>
        )}
        {/* 4th item */}
        {selectedPost === null ? (
          ""
        ) : (
          <Grid
            style={{
              height: "80vh",
              overflow: "scroll",
              //
            }}
            item
            xs={2}
          >
            {rows.map((row) => (
              <p
                style={{
                  
                  color: "black",
                  padding: "10px",
                  margin: "4px",
                  fontSize: "12px",
                  backgroundColor:
                    selectedPost === row.PostID.$oid ? "#e4e4e4" : "white",
                }}
              >
                {row.Date}
              </p>
            ))}
          </Grid>
        )}
        {/* 5th item */}
        {selectedPost === null ? (
          ""
        ) : (
          <div>
          <Grid item xs={12}>
            <div
              style={{
                height: "30vh",
                overflow: "scroll",
                //
              }}
            >
              {rows.map((row, index) => (
                
                  // <Tooltip TransitionComponent={Zoom} placement="right" title={time}>
              index % 2 === 0 ?  <div>
              <p style={{
                marginTop:'20px',
                 color: "grey" ,
                 margin: "4px",
                 backgroundColor:"white" ,
                 textAlign:  "end" 
               }}>{time}</p>
                 <p
               style={{
                 color: "black" ,
                 padding: "5px 10px",
                 margin: "4px",
                 fontSize: "12px",
                 backgroundColor:"white" ,
                 textAlign:  "end" 
               }}
             >
               {row.User} |{row.User}|{row.User}|

              
             </p>
            </div> :  <div>
                 <p style={{
                   marginTop:'20px',
                 color: "grey" ,
               }}> {time}</p>
                    <p
                  style={{
                    display:'inline-block',
                    color:  "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor: "#e8f9fc",
                    textAlign:  "end",
                  }}
                >
                  {row.User} |{row.User}|{row.User}|

                 
                </p>
               </div>
                  // </Tooltip>
                
              ))}
            </div>

            <div  className="chatSend text-center">
              <textarea className="chatinput" type="textarea" /> <br />
              <button >
                {" "}
                <AiOutlineSend/>
              </button>
            </div>
          </Grid>
          <hr/>
          <hr/>
          <Grid item xs={12}>
            <div
              style={{
                height: "35vh",
                overflow: "scroll",
                //
              }}
            >
              {rows.map((row, index) => (
                
                  // <Tooltip TransitionComponent={Zoom} placement="right" title={time}>
              index % 2 === 0 ?  <div>
              <p style={{
                marginTop:'20px',
                 color: "grey" ,
                 margin: "4px",
                 backgroundColor:"white" ,
                 textAlign:  "end" 
               }}>{time}</p>
                 <p
               style={{
                 color: "black" ,
                 padding: "5px 10px",
                 margin: "4px",
                 fontSize: "12px",
                 backgroundColor:"white" ,
                 textAlign:  "end" 
               }}
             >
               {row.User} |{row.User}|{row.User}|

              
             </p>
            </div> :  <div>
                 <p style={{
                   marginTop:'20px',
                 color: "grey" ,
               }}> {time}</p>
                    <p
                  style={{
                    display:'inline-block',
                    color:  "black",
                    padding: "10px",
                    margin: "4px",
                    fontSize: "12px",
                    backgroundColor: "#e8f9fc",
                    textAlign:  "end",
                  }}
                >
                  {row.User} |{row.User}|{row.User}|

                 
                </p>
               </div>
                  // </Tooltip>
                
              ))}
            </div>

            <div  className="chatSend text-center">
              <textarea className="chatinput" type="textarea" /> <br />
              <button >
                {" "}
                <AiOutlineSend/>
              </button>
            </div>
          </Grid>
          </div>
        )}
      </Grid>
    </div>
   
  </div>

 
);
}
export default connect()(withRouter(Reports));
