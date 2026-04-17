import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container className="vh-60 d-flex align-items-center mb-5">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto text-center">
          <div className="mb-4">
            <span className="display-1">🔒</span>
          </div>

          <h1 className="display-1 fw-bold text-danger">403</h1>
          <h2 className="mb-4">Access Denied</h2>

          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Unauthorized!</Alert.Heading>
            <p>
              You don't have permission to access this page. Please contact your
              administrator.
            </p>
          </Alert>

          <div className="d-flex gap-3 justify-content-center">
            <Button variant="primary" onClick={() => navigate(-1)}>
              ← Go Back
            </Button>
            <Button variant="link" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
