import { OPEN_CHAT, CLOSE_CHAT, TOGGLE_CHAT, PUSH_CHAT_MESSAGE, PUSH_CHAT_ROOM, PUSH_OLD_ROOM } from './type';

const initState = [
  // {
  //   messages: [
  //     {
  //       id: m._id,
  //       client: m.client,
  //       message: m.message,
  //       date: m.date,
  //       image: doc.url,
  //     },
  //   ],
  //   id: doc._id,
  //   location: { city, country, lat: ll[0], lon: ll[1] },
  //   device: { browser, platform },
  //   date,
  //   admin: { id: null },
  //   user: {
  //     id: uroom.user._id,
  //     username: uroom.user.name,
  //     name: uroom.user.name,
  //     gender: uroom.user.gender,
  //     verified: uroom.user.verified,
  //     avatar: await getProfileAvatar(uroom.user._id, 50),
  //   },
  //   minimized: false,
  //   active: true
  // },
];

export default (state = initState, { type, payload }) => {
  switch (type) {
    case OPEN_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          if (!chat.messages) {
            chat.messages = [];
          }
          chat.active = true;
          chat.minimized = false;
        }
        return chat;
      });
      case CLOSE_CHAT:
        // return state.map((chat) => {
          //   if (chat.number === Number(payload)) {
            //     chat.active = false;
            //     chat.minimized = false;
            //   }
            //   return chat;
            // });

      //remove room from state after click close button
      return state.filter((room, i) => (room.number !== Number(payload)));

    case TOGGLE_CHAT:
      return state.map((chat) => {
        if (chat.number === Number(payload)) {
          chat.minimized = !chat.minimized;
        }
        return chat;
      });

    case PUSH_CHAT_ROOM:
      console.log('this is push chat rooom payload', payload);
      console.log('this is push chat rooom state', state);
      const rm = state.find((r) => r.number === payload.number);
      const rmWIthMessage = {...rm, messages: payload.messages}
      // console.log('rm --------------------', rm);
      if (rm) {
        //if room exist update old room
        state.map((room, i) => (room.number === Number(payload.number)) ? rmWIthMessage : room)
        // console.log('this is state created', [...state, ...payload ]);
        // return [...state, rmWIthMessage ]
        // state.push({ ...rm, status: 'active', active: true, minimized: false });
      } else {
        //if new room created
        state.push({ ...payload, status: 'active', active: true, minimized: false });
      }
      // return [...state];
      return state;
    // case MAKE_ROOM_ACTIVE:
    //   return state.map((chat) => {
    //     if (chat.id === payload) {
    //       chat.status = 'active';
    //     }
    //     return chat;
    //   });
    // case MAKE_ROOM_INACTIVE:
    //   return state.map((chat) => {
    //     if (chat.id === payload) {
    //       chat.status = new Date().toISOString();
    //     }
    //     return chat;
    //   });

    case PUSH_CHAT_MESSAGE:
      console.log('state hihhahah', state);
      return state.map((chat) => {
        console.log('old chat', chat);
        console.log('my playload', payload);

        let lolz = [];

        if(chat.number === Number(payload.messages.number)) {
          lolz = [...chat.messages, payload.messages]
        } else {
          lolz = chat.messages;
        }

        console.log('this is lolz all message', lolz);

        if (chat.id === payload.id) {
          let oldMsgs = [];
          const newMsgs = [];
          if (chat?.messages?.length > 0) {
            oldMsgs = chat.messages;
          }
          if (Array.isArray(payload.messages)) {
            for (const msg of payload.messages) {
              if (newMsgs.findIndex((m) => m.id === msg.id) === -1) {
                newMsgs.push(msg);
              }
            }
          } else {
            newMsgs.push(payload.messages);
          }
          const orMsgs = [];
          for (const msg of [...oldMsgs, ...newMsgs]) {
            if (orMsgs.findIndex((m) => m.id === msg.id) === -1) {
              orMsgs.push(msg);
            }
          }
        }
        chat.messages = lolz;
        chat.active = true;
        // chat.messages = orMsgs;
        // lolz.active = true;
        console.log('this is sending chat', chat);
        return chat;
      });
    case PUSH_OLD_ROOM:
      const old = state.find((i) => i.number === payload.number);
      if (!old) {
        return [...state, { ...payload, status: 'active', active: true, minimized: false }];
      }
      return state.map((i) => {
        if (i.id === payload.id) {
          i = {
            ...i,
            active: true,
            minimized: false,
          };
        }
        return i;
      });
    default:
      return state;
  }
};
