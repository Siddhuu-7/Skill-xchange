import React from "react"
import { Card, Col } from "react-bootstrap"

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Col md={6} lg={4}>
      <Card className="h-100">
        <Card.Body>
          <div className="display-4 mb-3">{icon}</div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FeatureCard

