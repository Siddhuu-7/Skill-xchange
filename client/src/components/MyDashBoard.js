import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Seekers from './seekers';
import Seeking from './seeking';
import Progress from './Progress';
import Request from './Request';
import { Home, User2Icon ,ArrowLeft} from 'lucide-react';
import Connections from './Connections';
import axios from 'axios';

export default function MyDashBoard() {
  const [activeSection, setActiveSection] = useState('seeking'); 
  const [requestData, setRequestData] = useState([]);
  const [connection, setConnection] = useState([]);
  const [seeking, setSeeking] = useState([]);
  const [seekers, setSeekers] = useState([]);
  const [error, setError] = useState(null);

  const sectionIndex = ['connections', 'progress', 'seeking', 'seekers', 'request'].indexOf(activeSection);
const navigate=useNavigate()
  const fetchData = async () => {
    try {
      const id = localStorage.getItem('Id');
      if (!id) {
        setError("User ID not found in localStorage!");
        console.warn("⚠️ No user ID found in localStorage");
        return;
      }

      const apiUrls = [
        `${process.env.REACT_APP_API_URL}/get-accepted-request/${id}`,
        `${process.env.REACT_APP_API_URL}/seekAndSeeking/handelSeeking/${id}`,
       `${process.env.REACT_APP_API_URL}/seekAndSeeking/handelSeeker/${id}`,
       `${process.env.REACT_APP_API_URL}/get-all-requests/${id}`
      ];

      const [connectionsRes, seekingRes, seekersRes, requestsRes] = await Promise.allSettled(
        apiUrls.map(url => axios.get(url))
      );
      
      
      

      if (connectionsRes.status === "fulfilled") setConnection(connectionsRes.value.data || []);
      if (seekingRes.status === "fulfilled") setSeeking(seekingRes.value.data || []);
      if (seekersRes.status === "fulfilled") setSeekers(seekersRes.value.data || []);
      if (requestsRes.status === "fulfilled") setRequestData(requestsRes.value.data || []);

    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 2000); 
  
    return () => clearInterval(interval); 
  }, [activeSection]);  
  

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
         
          <p className="navbar-brand"><ArrowLeft size={24} onClick={()=>navigate(-1)}/> MyDashboard</p>
          <div className="d-flex ms-auto">
           
            <Link to={'/profile'} replace={true}>
              <p className="nav-link"><User2Icon /></p>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-light py-3 position-relative">
        <div className="d-flex justify-content-around">
          {['connections', 'progress', 'seeking', 'seekers', 'request'].map((section) => (
            <p
              key={section}
              className={`nav-link ${activeSection === section ? 'fw-bold' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </p>
          ))}
        </div>
        <div
          className="position-absolute"
          style={{
            height: '3px',
            backgroundColor: "#FAEBD7",
            width: '20%',
            transition: 'all 0.3s ease',
            bottom: '0',
            left: '0',
            transform: `translateX(${sectionIndex * 20}vw)`,
            borderRadius: '2px'
          }}
        ></div>
      </div>

      <div className="container mt-4">
        {error && <p className="text-danger">{error}</p>}

        {activeSection === 'request' && requestData.map((d, i) => <Request key={i} data={d} />)}
        {activeSection === 'connections' && connection.map(conn => <Connections key={conn._id} connection={conn} />)}
        {activeSection === 'progress' && <Progress />}
        {activeSection === 'seeking' && seeking.map(data => <Seeking key={data._id} data={data} />)}
        {activeSection === 'seekers' && seekers.map(data => <Seekers key={data._id} data={data} />)}
      </div>
    </div>
  );
}
