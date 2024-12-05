import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <Container className="mt-5">
      {/* Hero Section */}
      <div className="text-center p-3 rounded shadow">
        {/* Text Section */}
        <div className="mb-4">
          <h1
            className="display-4 text-primary mb-3"
            style={{ fontFamily: "Mariupol, sans-serif" }}
          >
            Welcome to TeleHealth
          </h1>
          <p className="lead text-muted">
            Revolutionizing healthcare by connecting patients, doctors, and
            scribe interns.
          </p>
        </div>
      </div>

      {/* Why TeleHealth Section */}
      <div className="text-center mt-5 mb-4">
        <h2
          className="text-primary"
          style={{ fontFamily: "Mariupol, sans-serif" }}
        >
          Why Choose TeleHealth?
        </h2>
        <p className="text-muted">
          Explore the benefits of TeleHealth for patients, doctors, and scribe
          interns.
        </p>
      </div>
      <Row className="g-4">
        {/* Card for Patients */}
        <Col lg={4} md={6} sm={12}>
          <Card
            className="shadow-lg border-0 h-100"
            style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <Card.Title className="text-primary">For Patients</Card.Title>
              <Card.Text>
                Access reliable healthcare from the comfort of your home:
                <ul>
                  <li>✔ Call to connect with a Scribe Intern</li>
                  <li>✔ Discuss your case and receive feedback</li>
                  <li>✔ Get a prescription from a Doctor</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/for-patients" className="btn btn-primary btn-sm">
                Learn More
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* Card for Doctors */}
        <Col lg={4} md={6} sm={12}>
          <Card
            className="shadow-lg border-0 h-100"
            style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
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
                Enhance your practice with TeleHealth:
                <ul>
                  <li>✔ Manage virtual appointments efficiently</li>
                  <li>✔ Expand your reach to more patients</li>
                  <li>✔ Maintain secure digital records</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/for-doctors" className="btn btn-primary btn-sm">
                Learn More
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        {/* Card for Scribe Interns */}
        <Col lg={4} md={6} sm={12}>
          <Card
            className="shadow-lg border-0 h-100"
            style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Card.Body>
              <Card.Title className="text-primary">
                For Scribe Interns
              </Card.Title>
              <Card.Text>
                Build a solid foundation in healthcare:
                <ul>
                  <li>✔ Assist doctors during consultations</li>
                  <li>✔ Gain experience in medical documentation</li>
                  <li>✔ Enhance your medical knowledge</li>
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/for-scribe-interns" className="btn btn-primary btn-sm">
                Learn More
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Key Features Section */}
      <div className="mt-5">
        <h2
          className="text-primary text-center mb-4"
          style={{ fontFamily: "Mariupol, sans-serif" }}
        >
          Key Features
        </h2>
        <Row className="g-4">
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center shadow-lg border-0">
              <Card.Body>
                <i
                  className="bi bi-lock text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
                <Card.Title className="mt-3">Secure Platform</Card.Title>
                <Card.Text className="text-muted">
                  Your data is safe with us. We prioritize your privacy and
                  security.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center shadow-lg border-0">
              <Card.Body>
                <i
                  className="bi bi-people text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
                <Card.Title className="mt-3">Seamless Collaboration</Card.Title>
                <Card.Text className="text-muted">
                  Doctors, patients, and scribe interns work together on one
                  platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="text-center shadow-lg border-0">
              <Card.Body>
                <i
                  className="bi bi-file-earmark-text text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
                <Card.Title className="mt-3">Digital Records</Card.Title>
                <Card.Text className="text-muted">
                  Access and update patient records with ease and ensure data
                  accuracy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Call to Action */}
      <div
        className="text-center mt-5 p-4 bg-light shadow-lg rounded mb-5"
        style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-8px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <h3 className="text-primary">Ready to Get Started?</h3>
        <p className="text-muted">
          Join the TeleHealth community today and transform your healthcare
          experience.
        </p>
        <Link
          to="/apply"
          className="btn btn-primary btn-lg"
          style={{
            borderRadius: "50px",
            padding: "10px 30px",
          }}
        >
          Sign Up Now
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
