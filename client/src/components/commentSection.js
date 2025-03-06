import React from 'react';
import './CommentSection.css';
import { Italic } from 'lucide-react';

export default function CommentSection({
  showComments,
  comments,
  commentText,
  handleCommentChange,
  handlePostComment,
  closeCommentSection, 
}) {
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

          {!comments.length ? (
            <div className="no-comments-message fixed-bottom " style={{height:"35%", fontStyle:"italic"}}>No comments yet...</div>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <span className="fw-bold">User</span>
                <span> {comment}</span>
              </div>
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
