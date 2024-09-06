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
    phone:0,
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
      resetErrorMessages();
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

  // Validationn Info User
  function validateUserInfo(infoUser) {
    const newErrorMessages = { ...errorMessages };

    const validateField = (
      field,
      label,
      required = false,
      minLength = 3,
      regex = null
    ) => {
      if (required && !infoUser[field]) {
        newErrorMessages[field] = `${label} is required`;
      } else if (required &&infoUser[field] &&infoUser[field].length < minLength) {
        newErrorMessages[field] = `${label} must be at least ${minLength} characters`;
      } else if (regex && !regex.test(infoUser[field])) {
        if (field ==='phone' && infoUser['phone'].length > 1){
          console.log('phone' )
          newErrorMessages[field] = `${label} is invalid`;
        }else if(field ==='email' ){
          newErrorMessages[field] = `${label} is invalid`;

        }else{
          delete newErrorMessages[field];
        }
      }else {
        delete newErrorMessages[field];
      }
    };

    validateField("firstName", "First name", true);
    validateField("lastName", "Last name", true, 3);
    validateField("email", "Email", true, 6, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    validateField("occupation", "Occupation", false, 0);
    validateField("phone", "Phone number", false, 11, /^09[0-39]\d{8}$/);

    return newErrorMessages;
  }

  // Reset error messages
  const resetErrorMessages = () => {
    const newErrorMessages = { ...errorMessages };
    newErrorMessages.firstName = "";
    newErrorMessages.lastName = "";
    newErrorMessages.email = "";
    newErrorMessages.occupation = "";
    newErrorMessages.phone = "";
    setErrorMessages(newErrorMessages);
  };

  // Submit Handler
  const addHandler = (e) => {
    e.preventDefault();
    if (!editUser.id) {
      const validationErrors = validateUserInfo(infoUser);

      if (Object.keys(validationErrors).length > 0) {
        setErrorMessages(validationErrors);
      } else {
        if (users.some((user) => user.email === infoUser.email)) {
          setIsShowAlert(true);
          setMessageAlert("Email is exist");
          return;
        }

        setUsers((prev) => [...prev, infoUser]);
        setIsShowAlert(true);
        setMessageAlert("The user was successfully registered");
        resetInfoUser();
        resetErrorMessages();
      }
    } else {
      const validationErrors = validateUserInfo(infoUser);

      if (Object.keys(validationErrors).length > 0) {
        setErrorMessages(validationErrors);
      } else {
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
        resetErrorMessages();
      }
    }
  };

  // Cancel Handler
  const cancelEditHandler = () => {
    setEditUser({});
    resetInfoUser();
    resetErrorMessages();
  };

  return (
    <div className="form-wrapper">
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
            <div className={styles.forResponsive}>
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

              <IconsUser
                setInfoUser={setInfoUser}
                iconSelected={editUser.icon || 1}
              />
            </div>

            {/* Buttons */}
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
              iconSelected={editUser.icon || 1}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
