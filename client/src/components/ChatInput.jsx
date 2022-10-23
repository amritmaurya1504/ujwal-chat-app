import React, { useState } from "react";

export const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <>
      <div className="message-input">
        <form className="wrap" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="Write your message..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="submit">
            <i className="fa fa-paper-plane " aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </>
  );
};
