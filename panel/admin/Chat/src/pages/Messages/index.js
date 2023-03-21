import React, { useState } from 'react';
import { Paper, Tabs, Tab, TextField, Select, FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Pagination } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import axios from 'axios';

import { closeChat, toggleChat } from '../../store/chat/action';
import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';
import { pushOldRoom } from '../../store/chat/action';
import { AuthGuard, Spinner } from '../../shared';
import { UName } from '../../components/Tools';
import { getRooms, getMsgInfo } from './Hooks';
import { When } from '../../components';
import Chat from './Chat';
import './style.scss';
import Timer from '../../shared/Timeer/Timer';


function Messages({ dispatch, chat }) {
  document.title = 'Messages';
  const statusStates = ['unseen', 'seen', 'users', 'guests', 'all'];
  const [headerHight, setHeaderHight] = useState(0);
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [status, setStatus] = useState('unseen');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const counts = getMsgInfo();
  const { rooms, totalRooms, working, setRooms } = getRooms(status, input, sortBy, start, end, pageIndex);
  function clearFilter() {
    setStart('');
    setEnd('');
    setInput('');
    setSortBy('');
  }
  function onDelete(id) {
    axios
      .delete(`${BACKEND_URL}/rooms/${id}`, { headers: adminHeader() })
      .then(() => {
        setRooms(rooms.filter((r) => r.id !== id));
      })
      .catch((err) => {
        throw err;
      });
  }
  function makeSeen(id) {
    axios
      .put(`${BACKEND_URL}/rooms/${id}`, null, { headers: adminHeader() })
      .then(() => {
        const updates = rooms.map((i) => {
          if (i.id === id) {
            i.messages = i.messages.map((j) => ({ ...j, seen: true }));
          }
          return i;
        });
        setRooms(updates);
      })
      .catch((err) => {
        throw err;
      });
  }


  return (
    <div className='chats'>
      <div ref={(el) => setHeaderHight(el?.clientHeight)} className='header'>
        
        <Paper square >
          <Tabs indicatorColor="" textColor='primary' onChange={(e, i) => setStatus(statusStates[i])} value={statusStates.indexOf(status)}>
            <Tab label={`Unseen (${counts.unseen})`} />
            <Tab label={`Seen (${counts.seen})`} />
            <Tab label={`Users (${counts.users})`} />
            <Tab label={`Guests (${counts.guests})`} />
            <Tab label={`All (${counts.total})`} />
          </Tabs>
        </Paper>
      </div>

      <div style={{ height: `calc(100vh - ${headerHight}px)`, opacity: 1 }} className='YhdbS'>
        {rooms.length > 0 && !working ? (
          <ul className='msg-list'>
            {rooms.map((room) => (
              <li key={room.id}>
                <div style={{ flex: '1 1 auto' }}>
                  <div className='lstm' onClick={() => dispatch(pushOldRoom(room))}>
                    {room.user ? (
                      <div>
                        <strong>
                          <UName name={room.user.name} verified={room.user.verified} />
                        </strong>
                        {room.user.username}
                      </div>
                    ) : (
                      <div>
                        <strong>{room.number}</strong>
                      </div>
                    )}
                    <div>{room.messages[room.messages?.length - 1].message}</div>
                  </div>
                  <div className='dtm'>
                    <When date={room.date} />
                  </div>
                  <div>
                    <small>
                      {!!room.location?.city && `${room.location?.city}, `} {room.location.country} - {room.device?.browser},{' '}
                      {room.device?.platform}
                    </small>
                  </div>
                </div>
                <Button size='small' color='secondary' variant='contained' onClick={() => onDelete(room.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <>{!working && <h3 className='notfound'>No message found.</h3>}</>
        )}

        {working && <Spinner height={30} />}

        {totalRooms > 10 && (
          <div className='pgntn'>
            <Pagination color='primary' page={pageIndex} onChange={(e, page) => setPageIndex(page)} count={Math.round(totalRooms / 10)} />
          </div>
        )}
      </div>

{console.log('this is all chat', chat)}
      {chat
        .filter((i) => i.active)
        .slice(0, 5)
        .map((c, i) => (
          <Chat
            key={c.id}
            room={c}
            index={i}
            onSee={() => makeSeen(c.id)}
            onToggle={() => dispatch(toggleChat(c.number))}
            onClose={() => dispatch(closeChat(c.number))} // sending number for clone specific number room on admin
          />
        ))}
    </div>
  );
}

export default connect((store) => ({ chat: store.chat }))(Messages);
