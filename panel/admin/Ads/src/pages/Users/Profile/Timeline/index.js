/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import { Spinner } from '../../../../shared';
import { getPosts } from '../Hooks';
import { NoItem } from '../style';
import Post from '../Post';
import { Grid } from "@material-ui/core";
import AdsComponent from "../AdsComponent/AdsComponent";
export default ({ username, name }) => {
  document.title = `Timeline | ${name?.join(' ')}`;
  const [offset] = useState(0);
  const { posts, working } = getPosts(username, offset);
  if (window.innerHeight) {
  }
  return (
    // <div style={{display:'flex'}}>
    //   <div>
    //     {posts
    //       .filter((item) => item.user.username === username)
    //       .map((post) => (
    //         <Post key={post.id} {...post} />
    //       ))}
    //     {working && <Spinner height={30} />}
    //     {!working && posts.length < 1 && (
    //       <NoItem>
    //         <span>No posts.</span>
    //       </NoItem>
    //     )}
    //   </div>
    //   <div>
    //     hello world
    //   </div>
    // </div>
    <div style={{ padding: "7px" }}>
    <Grid style={{}} container>
      <Grid item xs={9}>
        {/* all post will placed here */}
        {posts
          .filter((item) => item.user?.username === username)
          .map((post) => (
            <Post key={post.id} {...post} />
          ))}
        {/* {tloading && <Spinner height={30} />} */}
        {
          posts.filter((item) => item.user.username === username).length <
            1 && (
            <NoItem>
              <span>No posts</span>
            </NoItem>
          )}
      </Grid>
      <Grid item xs={3} style={{ paddingRight: "10px" }}>
          <AdsComponent/>
      </Grid>
    </Grid>
  </div>
  );
};
