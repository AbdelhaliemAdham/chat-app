import React, { useState } from "react";
import Send from "@mui/icons-material/Send";
import InputEmoji from "react-input-emoji";

function Input({
  createMessage,
  chat,
  user,
  placeholder = "Type a message",
  ButtonIcon = Send,
}) {
  const [message, setMessage] = useState("");

  const handleOnEnterInternal = (text) => {
    if (text.trim() !== "") {
      createMessage(chat?._id, user?._id, text);
      setMessage("");
    }
  };

  const handleSubmitMessage = () => {
    if (message.trim() !== "") {
      createMessage(chat?._id, user?._id, message);
      setMessage("");
    }
  };

  return (
    <div className="chatInputBox">
      <InputEmoji
        value={message}
        onChange={setMessage}
        cleanOnEnter
        onEnter={handleOnEnterInternal}
        placeholder={placeholder}
      />
      <button type="button" onClick={handleSubmitMessage}>
        <ButtonIcon />
      </button>
    </div>
  );
}

export default Input;
