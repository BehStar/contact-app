import React from "react";

import { useState, useEffect } from "react";

import styles from "./FormContact.module.css";
import InputPart from "./InputPart";
import IconsUser from "./IconsUser";
import Alert from "./Alert";

const FormContact = ({ users, setUsers, editUser, setEditUser }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    phone: "",
  });

  // initial info user
  const [infoUser, setInfoUser] = useState({
    id: new Date().getTime(),
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    phone: 0,
    icon: 1,
  });

  // Set info User if editUser is exist
  useEffect(() => {
    if (editUser.id) {
      setInfoUser({
        id: editUser.id,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        occupation: editUser.occupation,
        phone: editUser.phone,
        icon: editUser.icon,
      });
    }
  }, [editUser]);

  // reset info User
  const resetInfoUser = () => {
    setInfoUser({
      id: new Date().getTime(),
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      phone: 0,
      icon: 1,
    });
  };

  // Submit Handler
  const addHandler = (e) => {
    e.preventDefault();

    if (!editUser.id) {
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
          setIsShowAlert(true);
          setMessageAlert("Email is exist");
          return;
        }
        newErrorMessages.firstName = "";
        newErrorMessages.lastName = "";
        newErrorMessages.email = "";
        newErrorMessages.occupation = "";
        newErrorMessages.phone = "";

        setUsers((prev) => [...prev, infoUser]);
        setIsShowAlert(true);
        setMessageAlert("The user was successfully registered");
        resetInfoUser();
      }
      setErrorMessages(newErrorMessages);
    } else {
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
        newErrorMessages.firstName = "";
        newErrorMessages.lastName = "";
        newErrorMessages.email = "";
        newErrorMessages.occupation = "";
        newErrorMessages.phone = "";
        const findUserIndex = users.findIndex(
          (user) => user.id === editUser.id
        );
        setUsers((prevUsers) => {
          return prevUsers.map((user, index) => {
            if (index === findUserIndex) {
              return infoUser;
            } else {
              return user;
            }
          });
        });

        setEditUser({});
        setIsShowAlert(true);
        setMessageAlert("The user was successfully Edited");
        resetInfoUser();
      }
      setErrorMessages(newErrorMessages);
    }
  };

  // Cancel Handler
  const cancelEditHandler = () => {
    setEditUser({});
    setInfoUser({
      id: new Date().getTime(),
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      phone: 0,
      icon: 1,
    });
  };

  return (
    <div className="test">
      {isShowAlert && (
        <Alert message={messageAlert} setIsShowAlert={setIsShowAlert} />
      )}
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
              value={infoUser.firstName}
              setInfoUser={setInfoUser}
              name="firstName"
              error={errorMessages.firstName}
            />
            {/* Last Name */}
            <InputPart
              type="text"
              label="Last Name:"
              value={infoUser.lastName}
              setInfoUser={setInfoUser}
              name="lastName"
              error={errorMessages.lastName}
            />
            {/* Email */}
            <InputPart
              type="text"
              label="Email:"
              value={infoUser.email}
              setInfoUser={setInfoUser}
              name="email"
              error={errorMessages.email}
            />
            {/* Responsive -- For Mobile */}
            {/* <div className={styles.forResponsive}>
           
              <InputPart
                type="text"
                label="Occupation:"
                value={infoUser.occupation}
                setInfoUser={setInfoUser}
                name="occupation"
                error={errorMessages.occupation}
              />

              <InputPart
                type="number"
                label="Phone Number:"
                value={infoUser.phone}
                setInfoUser={setInfoUser}
                name="phone"
                error={errorMessages.phone}
              />
  
              <IconsUser setInfoUser={setInfoUser} />
            </div> */}

            {editUser.id ? (
              <div className={styles.btnGroup}>
                <button type="submit" className={styles.submitBtn}>
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={cancelEditHandler}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button type="submit" className={styles.submit}>
                Submit
              </button>
            )}
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
              value={infoUser.occupation}
              setInfoUser={setInfoUser}
              name="occupation"
              error={errorMessages.occupation}
            />
            {/* Phone Number */}
            <InputPart
              type="number"
              label="Phone Number:"
              value={infoUser.phone}
              setInfoUser={setInfoUser}
              name="phone"
              error={errorMessages.phone}
            />
            <IconsUser
              setInfoUser={setInfoUser}
              iconSelected={editUser?.icon}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
