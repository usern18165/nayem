import React from "react";
import { Redirect } from "react-router-dom";

import store from "../../store";
import { Spinner } from "..";

export default function authGuard(WrappedComponent) {
  return (props) => {
    const { loggedIn, loggingIn } = store.getState().auth;
    if (loggingIn && !loggedIn) {
      return <Spinner height={100} />;
    } else if (!loggedIn && !loggingIn) {
      return window.location.replace("/login");
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}
