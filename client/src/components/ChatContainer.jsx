import React, { useEffect, useState, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { Logout } from "./Logout";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loader, setLoader] = useState(true);
  const scrollRef = useRef();

  useEffect(async () => {
    const res = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(res.data);
    setLoader(false);
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="content">
        <div className="contact-profile">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
          />
          <p>{currentChat.username}</p>
          <Logout />
        </div>
        {loader == true ? (
          <div
            class="d-flex justify-content-center align-items-center"
            style={{ height: "84%" }}
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="messages">
              <ul>
                {messages?.map((message) => {
                  return (
                    <li
                      ref={scrollRef}
                      key={uuidv4()}
                      className={`messages ${
                        message.fromSelf ? "replies" : "sent"
                      }`}
                    >
                      <img
                        src={`${
                          message.fromSelf
                            ? `data:image/svg+xml;base64,${currentUser.avatarImage}`
                            : `data:image/svg+xml;base64,${currentChat.avatarImage}`
                        }`}
                        alt="avatar"
                      />
                      <p>{message.message} </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
};
