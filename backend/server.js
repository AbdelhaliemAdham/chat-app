const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const useRouter = require("./Routers/userRouter");
const chatRouter = require("./Routers/chatRouter");
const messageRouter = require("./Routers/messageRoute");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", useRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port..: ${port}`);
});

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 1 },
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
