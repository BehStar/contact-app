import React, { useState } from "react";

import styles from "./Modal.module.css";

const Modal = ({
  setIsShowModal,
  handleDelete,
  activeUser,
  text,
  setUsers,
  selectionGroup,
  setIsSelectedGroup,
  setSelectionGroup
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const hiddenModal = () => {
    setIsHidden(true);
    setTimeout(() => {
      setIsShowModal(false);
      setIsHidden(false);
    }, 500);
  };

  const deleteHandler = () => {
    if (activeUser) {
      handleDelete(activeUser);
      setIsHidden(true);
      setTimeout(() => {
        setIsShowModal(false);
        setIsHidden(false);
      }, 500);
    } else {
      setUsers((users) =>
        users.filter((user) => {
          return !selectionGroup.includes(user.id);
        })
      );
      setIsHidden(true);
      setTimeout(() => {
        setIsShowModal(false);
        setIsHidden(false);
        setIsSelectedGroup(false);
        setSelectionGroup([])
      }, 500);
    }
  };
  return (
    <div className={styles.container} onClick={hiddenModal}>
      <div className={`${styles.box} ${isHidden ? styles.hidden : ""}`}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>Delete User</h3>
          <h4 className={styles.text}>{text}</h4>
          <div className={styles.btns}>
            <button className={styles.btnDelete} onClick={deleteHandler}>
              Delete
            </button>
            <button className={styles.btnCancel} onClick={hiddenModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
