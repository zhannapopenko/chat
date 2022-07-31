import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageActoinCreator, deleteMessageActionCreator } from "./store";
import "./App.css";
import iconSend from "./icon/send-icon.svg";

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
      </div>
      <div className="form-container">
        <form onSubmit={addMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">
            <img src={iconSend} alt="send-icon" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
