import axios from 'axios';
import { Check, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostsCard({ PostData }) {
  const navigate = useNavigate();
  const [clickedConnect, setConnect] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const firstLetter = PostData.userName ? PostData.userName.charAt(0).toUpperCase() : 'U';

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

  const avatarColor = PostData.userName ? getColorFromString(PostData.userName) : '#0d6efd';

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

  const handleToggleSkills = () => {
    setShowAllSkills(!showAllSkills); 
  };

  return (
    <div className="card h-100 shadow-sm hover-shadow transition">
      <div className="card-body">
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
        
        <p className="card-text text-truncate mb-3">{PostData.bio || "No bio available"}</p>
        
        <div className="d-flex align-items-center mb-3">
          <span className="fw-semibold me-2">Total Teaches:</span>
          <span className="badge rounded-pill bg-light text-dark">
            {PostData.TotalTeaches || Math.floor(Math.random() * 10)}
          </span>
        </div>
        
        <div className="d-flex flex-wrap gap-2 mt-3">
          {PostData.skills && 
            PostData.skills
              .slice(0, showAllSkills ? PostData.skills.length : 3)
              .map((skill, idx) => (
                <span key={idx} className="badge bg-light text-dark border">
                  {skill}
                </span>
              ))}
          
          {PostData.skills && PostData.skills.length > 3 && (
            <button 
              className="badge bg-white text-primary border-0" 
              style={{cursor: 'pointer'}}
              onClick={handleToggleSkills}
            >
              {showAllSkills ? 'Show Less' : '+ ' + (PostData.skills.length - 3) + ' more'}
            </button>
          )}
        </div>
        
        <div className="d-flex gap-2 mt-4">
          {PostData.status === "connected" ? (
            <button
              className="btn btn-dark d-flex align-items-center justify-content-center gap-1 flex-grow-1"
            >
              Connected <Check size={16} />
            </button>
          ) : clickedConnect ? (
            <button
              className="btn btn-dark d-flex align-items-center justify-content-center gap-1 flex-grow-1"
              onClick={handelPending}
            >
              Pending
            </button>
          ) : (
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center gap-1 flex-grow-1"
              onClick={handelConnect}
            >
              <MessageCircle size={16}/>
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