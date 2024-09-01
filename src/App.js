import React from "react";
import { useState, useEffect } from "react";
import FormContact from "./components/modules/FormContact";
import ListContact from "./components/modules/ListContact";
import ShowContacts from "./components/modules/ShowContacts";


const App = () => {
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("USERS")) || []
  );
  const [editUser, setEditUser] = useState({});
  useEffect(() => {
    console.log(editUser);
  }, [editUser]);


  const [activeUserId, setActiveUserId] = useState(() => {
    const lastUser = users.at(-1);
    return lastUser?.id || 0;
  });
  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
    console.log(activeUserId);
  }, [users, activeUserId]);

  const deleteUser = (userId) => {
    setUsers((prevUsers) => {
      const filteredUsers = prevUsers.filter((user) => user.id !== userId);
      // Set activeUserId based on filtered users
      setActiveUserId(() => {
        if (filteredUsers.length > 0) {
          return filteredUsers.at(-1).id; 
        } else {
          return null;
        }
      });
      return filteredUsers;
    });
  };
  return (
    <div className="container">
      <FormContact setUsers={setUsers} users={users} editUser={editUser} setEditUser={setEditUser}/>
      <div className="container-list-info">
        <ListContact
          users={users}
          setUsers={setUsers}
          setActiveUserId={setActiveUserId}
        />
        <ShowContacts
          users={users}
          activeUserId={activeUserId}
          deleteUser={deleteUser}
          setEditUser={setEditUser}
        />
      </div>
    </div>
  );
};

export default App;
