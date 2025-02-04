import { Server } from "socket.io";

let onlineUsers = [];

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  // Event listener for adding a new user
  socket.on("addNewUser", (userId) => {
    if (userId === null) return;
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
      console.log("User added:", userId);
    } else {
      console.log("User already exists:", userId);
    }

    // Emit the updated list of online users to all clients
    io.emit("onlineUsers", onlineUsers);
    console.log("Online users:", onlineUsers);
  });

  // Event listener for disconnection
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("onlineUsers", onlineUsers);
    console.log("User disconnected:", socket.id);
    console.log("Online users after disconnect:", onlineUsers);
  });

  // Event listener for message sent
  socket.on("messageSent", (message) => {
    const recipient = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    console.log(message);
    console.log("recipientID", recipient);
    if (recipient) {
      io.to(recipient.socketId).emit("getMessages", message);
    }
  });
});

io.listen(3000, () => {
  console.log("Socket.io server is running on port 3000");
});
