const express = require("express");
var app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const socket = require("socket.io");
require("./db/conn");
const path = require("path");
app.use(express.json());
// app.use(cors());

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoute"));



const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

const server = app.listen(process.env.port, () => {
  console.log(`server is running on port ${process.env.port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(express.static(path.join(__dirname, "./build")));

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
