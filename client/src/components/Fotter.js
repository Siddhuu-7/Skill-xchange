import React from 'react';
import { User, GalleryVertical, Search, Home } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

export default function FooterNavbar() {
    const navigate=useNavigate()
  return (
    <>
      <div className="container-fluid" style={{ paddingBottom: '60px' }}> 
      </div>

      <nav className="navbar navbar-light bg-light fixed-bottom">
        <div className="container-fluid d-flex justify-content-around">
        <p 
              className="nav-link active text-center" 
              title="Search" 
              onClick={()=>navigate('/')}
              style={{ fontSize: '24px', color: '#007bff' }}
            >
              <Home size={28} />
              <span className="d-block" style={{ fontSize: '10px' }}>Home</span>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle" style={{ width: '8px', height: '8px' }}></span>
            </p>
           

          <Link to={'/posts'} className="text-decoration-none">
            <p className="nav-link active text-center" title="Posts" style={{ fontSize: '24px', color: '#007bff' }}>
              <GalleryVertical size={28} />
              <span className="d-block" style={{ fontSize: '10px' }}>Posts</span>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle" style={{ width: '8px', height: '8px' }}></span>
            </p>
          </Link>

          <Link to={'/mydashboard'} className="text-decoration-none">
            <p className="nav-link text-center" title="My Dashboard" style={{ fontSize: '24px', color: '#007bff' }}>
              <User size={28} />
              <span className="d-block" style={{ fontSize: '10px' }}>My Dashboard</span>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle" style={{ width: '8px', height: '8px' }}></span>
            </p>
          </Link>
        </div>
      </nav>
    </>
  );
}
