import React from "react";
import { Redirect } from "react-router-dom";

import { AuthGuard } from "../../shared";
import { decodeToken } from "../../shared/functions/Token";

function Home() {
  return (
    <>
      {decodeToken()?.type === "admin" ? (
        <Redirect to="/dashboard" />
      ) : decodeToken()?.type === "dashboard" ? (
        <Redirect to="/dashboard" />
      ) : decodeToken()?.type === "notice" ? (
        <Redirect to="/notices" />
      ) : decodeToken()?.type === "user" ? (
        <Redirect to="/users" />
      ) : decodeToken()?.type === "ads" ? (
        <Redirect to="/ads" />
      ) : decodeToken()?.type === "mail" ? (
        <Redirect to="/mails" />
      ) : decodeToken()?.type === "modarator" ? (
        <Redirect to="/chats" />
      ) : decodeToken()?.type === "report" ? (
        <Redirect to="/reports" />
      ) : decodeToken()?.type === "recycle" ? (
        <Redirect to="/recycles" />
      ) : decodeToken()?.type === "notes" ? (
        <Redirect to="/notes" />
      ) : decodeToken()?.type === "restrictions" ? (
        <Redirect to="/restricted" />
      ) : decodeToken()?.type === "adsRate" ? (
        <Redirect to="/adds-rate" />
      ) : decodeToken()?.type === "campaign" ? (
        <Redirect to="/campaign" />
      ) : (
        ""
      )}
    </>
  );
}

export default AuthGuard(Home);
