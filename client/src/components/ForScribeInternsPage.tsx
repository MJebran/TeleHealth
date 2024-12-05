import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ForScribeInternsPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1 className="text-primary" style={{ fontFamily: "Mariupol, sans-serif" }}>
          For Scribe Interns
        </h1>
        <p className="text-muted">
          Learn how TeleHealth helps build your career in healthcare.
        </p>
      </div>

      <Row className="g-4">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-primary">Why Join as a Scribe Intern?</h3>
              <ul>
                <li>Gain hands-on experience in medical documentation.</li>
                <li>Enhance your medical knowledge by working with experienced doctors.</li>
                <li>Play a vital role in streamlining communication between patients and doctors.</li>
                <li>Build a strong foundation for a career in healthcare.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-primary">How It Works</h3>
              <ol>
                <li>Receive calls from patients and create detailed cases.</li>
                <li>Record all necessary medical information provided by the patient.</li>
                <li>Share cases securely with doctors for review and treatment plans.</li>
                <li>Relay doctors' prescriptions and treatment advice back to patients.</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForScribeInternsPage;
