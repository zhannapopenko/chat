import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addMessageActoinCreator, deleteMessageActionCreator } from "./store";

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [inputValue, setInputValue] = useState("");

  const addMessage = (e) => {
    e.preventDefault();
    const messageValue = {
      value: inputValue,
      id: Date.now(),
    };
    dispatch(addMessageActoinCreator(messageValue));
    setInputValue("");
  };

  const deleteMessage = (message) => {
    dispatch(deleteMessageActionCreator(message.id));
  };

  return (
    <>
      {messages.length ? (
        <div>
          {messages.map((message) => (
            <div onClick={() => deleteMessage(message)} key={message.id}>
              {message.value}
            </div>
          ))}
        </div>
      ) : (
        <div>no messages yet</div>
      )}
      <form onSubmit={addMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
