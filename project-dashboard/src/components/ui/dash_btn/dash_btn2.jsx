import React from "react";
import styles from "../dash_btn.module.css";

function Dash_btn2({ btn_text, inlineStyle, onClickEvent }) {
  const classes = `${styles.dash_btn2} ${inlineStyle} ${styles.dashbtn}`;
  return (
    <button
      className={classes}
      onClick={() => {
        onClickEvent(false)
      }}
    >
      {btn_text}
    </button>
  );
}

export default Dash_btn2;
