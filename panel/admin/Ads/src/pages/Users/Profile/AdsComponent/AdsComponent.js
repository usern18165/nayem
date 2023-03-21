import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdsComponent() {
  const fakeData = [
    {
      name: "company name 1",
      ShopLink: "http://web.micple.com",
      banner:
        "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      name: "comanshje absj shdue rhsjh",
      ShopLink: "http://web.micple.com",
      banner:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      name: "company name 1",
      ShopLink: "http://web.micple.com",
      banner:
        "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      name: "company name 1",
      ShopLink: "http://web.micple.com",
      banner:
        "https://images.unsplash.com/photo-1542959864-4b02e6607fe4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "company name 1",
      ShopLink: "http://web.micple.com",
      banner:
        "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
  ];

  const [header, setHeader] = useState(0);

  const listenScrollEvent = (event) => {
    if (window.scrollY < 170) {
      // // console.log("object :>> notSticky  ", window.scrollY);
      return setHeader(false);
    } else if (window.scrollY > 170) {
      // // console.log("object :>> Sticky  ", window.scrollY);
      return setHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <div
      style={{
        marginTop: "5px",
        display: "flex",
        flexDirection: "column",
        textAlignLast: "center",
        position: header ? "fixed" : "relative",
        top: header ? "0px" : "none",
        transform: header ? "translate(37%, 10px)" : "none",
      }}
      //   onMove={(e) => handleOnWheel(e)}
    >
      <h3
        style={{ color: "black" }}
        //   onMouseOut={(e) => showWhereClicked(e)}
      >
        Sponsors
      </h3>
      {fakeData.map((item, i) => (
        <Link
          key={i}
          style={{ color: "black" }}
          to={item.ShopLink}
          target="_blank"
        >
          <div
            style={{
              margin: "10px 0px",
            }}
          >
            <img
              style={{
                minHeight: "100px",
                maxWidth: "180px",
                borderRadius: "4px",
              }}
              src={item.banner}
              alt={item.name}
            />
            <p style={{ color: "black" }}>{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AdsComponent;
