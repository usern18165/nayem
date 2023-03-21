import React from "react";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
// import Video from "./Video";
// import DisplayAds from "../ads/display/DisplayAds";

export default ({ videos = [], search, loggedIn }) => {
  if (videos.length > 0) {
    return (
      <>
        <h2>comment home search video</h2>
        {/* <HomeSearch>

        {
          videos.map((item) => (

            item?.adStatus ?
              <DisplayAds key={item?.id} item={item} loggedIn={loggedIn} />
              :
              <Video key={item.id} {...item} loggedIn={loggedIn} />

          ))
        }

      </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Videos" tag={search} /> */}
      </>
    );
  }
};
