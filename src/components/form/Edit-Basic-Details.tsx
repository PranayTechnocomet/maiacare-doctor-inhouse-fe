"use client";
// import { useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";

export default function PersonalDetails() {
  return (
    <div className="personal-details-container">
      <Container className="mt-5">
        <h5 className="fw-bold">Personal Details</h5>

        <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
          <div className="position-relative profile-placeholder rounded overflow-hidden">
            <Image
              src={Simpleeditpro}
              alt="Profile"
              className=" mb-3 rounded-4"
              style={{ cursor: "pointer", width: 100, height: 100 }}
            />

            <div
              className="  rounded-3 p-2 position-absolute"
              style={{ bottom: 0, right: 0 }}
              // onClick={handleImageClick}
            >       <Image
              src={cameraicon}
              alt="Profile"
              style={{ cursor: "pointer", width: 40, height: 40}}
            />
            </div>
          </div>

          <div>
            <div className="fw-semibold">Add Profile Picture</div>
            <div className="text-muted small">Allowed jpg, png of max size 5MB</div>
          </div>
        </div>
      </Container>

      <Form className="mt-5">
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control type="text" placeholder="Riya Dharang" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Speciality *</Form.Label>
              <Form.Select>
                <option>Gynaecologist</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Years Of Experience *</Form.Label>
              <Form.Control type="number" placeholder="11" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>DOB *</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Label>Gender *</Form.Label>
            <div className="d-flex gap-3 mt-2">
              <Form.Check type="radio" label="Male" name="gender" />
              <Form.Check type="radio" label="Female" name="gender" defaultChecked />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Contact Number *</Form.Label>
              <Form.Control type="tel" placeholder="+91 12345 67890" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email ID *</Form.Label>
              <Form.Control type="email" placeholder="riyadharang@gmail.com" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>About *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="I’m Dr. Riya Dharang, a fertility specialist..."
                maxLength={500}
              />
              <div className="char-count text-end">120/500</div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
