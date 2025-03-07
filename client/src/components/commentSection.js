import React from 'react';
import './CommentSection.css';

function CommentItem({ profilePic, username, text }) {
  return (
    <div className=" rounded-cricle comment-item d-flex align-items-center mb-2">
      <img src={profilePic} alt={username} className="profile-pic me-2" />
      <div>
        <span className="fw-bold">{username}</span>
        <span> {text}</span>
      </div>
    </div>
  );
}

export default function CommentSection({
  showComments,
  commentText,
  handleCommentChange,
  handlePostComment,
  closeCommentSection,
}) {
  const staticComments = [
    { username: "Alice", text: "Super good!", profilePic: "https://i.pravatar.cc/40?img=1" },
    { username: "Bob", text: "Awesome!", profilePic: "https://i.pravatar.cc/40?img=2" },
    { username: "Charlie", text: "Really helpful!", profilePic: "https://i.pravatar.cc/40?img=3" },
    { username: "David", text: "Great work!", profilePic: "https://i.pravatar.cc/40?img=4" },
    { username: "Eve", text: "Loved it!", profilePic: "https://i.pravatar.cc/40?img=5" }
  ];

  return (
    showComments && (
      <div className="comment-section-wrapper">
        <div className="comments-section">
          <button
            className="close-btn"
            onClick={closeCommentSection}
            aria-label="Close"
          >
            X
          </button>

          {!staticComments.length ? (
            <div className="no-comments-message fixed-bottom" style={{ height: "35%", fontStyle: "italic" }}>
              No comments yet...
            </div>
          ) : (
            staticComments.map((comment, index) => (
              <CommentItem
                key={index}
                profilePic={comment.profilePic}
                username={comment.username}
                text={comment.text}
              />
            ))
          )}

          <div className="comment-input fixed-bottom d-flex align-items-center p-3 border-top bg-white rounded-top">
            <input
              type="text"
              placeholder="Add a comment..."
              className="form-control form-control-m rounded-start me-2"
              value={commentText}
              onChange={handleCommentChange}
            />
            <button className="btn btn-primary btn-m rounded-end" onClick={handlePostComment}>
              Post
            </button>
          </div>
        </div>
      </div>
    )
  );
}
