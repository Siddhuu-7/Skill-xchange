import React ,{use, useState}from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin } from "@react-oauth/google";
import {  Link,useNavigate } from "react-router-dom";
import ProfessionalSkillsImg from '../assests/Login.png';
import axios from "axios";
function LoginPage() {
    const [MobileNumber,setMobileNumber]=useState("")
    const [password,setPassword]=useState("")
const navigate=useNavigate()
    const googleLogin = async (token) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login-google`, { token });
        console.log("Login Response:", response.data);
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('Id',response.data._id)
        localStorage.setItem('name',response.data.userName)
        if(response){
          navigate('/home')

        }
      } catch (error) {
        console.error("Google login failed:", error.message);
      }
    };
const handelLogin=async()=>{
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login-details`, { MobileNumber,password });
    console.log("Login Response:", response.data);
    localStorage.setItem('token',response.data.token)
    localStorage.setItem('Id',response.data._id)
    localStorage.setItem('name',response.data.userName)

    if(response){
      navigate('/home')
    }
  } catch (error) {
    console.error(" login failed:", error.message);
  }
}
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
          <h2 className="text-center mb-4" style={{ color: '#2196F3' }}>Welcome To Hub</h2>
          
          
          <div className="mb-4 text-center">
            <GoogleLogin 
              onSuccess={(credentialResponse) => {
                googleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>

          
          <div className="d-flex align-items-center mb-4">
            <div className="flex-grow-1 border-top"></div>
            <span className="px-3 text-muted">or</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          
          
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
              <input 
                type="tel" 
                className="form-control" 
                value={MobileNumber}
                onChange={(e)=>setMobileNumber(e.target.value)}
                id="mobileNumber" 
                placeholder="Enter your mobile number" 
                style={{ borderColor: '#2196F3' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                id="password" 
                placeholder="Enter your password" 
                style={{ borderColor: '#2196F3' }}
              />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <Link  className="text-decoration-none" style={{ color: '#2196F3' }}>Forgot Password?</Link>
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
              onClick={handelLogin}
            >
              Login
            </button>
          

          
          <p className="mt-3 text-center">
            Don't have an account? 
            <Link  to='/signup'  replace={true} className="ms-2" style={{ color: '#2196F3' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;