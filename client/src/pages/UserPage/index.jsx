import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import css from "./style.module.css";

const socket = io("http://localhost:4000");

function UserPage() {
  const [name, setName] = useState("");
  const [myId, setMyId] = useState(null);
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const handleClick = () => {
    socket.emit("button_clicked");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name) {
      socket.emit("set_name", name);
      setIsNameSet(true);
    }
  };

  return (
    <header className={css.header}>
      <h1>Who Clicked First?</h1>
      {!isNameSet ? (
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={handleClick}>Click me!</button>
      )}
    </header>
  );
}

export default UserPage;
