const { Server } = require("socket.io");
const http = require("http");
const Message=require('../model/meassage.model')
class Socket{
    constructor(Serverapp,port){
        this.app=Serverapp
        this.server = http.createServer(this.app);
        this.port=port
    }
    startSocket(){
        
const io = new Server(this.server, {
  cors: {
    origin: process.env.ALLOWORGIN,
    methods: ["GET", "POST"],
  },
});
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
    // console.log(` User disconnected: ${socket.id}`);
  });
});
    }
    startServer(){
        this.server.listen(this.port,()=>{
            console.log(`Server Started at http://localhost:${this.port}`);
            
        })
    }
}
module.exports=Socket