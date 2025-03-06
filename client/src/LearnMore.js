"use client";

import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import FeatureCard from "./FeatureCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MentorshipPlatform() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container className="my-5">
      <h1 className="display-4 mb-4 text-primary">Guidance, Growth & Great Connections</h1>

      <section className="mb-5">
        <p className="lead">
          Welcome to SRKR's <strong>Mentors & Mentees</strong> hub! 🚀 Whether you're looking for guidance or eager to share your knowledge, 
          this platform connects students and experienced mentors for an enriching learning experience. 
        </p>
        <Button variant="outline-primary" onClick={scrollToFeatures}>
          Explore How It Works 👇
        </Button>
      </section>

      <section id="features" className="mb-5">
        <h2 className="display-5 mb-4">Why Join?</h2>
        <Row className="g-4">
          <FeatureCard
            icon="🎯"
            title="Personalized Mentorship"
            description="Find mentors tailored to your interests, career goals, and skill level."
          />
          <FeatureCard
            icon="🌱"
            title="Grow Together"
            description="Mentees receive expert guidance, while mentors gain leadership experience."
          />
          <FeatureCard
            icon="🔗"
            title="Networking Opportunities"
            description="Build lifelong connections with industry experts and like-minded students."
          />
          <FeatureCard
            icon="📅"
            title="Flexible Sessions"
            description="Schedule one-on-one or group mentoring sessions at your convenience."
          />
          <FeatureCard
            icon="💬"
            title="Real-Time Interaction"
            description="Engage through chats, video calls, and discussion forums."
          />
          <FeatureCard
            icon="🏆"
            title="Recognized Achievements"
            description="Earn certificates and badges as you progress through mentorship programs."
          />
        </Row>
      </section>

      <section className="mb-5">
        <h2 className="display-5 mb-4">Tech-Driven & Secure</h2>
        <ul className="list-group">
          <li className="list-group-item">AI-powered mentor recommendations 🤖</li>
          <li className="list-group-item">Secure communication & resource sharing 🔐</li>
          <li className="list-group-item">Effortless scheduling with built-in calendar 📅</li>
          <li className="list-group-item">Interactive forums for peer-to-peer learning 💡</li>
          <li className="list-group-item">Gamified learning to boost engagement 🎮</li>
        </ul>
      </section>

      <section>
        <h2 className="display-5 mb-4">Ready to Get Started?</h2>
        <p className="lead mb-4">
          Join our mentorship network and unlock new opportunities! Whether you're a mentor or mentee, 
          your journey to knowledge and success starts here.
        </p>
        <Button variant="primary" href="mailto:SRKRMentorship2025@gmail.com">
          Connect with Us! 📬
        </Button>
      </section>
    </Container>
  );
}
