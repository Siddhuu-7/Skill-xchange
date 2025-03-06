import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Link } from "react-router-dom";
import { GalleryVertical, User, MessageCircleMore } from "lucide-react";
import Logo from "../assests/Login.png"
import SearchBar from "./searchbar"; 

const Navbar = ({handelSearch}) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" style={{ height: '50px' }} />
          </Link>

          <div className="d-none d-lg-block mx-3" style={{ width: '200px' }}>
            <SearchBar handelSearch={handelSearch}/>
          </div>

          <div className="d-block d-lg-none mx-4 w-50">
            <SearchBar handelSearch={handelSearch} />
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link to="/profile" className="nav-link d-flex align-items-center">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"  
                  alt="Profile" 
                  className="rounded-circle me-2" 
                  style={{ width: '30px', height: '30px', objectFit: 'cover' }} 
                />
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <GalleryVertical size={24} /> Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mydashboard" className="nav-link">
                <User size={24} /> My Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/message" className="nav-link">
                <MessageCircleMore size={24} /> Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faqs" className="nav-link">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
