import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/userTypes";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, updateUser, deleteUser } = useUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const userData = await getUserById(Number(id));
          setUser(userData);
        } catch {
          toast.error("Failed to fetch user details.");
        }
      }
    };

    fetchUser();
  }, [id, getUserById]);

  const handleSave = async () => {
    if (user) {
      try {
        await updateUser(user.id, user);
        setIsEditing(false);
        toast.success("User updated successfully!");
      } catch {
        toast.error("Failed to update user.");
      }
    }
  };

  const handleDelete = async () => {
    if (user) {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await deleteUser(user.id);
        toast.success("User deleted successfully!");
        navigate("/users");
      }
    }
  };

  const handleClose = () => {
    navigate("/users");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Container className="mt-3">
      <div className="card shadow-lg border-0" style={{ backgroundColor: "#E7F6FA" }}>
        <div
          className="card-header d-flex justify-content-between align-items-center text-white"
          style={{
            backgroundColor: "#74C0C3",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="m-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
            User Details
          </h3>
          <Button variant="light" className="btn-sm" onClick={handleClose}>
            ×
          </Button>
        </div>
        <div className="card-body" style={{ backgroundColor: "#F7F8FD" }}>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.username}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.fullName || ""}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={user.gender || ""}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.role?.roleName || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        role: { ...user.role!, roleName: e.target.value },
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="isApproved">
                  <Form.Label>Approved</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Is Approved"
                    checked={user.isApproved || false}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, isApproved: e.target.checked })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="verified">
                  <Form.Label>Verified</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Verified"
                    checked={user.verified || false}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, verified: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hasAcceptedAgreement">
                  <Form.Label>Accepted Agreement</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Has Accepted Agreement"
                    checked={user.hasAcceptedAgreement || false}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        hasAcceptedAgreement: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="card-footer d-flex justify-content-center gap-2" style={{ backgroundColor: "#F7F8FD" }}>
          {isEditing ? (
            <>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="warning" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default UserDetails;
