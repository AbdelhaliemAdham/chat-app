import React, { useCallback, useEffect } from "react";
import { getData, sendData } from "../service/api";
import { io } from "socket.io-client";

export const ChatContext = React.createContext();

function ChatProvider({ children, user }) {
  const [chats, setChats] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [potentialChat, setPotentialChat] = React.useState(null);
  const [chatLoader, setChatLoader] = React.useState(false);
  const [socket, setSocket] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]);

  console.log("onlineUsers", onlineUsers);
  const updateChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [user]);

  useEffect(() => {
    if (user?._id === null || socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("onlineUsers", (response) => {
      setOnlineUsers(response);
    });
    return () => {
      socket.off("onlineUsers");
    };
  }, [socket, user]);

  //send Message
  useEffect(() => {
    if (user?._id === null || socket === null) return;
    const recipientId = currentChat?.members.find(
      (userId) => userId !== user?._id
    );

    console.log("recipientId", recipientId);
    socket.emit("messageSent", { ...chatMessages, recipientId });
  }, [chatMessages]);

  //receive Message

  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessages", (res) => {
      if (currentChat?._id !== res?.chatId) return;
      console.log("messages from socket", res);
      setChatMessages((prev) => [...prev, res]);
    });
    return () => {
      socket.off("getMessages");
    };
  }, [currentChat, socket, setChatMessages]);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getData("user");
      const users = response.data;
      const pChat = users.filter((aUser) => {
        let isChatCreated = false;
        if (aUser?._id === user?._id) return false;
        if (chats) {
          isChatCreated = chats?.some((chat) => {
            return (
              chat?.members[0] === aUser?._id || chat?.members[1] === aUser?._id
            );
          });
        }
        return !isChatCreated;
      });
      console.log(pChat);
      setPotentialChat(pChat);
    };
    allUsers();
  }, [chats]);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await sendData("chats", { firstId, secondId });

    if (response?.data) {
      setChats((prev) => [...prev, response.data]);
    }
  }, []);
  const createMessage = useCallback(async (chatId, senderId, text) => {
    const response = await sendData("messages", { chatId, senderId, text });
    if (response?.data) {
      setChatMessages((prev) => [...prev, response?.data]);
    }
  }, []);
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        console.log("user  " + user?._id);
        setChatLoader(true);
        try {
          const response = await getData(`chats/${user?._id}`);
          const data = response.data;
          console.log("Chats Data:", data);
          setChatLoader(false);
          setChats(data);
        } catch (error) {
          console.error("Failed to fetch chats:", error);
        }
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getChatMessages = async () => {
      if (currentChat?._id) {
        try {
          const response = await getData(`messages/find/${currentChat?._id}`);
          const data = response?.data;
          console.log("messages:", data);
          setChatMessages(data);
        } catch (error) {
          console.log("Failed to fetch messages:", error);
          setChatMessages([]);
        }
      }
    };
    getChatMessages();
  }, [currentChat, user]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatLoader,
        potentialChat,
        createChat,
        updateChat,
        currentChat,
        chatMessages,
        createMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
