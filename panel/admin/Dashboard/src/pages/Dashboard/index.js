import React, { useState } from "react";

import { AuthGuard } from "../../shared";
import Timer from "../../shared/Timeer/Timer";
import ClickChart from "./BarChart/ClicksChart";
import SearchChart from "./BarChart/search";
import SignUpChart from "./BarChart/SignUpChart";
import UserBarChart from "./BarChart/UserBarChart";
import ViewsChart from "./BarChart/ViewsChart";
import "./style.scss";
import ChartFilter from "./ChartFilter";
import FailedChart from "./BarChart/FailedChart";

function Dashboard() {
  document.title = "Dashboard";
  const [SelectChart, setSelectChart] = useState("User");
  return (
    <div>
      <Audience SelectChart={SelectChart} setSelectChart={setSelectChart} />
      <div style={{ textAlign: "center", padding: "10px 0px" }}>
        <ChartFilter />
      </div>
      <div style={{ display: "flex" }}>
        <div className="chart">
          {SelectChart === "User" ? (
            <UserBarChart />
          ) : SelectChart === "View" ? (
            <ViewsChart />
          ) : SelectChart === "Clicks" ? (
            <ClickChart />
          ) : SelectChart === "Search" ? (
            <SearchChart />
          ) : SelectChart === "Failed" ? (
            <FailedChart />
          ) : (
            <SignUpChart />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// audiend component
function Audience({ SelectChart, setSelectChart }) {
  return (
    <div
      className="dashbaord"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0px",
      }}>
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("User");
        }}>
        <div
          style={{
            padding: "20px",

            backgroundColor:
              SelectChart === "User"
                ? "rgba(43,71,196,0.8)"
                : "rgb(233, 233, 233)",
            color: SelectChart === "User" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "User" ? "#fff" : "grey",
            }}>
            User
          </p>
          <h1>67,412</h1>
        </div>
      </button>
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("View");
        }}>
        <div
          style={{
            padding: "20px",
            borderRadius: "1px",
            backgroundColor:
              SelectChart === "View" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "View" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "View" ? "#fff" : "grey",
            }}>
            Views
          </p>
          <h1>104,412</h1>
        </div>
      </button>

      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Clicks");
        }}>
        <div
          style={{
            padding: "20px",

            backgroundColor:
              SelectChart === "Clicks" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Clicks" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Clicks" ? "#fff" : "grey",
            }}>
            Clicks
          </p>
          <h1>107,412</h1>
        </div>
      </button>
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Signup");
        }}>
        <div
          style={{
            padding: "20px",

            backgroundColor:
              SelectChart === "Signup" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Signup" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Signup" ? "#fff" : "grey",
            }}>
            Success
          </p>
          <h1>107,412</h1>
        </div>
      </button>

      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Failed");
        }}>
        <div
          style={{
            padding: "20px",
            backgroundColor:
              SelectChart === "Failed" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Failed" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Failed" ? "#fff" : "grey",
            }}>
            Failed
          </p>
          <h1>107,412</h1>
        </div>
      </button>

      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Search");
        }}>
        <div
          style={{
            padding: "20px",
            backgroundColor:
              SelectChart === "Search" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Search" ? "#fff" : "#000",
          }}>
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Search" ? "#fff" : "grey",
            }}>
            Search
          </p>
          <h1>2.6 M</h1>
        </div>
      </button>
    </div>
  );
}
