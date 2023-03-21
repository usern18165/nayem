import io from 'socket.io-client';

import { pushRoom, pushMessage } from '../store/chat/action';
import { ringReceivedAlerm } from '../store/site/action';
import store from '../store';

const socket = io(process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2000' : 'https://micple.com', {
  query: { atoken: localStorage.getItem('t') },
});

// socket.on('new_user_joined_live_chat', (room) => {
//   store.dispatch(pushRoom(room));
//   store.dispatch(ringReceivedAlerm());
// });
socket.on('active_chat_box_with_number', (data) => {
  console.log('active working', data?.doc);

  store.dispatch(pushRoom(data?.doc));
  store.dispatch(ringReceivedAlerm());


});

socket.on('send_to_admin_from_user_support_message', (data) => {
  console.log('I am printing each call');
  store.dispatch(pushMessage(data.roomId, data));
  if (data.client) {
    store.dispatch(ringReceivedAlerm());
  }
});

socket.on('send_message_from_admin_to_admin', (data) => {
  console.log("get user data from here3 ", data)
  store.dispatch(pushMessage(data.roomId, data));
  if (data.client) {
    store.dispatch(ringReceivedAlerm());
  }
});

// socket.on('push_support_message', ({ id, message }) => {
//   store.dispatch(pushMessage(id, message));
//   if (message.client) {
//     store.dispatch(ringReceivedAlerm());
//   }
// });

socket.on('new_support_mail_arrived', (mail) => {
  // todo
});


export default socket;
