import React from "react";
import { useState } from "react";

import styles from "./FormContact.module.css";
import InputPart from "./InputPart";
import IconsUser from "./IconsUser";

const FormContact = ({ users, setUsers }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    phone: "",
  });
  const [infoUser, setInfoUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    phone: 0,
    icon: 1,
  });

  const addHandler = (e) => {
    e.preventDefault();

    const newErrorMessages = { ...errorMessages };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^09[0-39]\d{8}$/;

    if (!infoUser.firstName) {
      newErrorMessages.firstName = "field is requierd";
    } else if (infoUser.firstName.length < 3) {
      newErrorMessages.firstName = "field must be at least 3 characters";
    } else if (!infoUser.lastName) {
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "field is requierd";
    } else if (infoUser.lastName.length < 3) {
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "field must be at least 3 characters";
    } else if (!infoUser.email) {
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "";
      newErrorMessages.email = "filed is requierd";
    } else if (!emailRegex.test(infoUser.email)) {
      newErrorMessages.email = "fill the email address";
    } else if (
      infoUser.occupation &&
      infoUser.occupation.length <= 1 &&
      infoUser.occupation.length < 3
    ) {
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "";
      newErrorMessages.email = "";
      newErrorMessages.occupation = "field must be at least 3 characters";
    } else if (infoUser.phone && !phoneRegex.test(infoUser.phone)) {
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "";
      newErrorMessages.email = "";
      newErrorMessages.phone = "fill the correct phone number";
    } else {
      if (users.some((user) => user.email === infoUser.email)) {
        console.log("email is exist");
        return;
      }
      newErrorMessages.firstName = "";
      newErrorMessages.lastName = "";
      newErrorMessages.email = "";
      newErrorMessages.occupation = "";
      newErrorMessages.phone = "";

      console.log(infoUser);
      setUsers((prev) => [...prev, infoUser]);
    }
    setErrorMessages(newErrorMessages);
  };

  const handleIconChange = (selectedValue) => {
    // Function to update icon value
    setInfoUser((prevInfoUser) => ({ ...prevInfoUser, icon: selectedValue }));
  };

  return (
    <div className={styles.mainWrapper}>
      <form onSubmit={addHandler}>
        <div
          className={`${styles.firstWrapper} ${
            isShowMore ? styles.showMoreFirstWrapper : ""
          }`}
        >
          <button
            type="button"
            className={`${styles.moreShowBtn} ${
              isShowMore ? styles.hiddenBtn : ""
            }`}
            onClick={() => setIsShowMore(true)}
          >
            ...
          </button>
          {/* First Name */}
          <InputPart
            type="text"
            label="First Name:"
            setInfoUser={setInfoUser}
            name="firstName"
            error={errorMessages.firstName}
          />
          {/* Last Name */}
          <InputPart
            type="text"
            label="Last Name:"
            setInfoUser={setInfoUser}
            name="lastName"
            error={errorMessages.lastName}
          />
          {/* Email */}
          <InputPart
            type="text"
            label="Email:"
            setInfoUser={setInfoUser}
            name="email"
            error={errorMessages.email}
          />
          {/* Responsive -- For Mobile */}
          <div className={styles.forResponsive}>
            {/* Occupation */}
            <InputPart
              type="text"
              label="Occupation:"
              setInfoUser={setInfoUser}
              name="occupation"
              error={errorMessages.occupation}
            />
            {/* Phone Number */}
            <InputPart
              type="number"
              label="Phone Number:"
              setInfoUser={setInfoUser}
              name="phone"
              error={errorMessages.phone}
            />
            {/* Icons */}
            <IconsUser setInfoUser={setInfoUser} />
          </div>

          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
        {/* Responsive- for Tablet to Up (Second Form) */}
        <div
          className={`${styles.secondWrapper} ${
            isShowMore ? styles.showMoreSecondWrapper : ""
          }`}
        >
          {/* Close second Form Form */}
          <button
            type="button"
            onClick={() => setIsShowMore(false)}
            className={styles.btnClose}
          >
            X
          </button>
          {/* Occupation */}
          <InputPart
            type="text"
            label="Occupation:"
            setInfoUser={setInfoUser}
            name="occupation"
            error={errorMessages.occupation}
          />
          {/* Phone Number */}
          <InputPart
            type="number"
            label="Phone Number:"
            setInfoUser={setInfoUser}
            name="phone"
            error={errorMessages.phone}
          />
          <IconsUser setInfoUser={setInfoUser} />
        </div>
      </form>
    </div>
  );
};

export default FormContact;
