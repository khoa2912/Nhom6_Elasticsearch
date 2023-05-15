import React from "react";
import Sidebar from "../SideBar";
import Navbar from "../Navbar";
import "./style.css";
export default function Layout(props) {
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   legend: { display: false },
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           display: false,
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //         ticks: {
  //           display: false,
  //         },
  //       },
  //     ],
  //   },
  // };
  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Navbar />
        <div style={{ height: "100%" }}>{props.children}</div>
      </div>
    </div>
  );
}
