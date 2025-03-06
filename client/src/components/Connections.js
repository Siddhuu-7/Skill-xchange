import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEye, FaTasks, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MessageCircleMoreIcon } from 'lucide-react';
export default function Connections({ connection }) {
    
    const navigate = useNavigate();
    const profileInitial = connection?.userName?.charAt(0).toUpperCase() || '?';

const handelHelp=async()=>{
    const seeking = localStorage.getItem('Id');
    const seeker = connection._id;
   
   try {
    await axios.post(`${process.env.REACT_APP_API_URL}/seekAndSeeking`, {
        seeking,
        seeker,
        role:"seeking"
      });
   } catch (error) {
    console.log(error)
   }
}

    // const removeConnection =async () => {
    //     try {
    //         const recipient = localStorage.getItem('Id');
    //         const requester = connection._id;
            
    //         const res = await axios.post('https://backend-diwr.onrender.com/request', {
    //           recipient,
    //           requester,
              
    //           status: "rejected",
    //         });
      
    //         if (res.data) {
    //           console.log("Request declined. Updating status.",res.data);
             
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
        
    // };

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="d-flex justify-content-center mt-4">
                <Card style={{ width: '30rem', position: 'relative' }}>
                    {connection ? (
                        <>
                            <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                                <Button variant="link" onClick={() => navigate(`/publicprofile/${connection._id}`)}>
                                    Profile <FaEye />
                                </Button>
                            </div>
                            <Card.Body>
                                <div className="align-items-center mb-3">
                                    <div 
                                        className="rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '50px', 
                                            height: '50px', 
                                            backgroundColor: '#007bff', 
                                            color: 'white', 
                                            fontSize: '24px', 
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {profileInitial}
                                    </div>
                                    <div className="ms-3">
                                        <Card.Title>{connection.userName}</Card.Title>
                                    </div>
                                </div>

                                {/* New Buttons */}
                                <div className="d-flex justify-content-between mt-3">
                                    <Button className='bg-success'
                                    onClick={handelHelp}>
                                        Help
                                    </Button>
                                    <MessageCircleMoreIcon onClick={()=>navigate(`/message/${connection._id}/${connection.userName}`)}/>
                                </div>
                                
                            </Card.Body>
                        </>
                    ) : (
                        <p>No accepted connections found</p>
                    )}
                </Card>
                
            </div>
        </motion.div>
    );
}
