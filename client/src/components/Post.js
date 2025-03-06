import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import './App.css';
import unknown from '../assests/unknown.jpg';
import CommentSection from './commentSection'; 
import Skeleton from 'react-loading-skeleton';

export default function CollabPosts({ post, isLoading }) {
  const [liked, setLiked] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showComments, setShowComments] = useState(false); 
  const [commentText, setCommentText] = useState(''); 
  const [comments, setComments] = useState(post.comments || []); 
  
  const toggleLike = (postId) => {
    setLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev); 
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handlePostComment = () => {
    if (commentText.trim() !== '') {
      setComments((prev) => [...prev, commentText]); 
      setCommentText(''); 
    }
  };

  if (isLoading) {
    return (
      <div className="container my-1" >
        <div className="post mb-2">
          <div className="post-header d-flex justify-content-between align-items-center" >
            <Skeleton circle width={40} height={40} />
            <Skeleton width="50%" />
            <Skeleton width={30} height={20} />
          </div>
          <Skeleton height={300} />
          <div className="post-body">
            <Skeleton width="50%" height={20} />
            <Skeleton width="30%" />
          </div>
          <Skeleton width="40%" height={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="container my-0" style={{ width: "100%" }}>
      <div key={post.id} className="post mb-4">
        <div className="post-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={post.userAvatar ? post.userAvatar : unknown}
              alt={post.username}
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <span className="fw-bold">{post.username}</span>
          </div>
          <button className="btn btn-link text-muted">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <img
          src={post.image}
          alt="Post content"
          className="post-img img-fluid"
          onClick={() => handleImageClick(post.image)}
        />

        <div className="post-body">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex">
              <button
                onClick={() => toggleLike(post.id)}
                className={`btn btn-link ${liked[post.id] ? 'text-danger' : 'text-muted'}`}
              >
                <Heart size={24} fill={liked[post.id] ? 'currentColor' : 'none'} />
              </button>
              <button className="btn btn-link text-muted" onClick={toggleComments}>
                <MessageCircle size={24} />
              </button>
              <button className="btn btn-link text-muted">
                <Send size={24} />
              </button>
            </div>
            <button className="btn btn-link text-muted">
              <Bookmark size={24} />
            </button>
          </div>

          <div className="fw-bold mb-2">{post.likes.toLocaleString()} likes</div>

          <div>
            <span className="fw-bold">{post.username}</span>
            <span> {post.caption}</span>
          </div>

          <div className="text-muted text-xs mt-1">{post.timeAgo}</div>
        </div>

        <CommentSection
          showComments={showComments}
          comments={comments}
          commentText={commentText}
          handleCommentChange={handleCommentChange}
          handlePostComment={handlePostComment}
          closeCommentSection={toggleComments}
        />
      </div>

      {selectedImage && (
        <div className="modal d-block" style={{ display: 'block' }} onClick={closeModal}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <img
                  src={selectedImage}
                  alt="Full view"
                  className="img-fluid"
                  style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
