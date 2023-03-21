import React from 'react';
import Bio from './Bio';
import Name from './Name';

function index({bio, isMe, name, profile}) {

  // console.log("bio from ", bio, profile)

  return (
    <div>
      {/* <Name profile={profile} name={name} isMe={isMe}></Name> */}
      <Bio profile={profile} bio={bio} isMe={isMe}></Bio>
    </div>
  );
}

export default index;