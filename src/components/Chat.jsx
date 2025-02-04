import React, { useContext } from "react";
import { useGetRecipientData } from "../Hooks/getRecipient";
import avatar from "../assets/avatar.svg";
import { ChatContext } from "../context/ChatContext";

export default function Chat({ chat, user, selectChat }) {
  const { recipientData } = useGetRecipientData({ chat, user });

  const { onlineUsers } = useContext(ChatContext);

  return (
    <>
      {recipientData && (
        <div onClick={selectChat} className="chatContainer">
          <div className="avatar">
            <img src={avatar} alt="avatar" />
            {onlineUsers?.some(
              (onlineUser) => onlineUser?.userId === recipientData?._id
            ) && <div className="online" />}
          </div>
          <div className="chatUserName">
            <p>{recipientData?.name}</p>
            {/* <p>{recipientData?.text || "Text"}</p> */}
          </div>
          <p className="onlineText">
            {onlineUsers?.some(
              (onlineUser) => onlineUser?.userId === recipientData?._id
            )
              ? "online"
              : "offline"}
          </p>
          <p className="messageNumber">2</p>
        </div>
      )}
    </>
  );
}
