import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ForPatientsPage: React.FC = () => {
  return (
    <Container className="mt-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1
          className="text-primary display-4"
          style={{ fontFamily: "Mariupol, sans-serif" }}
        >
          For Patients
        </h1>
        <p className="text-muted lead">
          Discover how TeleHealth works to bring healthcare closer to you.
        </p>
      </div>

      {/* How It Works Section */}
      <Row className="g-4">
        <Col>
          <Card
            className="shadow-lg border-0"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <h3 className="text-primary mb-4">How It Works</h3>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item border-0">
                  <span>
                    Call{" "}
                    <a href="tel:+18005558353" className="text-primary fw-bold">
                      +1-800-555-TELE
                    </a>{" "}
                    to connect with a Scribe Intern.
                  </span>
                </li>
                <li className="list-group-item border-0">
                  The Scribe Intern will create your case by gathering
                  information about your condition.
                </li>
                <li className="list-group-item border-0">
                  Once your case is created, it will be made available to
                  Doctors.
                </li>
                <li className="list-group-item border-0">
                  A Doctor will choose your case and provide a prescription
                  based on your condition.
                </li>
                <li className="list-group-item border-0">
                  The Scribe Intern will call you back to inform you about the
                  Doctor's prescription and next steps.
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Us Section */}
      <Row className="mt-5">
        <Col>
          <Card
            className="shadow-lg border-0"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <h3 className="text-primary mb-4">Contact Us</h3>
              <p className="lead">
                For more information or to create your case, call us at:{" "}
                <a href="tel:+18005558353" className="text-primary fw-bold">
                  +1-800-555-TELE
                </a>
              </p>
              <p className="text-muted">
                Our Scribe Interns are available to assist you with your
                healthcare needs.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForPatientsPage;
