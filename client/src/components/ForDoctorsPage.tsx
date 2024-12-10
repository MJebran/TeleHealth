import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ForDoctorsPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1
          className="text-primary"
          style={{ fontFamily: "Mariupol, sans-serif" }}
        >
          For Doctors
        </h1>
        <p className="text-muted">
          Discover how TeleHealth can enhance your medical practice.
        </p>
      </div>

      <Row className="g-4">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h3 className="text-primary">Why Use TeleHealth?</h3>
              <ul>
                <li>
                  Expand your reach to patients beyond geographical boundaries.
                </li>
                <li>Manage virtual appointments with ease and flexibility.</li>
                <li>Securely maintain and access patient records online.</li>
                <li>
                  Improve patient outcomes with seamless collaboration with
                  Scribe Interns.
                </li>
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
                <li>
                  Access the platform and review cases submitted by Scribe
                  Interns.
                </li>
                <li>Choose cases that match your specialty and expertise.</li>
                <li>
                  Provide detailed prescriptions and treatment plans securely.
                </li>
                <li>
                  Collaborate with Scribe Interns to ensure effective
                  communication with patients.
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForDoctorsPage;
