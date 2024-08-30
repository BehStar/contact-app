import React from "react";

import styles from "./InputPart.module.css";

const InputPart = ({ type, label, setInfoUser, name, error }) => {
  const changeInputHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value.trim().toLowerCase();
    setInfoUser((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <input type={type} onChange={changeInputHandler} name={name} />
      <p>{error}</p>
    </div>
  );
};

export default InputPart;
