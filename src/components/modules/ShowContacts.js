import React, { useState, useEffect } from "react";

import Modal from "./Modal";

import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import styles from "./ShowContacts.module.css";

const ShowContacts = ({ users, activeUserId, deleteUser, setEditUser }) => {
  const [activeUser, setActiveUser] = useState();

  const handleDelete = (user) => {
    deleteUser(user.id);
  };

  useEffect(() => {
    const findUser = users.find((user) => user.id === activeUserId);
    setActiveUser(findUser);
  }, [activeUserId,users]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.arrow}></div>
      <div className={styles.circleFix}></div>
      <div className={styles.boxPeople}>
        <ShowDataUser
          activeUser={activeUser}
          handleDelete={handleDelete}
          setEditUser={setEditUser}
        />
      </div>
    </div>
  );
};

export default ShowContacts;

const ShowDataUser = ({ activeUser, handleDelete, setEditUser }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const deleteHandler = () => {
    setIsShowModal(true);
  };

  const editHandler = () => {
    setEditUser(activeUser);
  };
  return (
    <div>
      {isShowModal && (
        <Modal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          handleDelete={handleDelete}
          activeUser={activeUser}
          text={`Are you sure you want to delete the ${activeUser?.email}?`}
        />
      )}
      <div className={styles.boxPerson}>
        <div className={styles.picPerson}>
          {activeUser ? (
            <img src={`/images/${activeUser?.icon}.jpg`} alt="icon" />
          ) : (
            <img src={`/images/no-one.jpg`} alt="no-user" />
          )}
        </div>
        <div className={styles.infoPerson}>
          <h4 className={styles.namePerson}>
            {activeUser?.firstName} {activeUser?.lastName}
          </h4>

          <h5 className={styles.jobPerson}>{activeUser?.occupation}</h5>
        </div>
        <div className={styles.infoPersonResponsive}>
          <h4 className={styles.namePerson}>
            {activeUser?.firstName} {activeUser?.lastName}
          </h4>

          <h5 className={styles.jobPerson}>{activeUser?.occupation}</h5>
        </div>
        <div className={styles.descriptionPerson}>
          <h4 className={styles.namePerson}>{activeUser?.email}</h4>
          <p>{activeUser?.phone}</p>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btnDelete} onClick={deleteHandler}>
            <IoTrashOutline />
          </button>
          <button className={styles.btnEdit} onClick={editHandler}>
            <CiEdit />
          </button>
        </div>
      </div>
    </div>
  );
};
