import React from "react";

function Message({ message, user }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="messageRow">
      <p
        className={`${
          message?.senderId === user?._id ? "chatBubble" : "received"
        }`}
      >
        {message?.text}
      </p>
      <p
        className={`${
          message?.senderId === user?._id ? "messageDate" : "receivedDate"
        }`}
      >
        {formatTime(message?.createdAt)}
      </p>
    </div>
  );
}

export default Message;
