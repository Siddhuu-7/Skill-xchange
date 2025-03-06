import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Book, 
  Users, 
  Globe, 
  Star, 
  LogIn,
  Target,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import mentorimg2 from './assests/mentorimg2.png'
import mentorimg1 from './assests/image.png'
import mentorimg3 from './assests/mentorimg3.png'
const MentorMenteeLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <p className="navbar-brand fw-bold text-primary">
            <sup>skill</sup> & <sub>Exchange</sub>
          </p>
          <div className="ms-auto">
            <button className="btn btn-primary d-flex align-items-center" 
            onClick={() => navigate('/login')}> 
              <LogIn className="me-2" size={20} />
              Login
            </button>
          </div>
        </div>
      </nav>

      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Guidance. Growth. Success.</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '800px' }}>
            Our platform connects mentors and mentees, fostering knowledge sharing, career growth, and skill development through meaningful guidance and collaboration.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>Get Started</button>
            <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/learnmore')}>Learn More</button>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="h2 mb-4">Why Mentorship Matters</h2>
              <div className="mb-4">
                <div className="d-flex mb-3">
                  <Target className="text-danger me-3" size={40} />
                  <div>
                    <h3 className="h5">The Challenge</h3>
                    <p className="text-muted">Many individuals struggle to find guidance and direction in their careers, education, and skill development.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <TrendingUp className="text-success me-3" size={40} />
                  <div>
                    <h3 className="h5">Our Solution</h3>
                    <p className="text-muted">We connect aspiring learners with experienced  create an enriching and supportive learning journey.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100" src={mentorimg1} alt="Mentorship" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={mentorimg2} alt="Learning Together" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={mentorimg3} alt="Growth" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">How Our Platform Works</h2>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            receive personalized guidance, and take your skills and career to the next level through mentorship.
          </p>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <Book className="text-primary mb-3" size={50} />
                  <h3 className="card-title">Find a Mentor</h3>
                  <p className="card-text text-muted">
                    Get matched with experienced professionals who can guide you in your career and personal growth.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <Users className="text-success mb-3" size={50} />
                  <h3 className="card-title">Build Connections</h3>
                  <p className="card-text text-muted">
                    Engage in meaningful discussions, share knowledge, and network with like-minded individuals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <Globe className="text-info mb-3" size={50} />
                  <h3 className="card-title">Join a Community</h3>
                  <p className="card-text text-muted">
                    Become part of a supportive global community of learners and mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">What Our Users Say</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <blockquote className="blockquote">
                <p className="mb-4">
                  "This mentorship platform has been life-changing. My mentor helped me gain confidence and skills that I never thought possible."
                </p>
                <footer className="blockquote-footer">
                  <Star className="text-warning me-2" size={20} />
                  Happy Mentee
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorMenteeLanding;