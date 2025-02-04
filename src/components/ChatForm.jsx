import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useGetRecipientData } from "../Hooks/getRecipient";
import Message from "./Message";
import Input from "./Input";
import LoadingIndicator from "./LoadingIndicator";

function ChatForm({ user, chat }) {
  const [noChatFound, setNoChatFound] = useState(false);
  const { chatMessages, createMessage } = useContext(ChatContext);
  const { recipientData: selectedUser } = useGetRecipientData({
    user,
    chat,
  });

  useEffect(() => {
    if (!selectedUser) {
      setNoChatFound(true);
    } else {
      setNoChatFound(false);
    }
  }, [selectedUser]);
  console.log("currentChat", selectedUser);

  if (noChatFound) {
    return <LoadingIndicator />;
  }
  return (
    <div className="chatData">
      <div className="chatBar">
        <p className="chatUser">{selectedUser?.name}</p>
      </div>
      <div className="chatBody">
        {chatMessages &&
          chatMessages.map((message, index) => (
            <Message key={index} message={message} user={user} />
          ))}
      </div>
      <Input createMessage={createMessage} chat={chat} user={user} />
    </div>
  );
}

export default ChatForm;
