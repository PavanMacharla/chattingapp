// const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const authRoutes = require("./routes/auth");
// // const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
const PORT = 5000
app.use(cors());
app.use(express.json());

// mongoose
//   .connect("mongodb+srv://pavan:pavan@cluster0.ushqo.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connetion Successfull");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
 const server = app.listen(PORT, () =>
  console.log(`Server started on 5000`)
);
const io = socket(server, {
  cors: {
    origin: "https://chattingapp-rayo.vercel.app/",
    credentials: true,
  },
});

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

// const express = require('express')

// const app = express()
// const PORT = 4000

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `)
// })

// app.get('/', (req, res) => {
//   res.send('Hey this is my API running 🥳')
// })

// app.get('/about', (req, res) => {
//   res.send('This is my about route..... ')
// })

// // Export the Express API
// module.exports = app
