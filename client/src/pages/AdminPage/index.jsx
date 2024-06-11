import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import css from "./style.module.css";

const socket = io("http://localhost:4000");

function AdminPage() {
  const [firstClicked, setFirstClicked] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on("users_update", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    socket.on("first_clicked", (name) => {
      setFirstClicked(name);
    });

    return () => {
      socket.off("users_update");
      socket.off("first_clicked");
    };
  }, []);

  return (
    <header className={css.header}>
      <h1>First Clicked</h1>
      {firstClicked ? (
        <p>First clicked by: {firstClicked}</p>
      ) : (
        <p>No one has clicked yet.</p>
      )}
      <h2>Users in the game</h2>
      <ul>
        {Object.values(users).map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </header>
  );
}

export default AdminPage;
