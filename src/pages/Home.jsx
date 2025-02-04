import React, { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Chat from "../components/Chat";
import OtherChat from "../components/otherChat";
import ChatForm from "../components/ChatForm";
import NoChat from "../assets/NoChat.svg";

function Home() {
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const { chats, chatLoader, potentialChat, updateChat, currentChat } =
    React.useContext(ChatContext);

  console.log("potentialChat", potentialChat);

  useEffect(() => {
    if (chatLoader) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [chats, chatLoader]);

  // if (loading || !user) {
  //   return <LoadingIndicator />;
  // }
  return (
    <section className="home" style={{ background: "#202c33" }}>
      <div className="mainPage">
        <div className="chatList">
          <>
            <h3 className="headText">Your Chats</h3>{" "}
            {chats &&
              chats.map((chat, index) => (
                <Chat
                  selectChat={() => updateChat(chat)}
                  key={index}
                  chat={chat}
                  user={user}
                />
              ))}
          </>
        </div>
        {potentialChat && potentialChat.length > 0 && (
          <div className="chatList">
            <>
              <h3 className="headText">Other Users</h3>
              {potentialChat.map((chat, index) => (
                <OtherChat key={index} chat={chat} user={user} />
              ))}
            </>
          </div>
        )}
        {currentChat !== null ? (
          <ChatForm chat={currentChat} user={user} />
        ) : (
          <>
            <img className="noChatImage" src={NoChat} alt="No Chat Image" />
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
