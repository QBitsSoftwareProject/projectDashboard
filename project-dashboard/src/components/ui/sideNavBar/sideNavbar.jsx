import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../sideNavbar.module.css";
import btn_styles from "../sideBarButton.module.css";

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
      name: "Task and Challenges",
      status: "ns",
      loc: require("../../../assets/images/sideBar/task and challenges(ns).png"),
    },
    img2_2: {
      name: "Task and Challenges",
      status: "s",
      loc: require("../../../assets/images/sideBar/task and challenges(s).png"),
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
      name: "Community management",
      status: "ns",
      loc: require("../../../assets/images/sideBar/community-management(ns).png"),
    },
    img4_4: {
      name: "Community management",
      status: "s",
      loc: require("../../../assets/images/sideBar/community-management(s).png"),
    },
    img5: {
      name: "User control access",
      status: "ns",
      loc: require("../../../assets/images/sideBar/user-control-access(ns).png"),
    },
    img5_5: {
      name: "User control access",
      status: "s",
      loc: require("../../../assets/images/sideBar/user-control-access(s).png"),
    },
    img6: {
      name: "Appointments",
      status: "ns",
      loc: require("../../../assets/images/sideBar/appointments(ns).png"),
    },
    img6_6: {
      name: "Appointments",
      status: "s",
      loc: require("../../../assets/images/sideBar/appointments(s).png"),
    },
    img7: {
      name: "Mind Relaxing Methods",
      status: "ns",
      loc: require("../../../assets/images/sideBar/appointments(s).png"),
    },
    img7_7: {
      name: "Mind Relaxing Methods",
      status: "s",
      loc: require("../../../assets/images/sideBar/appointments(s).png"),
    },
  };

  const selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnSelected}`;
  const not_selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnNotSelected}`;
  const [pageContent, setpageContent] = useState("View-Analytics");

  const getImageSrc = (img) => {
    if (imgDetails[img]) {
      return imgDetails[img].loc;
    }
    return ""; // or a default image path
  };

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <span style={{ fontSize: "20px" }}>Admin Dashboard</span>
        <br />
        <span>Welcome back</span>
      </div>
      <div className={styles.secBtns}>
        <Link
          to="/view-analytics"
          className={pageContent === "View-Analytics" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("View-Analytics");
            onPageChange("View-Analytics");
          }}
        >
          <img
            src={getImageSrc(pageContent === "View-Analytics" ? "img1_1" : "img1")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>View Analytics</span>
        </Link>
        <Link
          to="/task-challenges"
          className={pageContent === "Task-Challenges" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("Task-Challenges");
            onPageChange("Task-Challenges");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Task-Challenges" ? "img2_2" : "img2")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Task and Challenges</span>
        </Link>
        <Link
          to="/manage-resources"
          className={pageContent === "Manage-Resources" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("Manage-Resources");
            onPageChange("Manage-Resources");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Manage-Resources" ? "img3_3" : "img3")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Manage Resources</span>
        </Link>
        <Link
          to="/community-management"
          className={pageContent === "Community-Management" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("Community-Management");
            onPageChange("Community-Management");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Community-Management" ? "img4_4" : "img4")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Community Management</span>
        </Link>
        <Link
          to="/user-control-access"
          className={pageContent === "User-control-access" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("User-control-access");
            onPageChange("User-control-access");
          }}
        >
          <img
            src={getImageSrc(pageContent === "User-control-access" ? "img5_5" : "img5")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>User control access</span>
        </Link>
        <Link
          to="/appointments"
          className={pageContent === "Appointments" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("Appointments");
            onPageChange("Appointments");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Appointments" ? "img6_6" : "img6")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Appointments</span>
        </Link>
        <Link
          to="/mind-relaxing-methods"
          className={pageContent === "Mind Relaxing Methods" ? selectedBtn : not_selectedBtn}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setpageContent("Mind Relaxing Methods");
            onPageChange("Mind Relaxing Methods");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Mind Relaxing Methods" ? "img7_7" : "img7")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Mind Relaxing Methods</span>
        </Link>
      </div>
    </div>
  );
}
