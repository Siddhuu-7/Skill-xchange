import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Camera, Phone, Video, Image, Send, MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
const socket = io('http://localhost:5000'); 

const ChatUI = () => {
  const { id ,userName} = useParams(); 
  const senderId = localStorage.getItem('Id'); 
  const [msg,setmsg]=useState()
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (senderId && id) {
      socket.emit("joinChat", { senderId, receiverId: id });
    }
  }, [senderId, id]);
  const isOwn = (messageSenderId) => {
    return messageSenderId === senderId;
  };
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((message) => message._id === msg._id)) {
          setmsg(msg.senderId)
          return [...prevMessages, { ...msg}];
        }
        return prevMessages;
      });
    });
  
    return () => socket.off("receiveMessage");
  }, [senderId]);
  
useEffect(()=>{
  const fetchMessages=async()=>{
try {
  const res=await axios.get(`http://localhost:5000/get/messages?senderId=${localStorage.getItem('Id')}&receiverId=${id}`)
if(res.data){
  setMessages(res.data)
}
} catch (error) {
  console.log(error)
}
  }
  fetchMessages();
},[])
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        senderId,
        receiverId: id,
        message: newMessage,
      };
      socket.emit("sendMessage", messageData);
  
      setMessages((prevMessages) => [
        ...prevMessages,
      ]);
      setNewMessage('');
    }
  };
  

  return (
    <div className="vh-100 d-flex flex-column" style={{ background: '#f8f9fa' }}>
      <div className="bg-white shadow-sm fixed-top w-100" style={{ zIndex: 10 }}>
        <div className="container-fluid py-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.oRg5_S8cDQuMcs_nkK8ZwAAAAA&pid=Api&P=0&h=180"
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                <Badge
                  bg="success"
                  className="position-absolute bottom-0 end-0 border border-white rounded-circle"
                  style={{ width: '12px', height: '12px' }}
                />
              </div>
              <div className="ms-3">
                <h6 className="mb-0 fw-bold">{userName}</h6>
                <small className="text-muted">Online</small>
              </div>
            </div>

            <div className="d-flex">
              <Button variant="link" className="p-0">
                <Phone size={20} />
              </Button>
              <Button variant="link" className="p-0 ms-3">
                <Video size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto px-3 py-4">
        <div className="fluid-container px-3" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {messages.map((message, index) => (
  <div
    key={index}
    className={`d-flex mb-4 ${isOwn(message.senderId) ? 'justify-content-end' : 'justify-content-start'}`}
  >
    {!isOwn(message.senderId) && (
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.oRg5_S8cDQuMcs_nkK8ZwAAAAA&pid=Api&P=0&h=180"
        alt="User Avatar"
        className="rounded-circle me-2 align-self-end"
        style={{ width: '36px', height: '36px' }}
      />
    )}
    <div
      className={`p-3 ${isOwn(message.senderId) ? 'bg-primary text-white' : 'bg-light'}`}
      style={{
        borderRadius: '18px',
        maxWidth: '75%',
        position: 'relative',
        borderBottomLeftRadius: isOwn(message.senderId) ? '4px' : '18px',
        borderBottomRightRadius: isOwn(message.senderId) ? '18px' : '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      <p className="mb-1">{message.message}</p>
      <small className={`${isOwn(message.senderId) ? 'text-light' : 'text-muted'}`}>
        {new Date(message.timestamp).toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </small>
    </div>
  </div>
))}

        </div>
      </div>

      <div className="bg-white border-top fixed-bottom w-100">
        <div className="container-fluid p-3">
          <Form onSubmit={handleSendMessage}>
            <InputGroup className="shadow-sm">
              <Form.Control
                ref={inputRef}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border-start-0 border-end-0"
              />
              <Button variant="primary" type="submit">
                <Send size={20} />
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
