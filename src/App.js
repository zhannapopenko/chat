import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addMessageActoinCreator, deleteMessageActionCreator } from "./store";
import iconSend from "./Icon/send-icon.svg";

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [inputValue, setInputValue] = useState("");

  const addMessage = (e) => {
    e.preventDefault();
    const messageValue = {
      value: inputValue,
      id: Date.now(),
      currentTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    messageValue.value && dispatch(addMessageActoinCreator(messageValue));
    setInputValue("");
  };

  const deleteMessage = (message) => {
    dispatch(deleteMessageActionCreator(message.id));
  };

  return (
    <main className="main-container">
      <div className="chat">
        {messages.length ? (
          <div className="messages">
            {messages.map((message) => (
              <div
                className="message"
                onClick={() => deleteMessage(message)}
                key={message.id}
              >
                {message.value}
                <div className="current-time">{message.currentTime}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-messages">no messages yet</div>
        )}
        <form className="form" onSubmit={addMessage}>
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="button" type="submit">
            <img src={iconSend} alt="send-icon" className="button-icon" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
