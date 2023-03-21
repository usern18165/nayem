import React, { useState, useEffect } from 'react';
import Scroll from 'react-scroll-to-bottom';
import { Close } from '@material-ui/icons';

import { pushSupportMsg, joinSupportChat } from '../../../sockets/emit';
import { getUrl, getUserAvatar } from '../../../shared/functions';
import { UName, HoverOver } from '../../../components/Tools';
import { MaleAvatar } from '../../../assets/profile';
import { When } from '../../../components';
import './style.scss';

export default ({ room, index, onToggle, onClose, onSee }) => {
  const [input, setInput] = useState('');
  const [right, setRight] = useState(20);
  useEffect(() => {
    switch (index) {
      case 0:
        setRight(20);
        break;
      case 1:
        setRight(290);
        break;
      case 2:
        setRight(560);
        break;
      case 3:
        setRight(830);
        break;
      case 4:
        setRight(1100);
        break;
      default:
        setRight(20);
        break;
    }
  }, [index]);
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      onSee();
    }

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line
  }, []);
  function onMsgSubmit(e) {
    e.preventDefault();
    const msg = input.trim();
    if (!msg) {
      return;
    }
    console.log(room);
    if (room.admin) {
      console.log('hello I am support message');
      pushSupportMsg(room.id, msg, room.number);
    } else {
      console.log('hello I am support message join support');
      joinSupportChat(room.id, msg, room.number);
    }
    onSee();
    setInput('');
  }
  return (
    <div className={`chat-container ${!!room.minimized ? 'minimized' : ''}`} style={{ right }}>
      <div className='header'>
        {/* {room.user ? (
          <div className='user'>
            <img className='user-img' src={getUserAvatar(room.user.avatar, room.user.gender, room.user.username)} alt='' />
            <h2 className='user-name'>
              <a href={`/${room.user.username}`} target='blank'>
                <UName name={room.user.name} verified={room.user.verified} />
              </a>
            </h2>
          </div>
        ) : ( */}
          <div className='user'>
            <img className='user-img' src={MaleAvatar} alt='' />
            <h2 className='user-name'>+{room.number}</h2>
          </div>
        {/* )} */}
        <span style={{ flex: '1 1 auto', height: 'inherit', cursor: 'pointer' }} onClick={() => onToggle(room.id)}></span>
        <div className='chat-header-options'>
          <button onClick={() => onClose(room.id)}>
            <Close />
          </button>
        </div>
      </div>
      {!room.minimized && (
        <>
          <div className='chat-list-container'>
            <Scroll className='chats-list'>
              {console.log(room.messages)}
              {room.messages.map(({ client, message, date, image }, index) => (
                <div key={index} className={`chat-msg ${client ? 'reciver' : 'sender'}`}>
                  {!client && <span style={{ flex: '1 1 auto' }}></span>}
                  <HoverOver title={<When date={date} />} placement={client ? 'right' : 'left'}>
                    <div className='msg'>
                      {message}
                      {!!image && (
                        <div>
                          <img alt='' src={getUrl(image, room.user.username)} />
                        </div>
                      )}
                    </div>
                  </HoverOver>
                </div>
              ))}
            </Scroll>
          </div>
          <div className='chat-input-container'>
            <form onSubmit={onMsgSubmit}>
              <input
                // autoFocus
                autoComplete='off'
                className='chat-input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Type a message...'
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};
