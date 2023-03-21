import React from "react";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
// import Note from "./Note";
// import DisplayAds from "../ads/display/DisplayAds";

export default ({ notes = [], search, loggedIn }) => {
  if (notes.length > 0) {
    return (
      <>
        <h2>comment home search note</h2>
        {/* <HomeSearch>
          {notes.map((item) =>
            item?.adStatus ? (
              <DisplayAds key={item?.id} item={item} />
            ) : (
              <Note loggedIn={loggedIn} key={item.id} {...item} />
            )
          )}
        </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Notes" tag={search} /> */}
      </>
    );
  }
};
