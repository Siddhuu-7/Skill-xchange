import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import unknown from '../assests/unknown.jpg';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [privacy, setPrivacy] = useState('Public');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');  
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImages([reader.result]);
      };
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); 

    const postData = {
      user: localStorage.getItem('name'),
      user_id: localStorage.getItem('Id'),
      content: postContent,
      image: selectedImages.length > 0 ? selectedImages[0] : null,
      privacy: privacy,
      hashtags: hashtags.trim(), 
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/createpost`, postData);
      setPostContent('');
      setSelectedImages([]);
      setHashtags('');
    } catch (err) {
      setError('Post failed, please try again!'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <p className="m-2 fs-5 fixed-top">
          <ArrowLeft size={24} onClick={() => navigate(-1)} /> Home
        </p>
      <div className="d-flex align-items-center mb-2" style={{ padding: '20px 10px 0' }}>
        
      </div>
      <div className="flex-grow-1 overflow-auto" style={{ padding: '20px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Create Post</h5>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-globe me-2"></i>
              {privacy}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => setPrivacy('Public')}>Public</button></li>
              <li><button className="dropdown-item" onClick={() => setPrivacy('Friends')}>Friends</button></li>
              <li><button className="dropdown-item" onClick={() => setPrivacy('Only Me')}>Only Me</button></li>
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <img
            src={unknown}
            alt="User"
            className="rounded-circle me-2"
            height={"50px"}
          />
          <div>
            <div className="fw-bold">{localStorage.getItem('name')}</div>
            <small className="text-muted">{privacy}</small>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control border-0"
              rows="4"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>

          {selectedImages.length > 0 && (
            <div className="row g-2 mb-3">
              {selectedImages.map((url, index) => (
                <div key={index} className="col-6">
                  <div className="position-relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="img-fluid rounded"
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                    />
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0 m-2 bg-white"
                      onClick={() => removeImage(index)}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-3">
            <small className="fw-bold d-block mb-2">Add Trending Hashtags</small>
            <input
              type="text"
              className="form-control"
              placeholder="Add hashtags like #movie, #tech"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <small className="fw-bold d-block mb-2">Add to your post</small>
              <div className="btn-group">
                <label className="btn btn-light" role="button">
                  <i className="bi bi-image text-success"></i>
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <button type="button" className="btn btn-light">
                  <i className="bi bi-camera-video text-primary"></i>
                </button>
                <button type="button" className="btn btn-light">
                  <i className="bi bi-emoji-smile text-warning"></i>
                </button>
                <button type="button" className="btn btn-light">
                  <i className="bi bi-geo-alt text-danger"></i>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading || (!postContent && selectedImages.length === 0)}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Posting...
              </>
            ) : (
              'Post'
            )}
          </button>
        </form>

        {error && (
          <div className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 z-index-999">
            <div className="alert alert-danger" role="alert" style={{ maxWidth: '400px', width: '100%' }}>
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
