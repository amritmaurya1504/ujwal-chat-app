import "./chat.scss";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import { Contacts } from "../../components/Contacts";
import { Welcome } from "../../components/welcome/Welcome";
import { ChatContainer } from "../../components/ChatContainer";
import { io } from "socket.io-client";

export const ChatPage = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contactsLoader, setContactsLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          setContactsLoader(false);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chatpage">
      <div id="frame">
        <div id="sidepanel">
          <div id="profile">
            <div className="wrap">
              <i class="fad fa-blog"></i>
              <p>AATCHIT</p>
            </div>
          </div>

          <Contacts
            contacts={contacts}
            contactsLoader={contactsLoader}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        {currentUser && (
          <>
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
