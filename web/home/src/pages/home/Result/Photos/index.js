import React from "react";

// import { HomeSearch } from '../../../Search/style';
// import Empty from '../../../Search/Results/Empty';
// import Photo from './Photo';
// import DisplayAds from '../ads/display/DisplayAds';

export default ({ photos = [], search, loggedIn }) => {
  if (photos.length > 0) {
    return (
      <>
        <h2>comment home search photos</h2>
        {/* <HomeSearch >

        {photos.map((item) => (

          item?.adStatus ?
            <DisplayAds key={item.id} item={item} loggedIn={loggedIn} />
            :
            <Photo loggedIn={loggedIn} key={item.id} {...item} />


        ))}
      </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Photos" tag={search} /> */}
      </>
    );
  }
};
