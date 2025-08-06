"use client";
import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Jpgimg from "../../assets/images/Jpgimg.png";
import ContentContainer from "../ui/ContentContainer";
import { InputFieldGroup } from "../ui/InputField";
import Image from "next/image";
import Pdfimg from "../../assets/images/Pdfimg.png";
import Trash from "../../assets/images/Trash.png";
import Add from "../../assets/images/Add.png";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function KYCDetails({ onNext, onPrevious }: { onNext: () => void, onPrevious: () => void }) {

  const [formData, setFormData] = useState({
    Adcard: "",
    Pancard: "",
    LicNumber: "",

  });


  return (
    <div>
      <ContentContainer className="mt-4">
        <div className=" p-4">
          <h5 className="mb-3 profile-card-main-titile">KYC Details</h5>

          {/* Aadhar & Pan Card Inputs */}
          <Row className="mb-3">
            <Col md={6} sm={12}>
              <InputFieldGroup
                label="Aadhar Number"
                name="field"
                type="text"
                value={formData.Adcard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Adcard: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Aadhar Number"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>

            <Col md={6} sm={12}>
              <InputFieldGroup
                label="Pan Card Number"
                name="Pancard"
                type="text"
                value={formData.Pancard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Pancard: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Pan Card Number"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>
          </Row>

          {/* Aadhar & Pan Card Upload Previews */}
          <Row className="mb-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Aadhar Card Photo <span className="text-danger">*</span>
                </Form.Label>
                <div className="custom-tab  border rounded-3 d-flex align-items-center p-1 gap-2">
                  <Image
                    src={Pdfimg}
                    alt="pdf"
                    width="50"
                    className="me-3 "
                  />
                  <div className="flex-grow-1">
                    <div className="card-feild">Aadhar Card</div>
                    <div className="kyc-details">Aadhar_Card.pdf</div>
                    <div className="card-year">60 KB - 11 Feb 2025</div>
                  </div>
                </div>
              </Form.Group>
            </Col>

            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Pan Card Photo <span className="text-danger">*</span>
                </Form.Label>
                <div className="custom-tab  rounded-3 border d-flex align-items-center p-1 gap-2">
                  <Image
                    src={Jpgimg}
                    alt="pdf"
                    width="50"
                    className="me-3 "
                  />
                  <div className="flex-grow-1">
                    <div className="card-feild">Pan Card</div>
                    <div className="kyc-details">Pan_Card.jpg</div>
                    <div className="card-year">60 KB - 11 Feb 2025</div>
                  </div>
                  <button className="btn btn-sm profile-card-boeder me-2">
                    <Image src={Trash} alt="Specialization" width={17} height={18} />
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Licence Number */}
          <Row className="mb-3">
            <Col md={6} sm={12}>
              <InputFieldGroup
                label="Licence Number"
                name="LicNumber"
                type="text"
                value={formData.LicNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, LicNumber: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Licence Number"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>
          </Row>

          {/* Licence Upload Preview */}
          <Row>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Licence Photo <span className="text-danger">*</span>
                </Form.Label>
                <div className="border custom-tab  rounded-3 d-flex align-items-center p-1 gap-2">
                  <Image
                    src={Pdfimg}
                    alt="pdf"
                    width="50"
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <div className="card-feild">License</div>
                    <div className="kyc-details">License.pdf</div>
                    <div className="card-year">60 KB - 11 Feb 2025</div>
                  </div>
                  <button className="btn btn-sm profile-card-boeder me-2 ">
                    <Image src={Trash} alt="Specialization" width={17} height={18} />
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </ContentContainer>

      <ContentContainer className="mt-4">
        <div >
          <h6 className="profile-card-main-titile mb-3">Qualification Certificates</h6>
          <div>
            <div
              className="add-file-box rounded-3 border profile-card-boeder d-flex flex-column align-items-center justify-content-center text-center"
            >
              <Image
                src={Add}
                alt="pdf"
                width="40"
              />
              <span className="about-text">Add New File</span>
            </div>
          </div>
        </div>
      </ContentContainer>



  <div className="d-flex justify-content-end gap-3 mt-4">
      {/* Previous Button */}
      <button
        className="btn-border border   d-flex align-items-center gap-2 px-4 py-2 rounded-3"
       onClick={onPrevious}
      >
        <ArrowLeft size={16} />
        Previous
      </button>

      {/* Next Button */}
      <button
        className="all-btn-color text-white d-flex align-items-center gap-2 px-4 py-2 rounded-3"
        onClick={onNext}
      >
        Next
        <ArrowRight size={16} />
      </button>
    </div>


    </div>




  );

}
