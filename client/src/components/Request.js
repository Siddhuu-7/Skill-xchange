import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Request({ data }) {
  const profileInitial = data.userName.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);  

  const handelAccept = async () => {
    try {
      const recipient = localStorage.getItem('Id');
      const requester = data._id;
      await axios.post(`${process.env.REACT_APP_API_URL}/request`, {
        recipient,
        requester,
        status: "accepted",
      });
      setStatus(true);  
    } catch (error) {
      console.log(error);
    }
  };

  const handelDecline = async () => {
    try {
      const recipient = localStorage.getItem('Id');
      const requester = data._id;
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/request`, {
        recipient,
        requester,
        status: "rejected",
      });

      if (res.data) {
        console.log("Request declined. Updating status.");
        setStatus(true);  
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  if (status) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="w-100" style={{ maxWidth: '30rem', position: 'relative' }}>
        <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
          <Button variant="link" onClick={() => navigate(`/publicprofile/${data._id}`)}>
            profile <FaEye />
          </Button>
        </div>
        <Card.Body>
          <div className="d-flex flex-column flex-sm-row align-items-center mb-3">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center mb-3 mb-sm-0"
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '24px',
                textTransform: 'uppercase',
              }}
            >
              {profileInitial}
            </div>
            <div className="ms-sm-3 text-sm-start">
              <Card.Title className='fst-italic'>{data.userName}</Card.Title>
              <Card.Title>Bio</Card.Title>
              <Card.Text>{data.summary}</Card.Text>

              <Card.Title>Total Teaches</Card.Title>
              <Card.Text>{data.TotalTeaches || Math.floor(Math.random() * 10)}</Card.Text>

              <Card.Title>Skills</Card.Title>
              <Card.Text>{data.skills.join(', ')}</Card.Text>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <Button variant="primary" className="mb-2 mb-sm-0" onClick={handelAccept}>
              Accept
            </Button>
            <Button variant="danger" className="mb-2 mb-sm-0" onClick={handelDecline}>
              Decline
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
