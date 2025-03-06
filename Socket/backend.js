require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.url}`);
  next();
});

const MessageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  roomId:{type:String,default:" "},
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

io.on("connection", (socket) => {

  socket.on("joinChat", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const roomId = [senderId, receiverId].sort().join("_");


    try {
      const newMessage = new Message({ senderId, receiverId, message,roomId });
      await newMessage.save();

      io.to(roomId).emit("receiveMessage", newMessage);
     } catch (error) {
      console.error(" Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(` User disconnected: ${socket.id}`);
  });
});
app.get('/get/messages', async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'senderId and receiverId are required' });
    }

    const roomId = [senderId, receiverId].sort().join('_'); 

    const messages = await Message.find({ roomId });
    res.json(messages); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
