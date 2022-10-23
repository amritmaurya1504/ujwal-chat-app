import React, { useEffect, useState } from "react";

export const Contacts = ({
  contacts,
  contactsLoader,
  currentUser,
  changeChat,
}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {contactsLoader == true ? (
        <div
          class="d-flex justify-content-center align-items-center"
          style={{ height: "80%" }}
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {currentUserImage && currentUserImage && (
            <div id="contacts">
              <ul>
                {contacts?.map((contact, index) => {
                  return (
                    <li
                      onClick={() => changeCurrentChat(index, contact)}
                      key={index}
                      className={`contact ${
                        index === currentSelected ? "active" : ""
                      }`}
                    >
                      <div className="wrap">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                        />
                        <div className="meta">
                          <p className="name">{contact.username}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};
