import React, { useState, useEffect } from "react";
import styles from "./Alert.module.css";

const Alert = ({ message, setIsShowAlert }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        setIsShowAlert(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div className={styles.container} >
      <div className={`${styles.box} ${isVisible ? styles.hidden : ""}`}>
      <p className={styles.messageBox}>{message}</p>
    </div>
    </div>
  );
};

export default Alert;
