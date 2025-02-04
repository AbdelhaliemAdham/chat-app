import React, { useContext } from "react";
import avatar from "../assets/avatar.svg";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function OtherChat({ chat }) {
  const { user } = useContext(AuthContext);
  const { createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div
      className="chatContainer"
      onClick={() => createChat(user?._id, chat?._id)}
    >
      <div className="avatar">
        <img src={avatar} alt="avatar" />
        {onlineUsers?.some(
          (onlineUser) => onlineUser?.userId === chat?._id
        ) && <div className="online" />}
      </div>
      <div className="chatUserName">
        <p>{chat?.name}</p>
      </div>
    </div>
  );
}

export default OtherChat;
