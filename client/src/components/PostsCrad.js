import axios from 'axios';
import { Check ,MessageCircle} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostsCard({ PostData }) {
  const navigate = useNavigate();
  const [clickedConnect, setConnect] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const firstLetter = PostData.userName.charAt(0).toUpperCase();

  const getColorFromString = (str) => {
    const colors = [
      '#0d6efd', 
      '#198754', 
      '#6f42c1', 
      '#d63384', 
      '#0dcaf0',
      '#20c997', 
      '#6610f2'  
    ];
    const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const handelConnect = async () => {
    const requester = localStorage.getItem('Id');
    setConnect(!clickedConnect);
    const recipient = PostData._id;
    await axios.post(`${process.env.REACT_APP_API_URL}/request`, { requester, recipient, status: "pending" });
  };

  const handelPending = async () => {
    const requester = localStorage.getItem('Id');
    setConnect(!clickedConnect);
    const recipient = PostData._id;
    await axios.post(`${process.env.REACT_APP_API_URL}/request`, { requester, recipient, status: "cancelled" });
  };

  const avatarColor = getColorFromString(PostData.userName);

  const handleToggleSkills = () => {
    setShowAllSkills(!showAllSkills); 
  };

  return (
    <div className="card shadow-sm h-100" style={{ maxWidth: '24rem', minHeight: '400px' }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: avatarColor,
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}
          >
            {firstLetter}
          </div>
          <div className="ms-3 overflow-hidden">
            <h5 className="card-title mb-0 text-truncate">{PostData.userName}</h5>
            {PostData.summary && (
              <p className="card-text small text-muted text-truncate mb-0">
                {PostData.summary}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            <span className="fw-semibold">Total Teaches</span>
            <span className="ms-2 badge rounded-pill bg-light text-dark">
              {PostData.TotalTeaches || Math.floor(Math.random() * 10)}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-book me-2"></i>
            <span className="fw-semibold">Skills</span>
          </div>
          <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '80px', overflowY: 'auto' }}>
            {PostData.skills.slice(0, showAllSkills ? PostData.skills.length : 2).map((skill, index) => (
              <span
                key={index}
                className="badge rounded-pill"
                style={{
                  backgroundColor: 'rgba(13, 110, 253, 0.1)', 
                  color: '#0d6efd',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          {PostData.skills.length > 2 && (
            <button className="btn btn-link" onClick={handleToggleSkills}>
              {showAllSkills ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="d-flex gap-2 mt-auto pt-3">
          {PostData.status === "connected" ? (
            <button
              className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Connected <Check />
            </button>
          ) : clickedConnect ? (
            <button
              className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={handelPending}
            >
              <i className="bi bi-chat"></i>
              Pending
            </button>
          ) : (
            <button
              className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "#1e90ff", color: "white" }}
              onClick={handelConnect}
            >
              <MessageCircle size={24}/>
              Connect
            </button>
          )}

          <button
            onClick={() => navigate(`/publicprofile/${PostData._id}`)}
            className="btn btn-outline-primary flex-grow-1"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
