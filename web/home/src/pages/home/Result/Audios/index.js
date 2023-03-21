import React from "react";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
// import Audio from "./Audio";
// import DisplayAds from "../ads/display/DisplayAds";

export default ({ audios = [], search, loggedIn }) => {
  console.log("audios audios ----", audios);

  if (audios.length > 0) {
    return (
      <>
        <h2>comment home search audio</h2>
        {/* <HomeSearch>
          {audios.map((item) =>
            item?.adStatus ? (
              <DisplayAds key={item.id} item={item} loggedIn={loggedIn} />
            ) : (
              <Audio loggedIn={loggedIn} key={item.id} {...item} />
            )
          )}
        </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Audios" tag={search} /> */}
      </>
    );
  }
};
