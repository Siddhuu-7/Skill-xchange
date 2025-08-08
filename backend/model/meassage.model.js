const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  roomId:{type:String,default:" "},
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports=Message