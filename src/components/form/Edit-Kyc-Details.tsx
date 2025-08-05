"use client";
import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaFilePdf, FaFileImage, FaTrash } from "react-icons/fa";
import { BsFiletypeJpg } from "react-icons/bs";
import ContentContainer from "../ui/ContentContainer";

export default function KYCDetails() {
  return (

 <ContentContainer className="mt-4">
    <div className=" p-4">
      <h5 className="mb-3 fw-bold">KYC Details</h5>

      {/* Aadhar & Pan Card Inputs */}
      <Row className="mb-3">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Aadhar Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="1234 5678 9012" />
          </Form.Group>
        </Col>

        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Pan Card Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="ABCDE1234F" />
          </Form.Group>
        </Col>
      </Row>

      {/* Aadhar & Pan Card Upload Previews */}
      <Row className="mb-3">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Aadhar Card Photo <span className="text-danger">*</span>
            </Form.Label>
            <div className="border rounded d-flex align-items-center p-2 gap-3">
              <FaFilePdf size={36} color="red" />
              <div className="flex-grow-1">
                <div className="fw-semibold">Aadhar Card</div>
                <div className="text-muted small">Aadhar_Card.pdf</div>
                <div className="text-muted small">60 KB - 11 Feb 2025</div>
              </div>
            </div>
          </Form.Group>
        </Col>

        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Pan Card Photo <span className="text-danger">*</span>
            </Form.Label>
            <div className="border rounded d-flex    p-2 gap-3">
              <BsFiletypeJpg size={36} color="#0d6efd" />
              <div className="flex-grow-1">
                <div className="fw-semibold">Pan Card</div>
                <div className="text-muted small">Pan_Card.jpg</div>
                <div className="text-muted small">60 KB - 11 Feb 2025</div>
              </div>
              <FaTrash role="button" className="text-muted" />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Licence Number */}
      <Row className="mb-3">
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Licence Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="D123456789" />
          </Form.Group>
        </Col>
      </Row>

      {/* Licence Upload Preview */}
      <Row>
        <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>
              Licence Photo <span className="text-danger">*</span>
            </Form.Label>
            <div className="border rounded d-flex align-items-center p-2 gap-3">
              <FaFilePdf size={36} color="red" />
              <div className="flex-grow-1">
                <div className="fw-semibold">License</div>
                <div className="text-muted small">License.pdf</div>
                <div className="text-muted small">60 KB - 11 Feb 2025</div>
              </div>
              <FaTrash role="button" className="text-muted" />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>

 </ContentContainer>
  );
}
