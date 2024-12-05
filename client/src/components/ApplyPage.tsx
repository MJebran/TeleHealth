import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ApplyPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <h1 className="text-primary" style={{ fontFamily: "Mariupol, sans-serif" }}>
          Apply to Join TeleHealth
        </h1>
        <p className="text-muted">
          Interested in becoming part of TeleHealth? Follow the instructions below to apply as a Doctor or Scribe Intern.
        </p>
      </div>

      <Row className="g-4">
        {/* Card for Doctors */}
        <Col md={6}>
          <Card
            className="shadow-lg border-0"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <Card.Title className="text-primary">For Doctors</Card.Title>
              <Card.Text>
                Join our team of healthcare professionals and help provide exceptional care.
                <ul>
                  <li>✔ Collaborate with patients virtually</li>
                  <li>✔ Access our secure platform for consultations</li>
                  <li>✔ Work with a team of skilled Scribe Interns</li>
                </ul>
                <strong>Contact:</strong> admin@telehealth.com
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="primary" href="mailto:admin@telehealth.com">
                Contact Administration
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Card for Scribe Interns */}
        <Col md={6}>
          <Card
            className="shadow-lg border-0"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <Card.Title className="text-primary">For Scribe Interns</Card.Title>
              <Card.Text>
                Get hands-on experience and enhance your career in healthcare.
                <ul>
                  <li>✔ Assist Doctors with documentation</li>
                  <li>✔ Gain exposure to real-world cases</li>
                  <li>✔ Learn from healthcare experts</li>
                </ul>
                <strong>Contact:</strong> admin@telehealth.com
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="primary" href="mailto:admin@telehealth.com">
                Contact Administration
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyPage;
