import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link ,useNavigate} from "react-router-dom";
import ProfessionalSkillsImg from '../assests/signup.webp';
import axios from "axios";
function SignupPage() {
  const [formData, setFormData] = useState({
    userName: '',
    MobileNumber: '',
    email:'',
    password: '',
    
  });
  const navigate=useNavigate()
const [confirmPassword,setConfirmPassword]=useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/user/signup`,formData)
    .then(res=>{
      if(res){
        navigate('/login')
      }
    })
    .catch(err=>{
      alert('signUp failed')
      console.log(err)
    })
    console.log(formData)
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ background: '#D5F3F5' }}>
      <div className="row shadow-lg rounded overflow-hidden bg-white" style={{ maxWidth: '900px', width: '100%' }}>
     
        <div className="col-md-6 p-0 d-none d-md-block">
          <div className="h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f0f4f8' }}>
            <img 
              src={ProfessionalSkillsImg} 
              alt="Learning Illustration" 
              className="img-fluid rounded" 
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>

        
        <div className="col-md-6 p-5">
          <h2 className="text-center mb-4" style={{ color: '#2196F3' }}>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                id="username"
                name="userName"
                placeholder="Enter a username" 
                value={formData.userName}
                onChange={handleChange}
                style={{ borderColor: '#2196F3' }}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
              <input 
                type="tel" 
                className="form-control" 
                id="mobileNumber"
                name="MobileNumber"
                placeholder="Enter mobile number" 
                value={formData.MobileNumber}
                onChange={handleChange}
                style={{ borderColor: '#2196F3' }}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">Email</label>
              <input 
                type="Email" 
                className="form-control" 
                id="mobileNumber"
                name="email"
                placeholder="Enter mobile email" 
                value={formData.email}
                onChange={handleChange}
                style={{ borderColor: '#2196F3' }}
                required 
              />
            </div>
{/* 
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender"
                    id="female"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </div>
            </div> */}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                name="password"
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                style={{ borderColor: '#2196F3' }}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                style={{ borderColor: '#2196F3' }}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn w-100 py-2" 
              style={{ 
                backgroundColor: '#2196F3', 
                color: 'white',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? 
            <Link to="/login"  replace={true}className="ms-2" style={{ color: '#2196F3' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;