import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import Done from './Done';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ProfileUpdate() {
  const [profile, setProfile] = useState({
    userName: '',
    professionalCategory: '',
    location: '',
    summary: '',
    skills: [],
    experience: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    title: '',
  });
  const [newSkill, setNewSkill] = useState('');
const Navigate=useNavigate();
  const professionalCategories = [
    'Student',
    'Employee',
    'Teacher/Educator',
    'Freelancer',
    'Entrepreneur',
    'Manager',
    'Professional Researcher',
    'Consultant',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowSuccess(false);
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.title) {
      setProfile((prev) => ({
        ...prev,
        experience: [...prev.experience, newExperience],
      }));
      setNewExperience({
        company: '',
        title: '',
      });
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const removeExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('Id');
     await axios.post(`${process.env.REACT_APP_API_URL}/user/profileDataUpdate`, { id, profile });
    setShowSuccess(!showSuccess);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('Id');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profileData/${id}`);
        const data = res.data;

        setProfile({
          userName: data.userName.charAt(0).toUpperCase() + data.userName.slice(1) || '',
          professionalCategory: data.professionalCategory || '',
          location: data.location.charAt(0).toUpperCase() + data.location.slice(1) || '',
          email: data.email || '',
          summary: data.summary || '',
          skills: data.skills || [],
          experience: data.experience || [],
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-3">
 <div className="d-flex align-items-center mb-3">
        <p className="m-0 fs-5">
          <ArrowLeft size={24} onClick={() => Navigate(-1)} /> Back To Profile 
        </p>
      </div>      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Professional Profile</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      value={profile.userName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Professional Category</label>
                    <select
                      className="form-select"
                      name="professionalCategory"
                      value={profile.professionalCategory}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Professional Category</option>
                      {professionalCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      disabled={true}
                      placeholder="Professional email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    className="form-control"
                    name="summary"
                    value={profile.summary}
                    onChange={handleChange}
                    placeholder="Write a brief professional summary"
                    rows="4"
                  />
                </div>

                <div className="mb-3">
                  <h4>Skills</h4>
                  <div className="row mb-3">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="button" className="btn btn-primary" onClick={addSkill}>
                        Add Skill
                      </button>
                    </div>
                  </div>
                  <div>
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="badge bg-secondary me-2 mb-2">
                        {skill}
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => removeSkill(index)}
                        >
                          X
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <h4>Work Experience or Project</h4>
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="card mb-2">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="card-title">{exp.title} at {exp.company}</h5>
                        </div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeExperience(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Role"
                        value={newExperience.company}
                        onChange={(e) =>
                          setNewExperience((prev) => ({ ...prev, company: e.target.value }))
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={newExperience.title}
                        onChange={(e) =>
                          setNewExperience((prev) => ({ ...prev, title: e.target.value }))
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="button" className="btn btn-primary" onClick={addExperience}>
                        Add Experience
                      </button>
                    </div>
                  </div>
                </div>
                {showSuccess && <Done />}
                <button type="submit" className="btn btn-success w-100">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
