import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageActoinCreator, deleteMessageActionCreator } from "./store";
import "./App.css";
import sendIcon from "./icon/send-icon.svg";

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [inputValue, setInputValue] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const messageRef = useRef(null);

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

    !messageValue.value ? setAlertMessage(true) : setAlertMessage(false);

    messageValue.value && dispatch(addMessageActoinCreator(messageValue));
    setInputValue("");
  };

  const deleteMessage = (message) => {
    dispatch(deleteMessageActionCreator(message.id));
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

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
            <div ref={messageRef} />
          </div>
        ) : (
          <div className="no-messages">no messages yet</div>
        )}
      </div>
      <div className="form-container">
       { alertMessage &&
       <div className="empty-input-alert">
          <span>Please write a message first</span>
        </div>
         }
        <form onSubmit={addMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">
            <img src={sendIcon} alt="send-icon" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
