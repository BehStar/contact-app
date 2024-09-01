import React from "react";
import { useState, useEffect } from "react";

import Modal from "./Modal";

import styles from "./ListContact.module.css";
import { IoSearchSharp, IoTrashOutline, IoClose } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

const ListContact = ({ users, setUsers, setActiveUserId }) => {
  const [isSelectedGroup, setIsSelectedGroup] = useState(false);
  const [selectionGroup, setSelectionGroup] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [displayUsers, setDisplayUsers] = useState(() => users);

  const deleteGroupHnadler = () => {
    if (selectionGroup.length > 0) {
      setIsShowModal(true);
    }
  };
  useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

  const closeHandler = () => {
    setSelectionGroup([]);
    setIsSelectedGroup(false);
  };
  const btnSearch = () => {
    const filteredUsers = users.filter((user) => {
      return user.email.includes(search) || user.firstName.includes(search) || user.lastName.includes(search);
    });
    
    setDisplayUsers(filteredUsers);
  };
  return (
    <div className={styles.container}>
      {isShowModal && (
        <Modal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          text="Are you sure you want to delete users?"
          setUsers={setUsers}
          selectionGroup={selectionGroup}
          setIsSelectedGroup={setIsSelectedGroup}
          setSelectionGroup={setSelectionGroup}
        />
      )}
      <div className={styles.fixedRow}>
        <div className={styles.searchBox}>
          <button className={styles.btnSearch} onClick={btnSearch}>
            <IoSearchSharp />
          </button>
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.trim().toLocaleLowerCase())
            }
            className={styles.inputSearch}
            placeholder="Type to Search..."
          />
        </div>
        <div className={styles.groupIcons}>
          {isSelectedGroup && (
            <div className={styles.trash} onClick={deleteGroupHnadler}>
              <IoTrashOutline />
            </div>
          )}
          {isSelectedGroup ? (
            <div className={styles.closeIcon} onClick={closeHandler}>
              <IoClose />
            </div>
          ) : (
            <div
              className={styles.selectGroupIcon}
              onClick={() => setIsSelectedGroup(true)}
            >
              <FaUserGroup />
            </div>
          )}
        </div>
      </div>
      <ol className={styles.listWrapper}>
        {displayUsers.length === 0 ? (
          <h2 className={styles.noUser}>No user has been added yet</h2>
        ) : (
          displayUsers.map((user) => (
            <li key={user.id}>
              <PersonContact
                user={user}
                setActiveUserId={setActiveUserId}
                isSelectedGroup={isSelectedGroup}
                setSelectionGroup={setSelectionGroup}
              />
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default ListContact;

const PersonContact = ({
  user,
  setActiveUserId,
  isSelectedGroup,
  setSelectionGroup,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setSelectionGroup((prevSelection) => [...prevSelection, user.id]);
    } else {
      setSelectionGroup((prevSelection) =>
        prevSelection.filter((id) => id !== user.id)
      );
    }
  };

  return (
    <div className={styles.content} onClick={() => setActiveUserId(user.id)}>
      <div className={styles.icon}>
        <img src={`/images/${user.icon}.jpg`} alt="icon" />
      </div>
      <div className={styles.title}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.text}>{user.email}</div>
      {isSelectedGroup && (
        <div className={styles.forDel}>
          <input
            type="checkbox"
            name="del"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
    </div>
  );
};
