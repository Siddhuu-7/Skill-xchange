import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimationComponent = () => {
  const [show, setShow] = React.useState(true);

  return (
    <Modal 
      show={show} 
      onHide={() => setShow(false)}
      centered
      animation={true}
      dialogClassName="animate__animated animate__bounceIn"
    >
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Update Successful!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="text-success mb-3">
          <i className="bi bi-check-circle-fill" style={{fontSize: '3rem'}}></i>
        </div>
        <p>Your changes have been saved successfully.</p>
      </Modal.Body>
      <Modal.Footer>
        <button 
          className="btn btn-success" 
          onClick={() => setShow(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnimationComponent;