import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GalleryVertical, User, MessageCircleMore } from "lucide-react";
import Logo from "../assests/Login.png";
import SearchBar from "./searchbar";
import { useNavigate } from "react-router-dom";
const Navbar = ({ handelSearch }) => {
  const navigate=useNavigate()
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" style={{ height: '50px' }} />
        </Link>

        <div className="d-none d-lg-block mx-3" style={{ width: '300px' }} onClick={()=>navigate('/SearchPage')}>
          <SearchBar handelSearch={handelSearch} />
        </div>

        <div className="d-block d-lg-none mx-2" style={{ width: '40%' }}  onClick={()=>navigate('/SearchPage')}>
          <SearchBar handelSearch={handelSearch} />
        </div>

        <div className="navbar-nav ms-auto">
          <Link to="/profile" className="nav-link d-flex align-items-center mx-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              alt="Profile"
              className="rounded-circle me-1 d-none d-md-block"
              style={{ width: '24px', height: '24px', objectFit: 'cover' }}
            />
            <span className="d-none d-md-block">Profile</span>
            <User size={20} className="d-block d-md-none" />
          </Link>
          
          {/* <Link to="/posts" className="nav-link mx-2">
            <GalleryVertical size={20} className="me-1 d-none d-md-block" />
            <span className="d-none d-md-block">Posts</span>
            <GalleryVertical size={20} className="d-block d-md-none" />
          </Link> */}
          
          <Link to="/mydashboard" className="nav-link mx-2">
            <User size={20} className="me-1 d-none d-md-block" />
            <span className="d-none d-md-block">Dashboard</span>
            <User size={20} className="d-block d-md-none" />
          </Link>
          
          <Link to="/message" className="nav-link mx-2">
            <MessageCircleMore size={20} className="me-1 d-none d-md-block" />
            <span className="d-none d-md-block">Messages</span>
            <MessageCircleMore size={20} className="d-block d-md-none" />
          </Link>
          
          <Link to="/faqs" className="nav-link mx-2 d-none d-md-block">
            FAQs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;