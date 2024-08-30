import React from "react";
import { useState, useEffect } from "react";
import FormContact from "./components/modules/FormContact";

const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className="container">
      <FormContact setUsers={setUsers} users={users}/>
    </div>
  );
};

export default App;
