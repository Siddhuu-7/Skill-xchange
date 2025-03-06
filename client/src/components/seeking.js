import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Request({ data }) {
  const navigate = useNavigate();
  const profileInitial = data.seekeingData.userName.charAt(0).toUpperCase();

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="w-100 " style={{ maxWidth: '30rem', position: 'relative' }}>
        <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
          <Button variant="link" onClick={() => navigate(`/publicprofile/${data.seekeingData._id}`)}>
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
              <Card.Title className="fst-italic">{data.seekeingData.userName}</Card.Title>
              <Card.Title>Bio</Card.Title>
              <Card.Text>{data.seekeingData.summary || 'No summary available'}</Card.Text>

              <Card.Title>Total Teaches</Card.Title>
              <Card.Text>{data.seekeingData.TotalTeaches || Math.floor(Math.random() * 10)}</Card.Text>

              <Card.Title>Skills</Card.Title>
              <Card.Text>{data.seekeingData.skills.join(', ') || 'No skills available'}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
