import React,{useState} from 'react'
import Post from './Post'
import posts from '../setupTests'
import { useNavigate } from 'react-router-dom';
import unknown from '../assests/unknown.jpg'
export default function Posts() {
  const [text, setText] = useState("");
  const navigate=useNavigate()
  return (
    
      <div className="container my-1">
    <div className="card mb-2 shadow-sm" onClick={()=>navigate('/createpost')}>
      <div className="card-header bg-white d-flex align-items-center">
        <img
          src={unknown||"user-profile.png"} 
          alt="userProfile"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <input
          type="text"
          className="form-control"
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary ms-2" >
          Post
        </button>
      </div>
    </div>

      {posts.map(post=><Post post={post}/>)}
    </div>
  )
}
