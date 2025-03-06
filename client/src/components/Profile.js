import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => (
  <div className="container py-3">
    <div className="d-flex align-items-center mb-3">
      <Skeleton width={30} height={30} />
      <Skeleton width={150} height={25} className="ms-2" />
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm">
          <div className="card-header text-center bg-primary text-white">
            <Skeleton circle height={120} width={120} className="mb-3" />
            <Skeleton width={180} height={25} />
            <Skeleton width={220} height={18} />
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <Skeleton width={220} height={20} />
              </div>
              <div className="col-md-6">
                <Skeleton width={220} height={20} />
              </div>
            </div>
            <h4><Skeleton width={180} height={25} /></h4>
            <Skeleton width={"100%"} height={60} />
            <h4><Skeleton width={180} height={25} /></h4>
            <Skeleton width={"100%"} height={80} />
            <h4><Skeleton width={180} height={25} /></h4>
            <Skeleton width={"100%"} height={40} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const id = localStorage.getItem("Id");
      if (!id) {
        setError("User ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://backend-diwr.onrender.com/user/profileData/${id}`
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container py-5 text-center">
        <h3>No Profile Data</h3>
        <p>Please update your profile information.</p>
      </div>
    );
  }

  return (
    <div className="container py-3" >
      <div className="d-flex align-items-center mb-3">
        <p className="m-0 fs-3">
          <ArrowLeft size={24} onClick={() => navigate(-1)} /> Profile
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h2 className="mb-1">{profileData.userName || "No Name Provided"}</h2>
                <p className="mb-0">{profileData.professionalCategory || "No Category Provided"}</p>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <strong>
                    <FaMapMarkerAlt className="me-2" />
                    Location:
                  </strong>{" "}
                  {profileData.location || "No Location Provided"}
                </div>
                <div className="col-md-6">
                  <strong>
                    <FaEnvelope className="me-2" />
                    Email:
                  </strong>{" "}
                  {profileData.email || "No Email Provided"}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="border-bottom pb-2">Professional Summary</h4>
                <p>{profileData.summary || "No Summary Available"}</p>
              </div>

              <div className="mb-4">
                <h4 className="border-bottom pb-2">Work Experience</h4>
                {profileData.experience && profileData.experience.length > 0 ? (
                  profileData.experience.map((job, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">
                          {job.title} at {job.company}
                        </h5>
                        <p className="card-text">
                          {job.startDate} - {job.currentlyWorking ? "Present" : job.endDate}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No work experience provided.</p>
                )}
              </div>

              <div>
                <h4 className="border-bottom pb-2">Skills</h4>
                <div>
                  {profileData.skills && profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span key={index} className="badge bg-secondary me-2 mb-2">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skills provided.</p>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-outline-primary" onClick={() => navigate("/profileupdate")}>
                  <FaEdit className="me-2" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
