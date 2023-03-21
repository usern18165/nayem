import { ringSentAlerm } from '../store/site/action';
import store from '../store';
import socket from '.';
import {
  send_chat_message,
  push_chat_messages,
  delete_chat_message,
  push_chat_rooms,
  push_notifications,
  read_notifications,
  get_timeline,
  get_feed,
  react,
  undo_react,
  get_comments,
  comment,
  edit_comment,
  delete_comment,
  edit_content,
  edit_privacy,
  delete_post,
  reply,
  edit_reply,
  delete_reply,
  get_replies,
  react_comment,
  undo_comment_react,
  react_reply,
  undo_reply_react,
  react_chat_message,
  get_single_post,
  get_live_rooms,
  push_messagener_rooms,
  get_messanger_messages,
  send_messanger_message,
  react_messanger_message,
  delete_messagner_message,
  get_group_posts,
  on_open_single_chat,
  hide_post,
  set_intigator_counts,
  read_intigator_items,
  update_intigator_counts,
} from './type';
export function deletePost(postId) {
  socket.emit(delete_post, postId);
}
export function editContent(postId, text) {
  socket.emit(edit_content, { postId, text });
}
export function editPrivacy(postId, privacy) {
  socket.emit(edit_privacy, { postId, privacy });
}
export function hidePost(postId) {
  socket.emit(hide_post, { id: postId, date: new Date().toISOString() });
}

// ? Indicators
export function getIntigators() {
  socket.emit(set_intigator_counts);
}
export function readIntigators(name, ids) {
  socket.emit(read_intigator_items, { name, ids: Array.isArray(ids) ? ids : [ids] });
}

export function updateIntigator(name) {
  socket.emit(update_intigator_counts, name);
}

// ? Call
export function setPeerId(id) {
  socket.emit('set_peer_id', id);
}

// ? Chat
export function getLiveRooms() {
  socket.emit(get_live_rooms, null);
}
export function getRooms(offset) {
  socket.emit(push_chat_rooms, offset);
}
export function openChatByUid(userId) {
  socket.emit(on_open_single_chat, userId);
}
export function getMessages(roomId) {
  socket.emit(push_chat_messages, roomId);
}
export function sendMessage(roomId, type, content = null, image) {
  socket.emit(send_chat_message, { roomId, type, content, image, date: new Date().toISOString() });
}
export function reactMessage(roomId, messageId, name) {
  socket.emit(react_chat_message, { roomId, messageId, name, date: new Date().toISOString() });
}
export function deleteMsg(roomId, messageId) {
  socket.emit(delete_chat_message, { roomId, messageId, date: new Date().toISOString() });
}

// ? Messanger
export function getMessangerRooms(offset = 0, search = '') {
  socket.emit(push_messagener_rooms, { offset, search });
}
export function getMessangerMessages(data) {
  socket.emit(get_messanger_messages, data);
}
export function sendMessangerMessage(roomId, type, content = null, image) {
  socket.emit(send_messanger_message, { roomId, type, content, image, date: new Date().toISOString() });
}
export function reactMessangerMessage(roomId, messageId, name) {
  socket.emit(react_messanger_message, { roomId, messageId, name, date: new Date().toISOString() });
}
export function deleteMessangerMessage(roomId, messageId) {
  socket.emit(delete_messagner_message, { roomId, messageId, date: new Date().toISOString() });
}

// ? Notifications
export function getNotifications(offset) {
  socket.emit(push_notifications, offset);
}
export function readNotifications(ids) {
  const IDs = Array.isArray(ids) ? ids : [ids];
  socket.emit(read_notifications, IDs);
}

// ? Posts
export function getGroupPosts(groupId, offset) {
  socket.emit(get_group_posts, { groupId, offset });
}
export function getTimelines(username, offset) {
  socket.emit(get_timeline, { username, offset });
}
export function getFeeds(offset) {
  socket.emit(get_feed, offset);
}
export function getSinglePost(postId) {
  socket.emit(get_single_post, postId);
}



export function reactPost(postId, reaction) {
  socket.emit(react, { postId, reaction, date: new Date().toISOString() });
}
export function unreactPost(postId) {
  socket.emit(undo_react, { postId, date: new Date().toISOString() });
}

export function reactComment(postId, commentId, type) {
  socket.emit(react_comment, { postId, commentId, type, date: new Date().toISOString() });
}
export function unreactComment(postId, commentId) {
  socket.emit(undo_comment_react, { postId, commentId, date: new Date().toISOString() });
}

export function reactReply(postId, commentId, replyId, type) {
  socket.emit(react_reply, { postId, commentId, replyId, type, date: new Date().toISOString() });
}
export function unreactReply(postId, commentId, replyId) {
  socket.emit(undo_reply_react, { postId, commentId, replyId, date: new Date().toISOString() });
}

export function getComments(postId, offset) {
  socket.emit(get_comments, { postId, offset });
}
export function commentPost(postId, content, image = null, emoji = null) {
  socket.emit(comment, { postId, content, image, emoji, date: new Date().toISOString() });
}
export function editComment(postId, commentId, text) {
  socket.emit(edit_comment, { postId, commentId, text });
}
export function deleteComment(postId, commentId) {
  socket.emit(delete_comment, { postId, commentId, date: new Date().toISOString() });
}

export function getReplies(postId, commentId, offset) {
  socket.emit(get_replies, { postId, commentId, offset });
}
export function replyComment(postId, commentId, content, image = null, emoji = null) {
  socket.emit(reply, { postId, commentId, content, image, emoji, date: new Date().toISOString() });
}
export function editReply(postId, commentId, replyId, text) {
  socket.emit(edit_reply, { postId, commentId, replyId, text });
}
export function deleteReply(postId, commentId, replyId) {
  socket.emit(delete_reply, { postId, commentId, replyId });
}


export function pushSupportMsg(roomId, input, number) {
  console.log('I am going to user', input);
  // socket.emit('push_support_message', {
  socket.emit('user_join_support_chat', {
    roomId: roomId,
    client: false,
    message: input,
    date: new Date().toISOString(),
    number: number,
  });
  store.dispatch(ringSentAlerm());
}
export function joinSupportChat(roomId, message, number) {
  socket.emit('user_join_support_chat', { date: new Date().toISOString(), client: false, message, roomId, number});
  store.dispatch(ringSentAlerm());
}
