import React from "react";
import { AuthGuard } from "../../shared";
import { decodeToken } from "../../shared/functions/Token";
import { Redirect, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <>
      {decodeToken()?.type === "admin" ? (
        <Redirect to="/dashboard" />
      ) : // history.push("/dashboard")
      decodeToken()?.type === "dashboard" ? (
        <Redirect to="/dashboard" />
      ) : // history.push("/dashboard")
      decodeToken()?.type === "notice" ? (
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
};

export default AuthGuard(Home);
