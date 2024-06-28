import React, { useState } from "react";
import styles from "../sideNavbar.module.css";
import btn_styles from "../sideBarButton.module.css";
import UpperNavbar from "../upperNavbar/upperNavbar";

export default function SideNavbar({ onPageChange }) {
  const imgDetails = {
    img1: {
      name: "View Analytics",
      status: "ns",
      loc: require("../../../assets/images/sideBar/view-analytics(ns).png"),
    },
    img1_1: {
      name: "View Analytics",
      status: "s",
      loc: require("../../../assets/images/sideBar/view-analytics(s).png"),
    },
    img2: {
      name: "Task and Goals",
      status: "ns",
      loc: require("../../../assets/images/sideBar/task and Goals(ns).png"),
    },
    img2_2: {
      name: "Task and Goals",
      status: "s",
      loc: require("../../../assets/images/sideBar/task and Goals(s).png"),
    },
    img3: {
      name: "Manage Resources",
      status: "ns",
      loc: require("../../../assets/images/sideBar/manage-resources(ns).png"),
    },
    img3_3: {
      name: "Manage Resources",
      status: "s",
      loc: require("../../../assets/images/sideBar/manage-resources(s).png"),
    },
    img4: {
      name: "User management",
      status: "ns",
      loc: require("../../../assets/images/sideBar/user-control-access(ns).png"),
    },
    img4_4: {
      name: "User management",
      status: "s",
      loc: require("../../../assets/images/sideBar/user-control-access(s).png"),
    },
  };

  const selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnSelected}`;
  const not_selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnNotSelected}`;
  const [pageContent, setpageContent] = useState("View-Analytics");

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <span style={{ fontSize: "20px" }}>Admin Dashboard</span>
        <br />
        <span>Welcome back</span>
      </div>
      <div >
        <UpperNavbar />
      </div>
      <div className={styles.secBtns}>
        <div
          className={
            pageContent === "View-Analytics" ||
            onPageChange === "View-Analytics"
              ? selectedBtn
              : not_selectedBtn
          }
          onClick={() => {
            setpageContent("View-Analytics");
            onPageChange("View-Analytics");
          }}
        >
          <img
            src={
              pageContent === "View-Analytics"
                ? imgDetails.img1_1.loc
                : imgDetails.img1.loc
            }
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>View Analytics</span>
        </div>

        <div
          className={
            pageContent === "Task-Goals" || onPageChange === "Task-Goals"
              ? selectedBtn
              : not_selectedBtn
          }
          onClick={() => {
            setpageContent("Task-Goals");
            onPageChange("Task-Goals");
          }}
        >
          <img
            src={
              pageContent === "Task-Goals"
                ? imgDetails.img3_3.loc
                : imgDetails.img3.loc
            }
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Task and Goals</span>
        </div>
        <div
          className={
            pageContent === "Manage-Resources" ||
            onPageChange === "Manage-Resources"
              ? selectedBtn
              : not_selectedBtn
          }
          onClick={() => {
            setpageContent("Manage-Resources");
            onPageChange("Manage-Resources");
          }}
        >
          <img
            src={
              pageContent === "Manage-Resources"
                ? imgDetails.img2_2.loc
                : imgDetails.img2.loc
            }
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Manage Resources</span>
        </div>
        <div
          className={
            pageContent === "User-control-access" ||
            onPageChange === "User-control-access"
              ? selectedBtn
              : not_selectedBtn
          }
          onClick={() => {
            setpageContent("User-control-access");
            onPageChange("User-control-access");
          }}
        >
          <img
            src={
              pageContent === "User-control-access"
                ? imgDetails.img4_4.loc
                : imgDetails.img4.loc
            }
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>User control access</span>
        </div>
      </div>
    </div>
  );
}
