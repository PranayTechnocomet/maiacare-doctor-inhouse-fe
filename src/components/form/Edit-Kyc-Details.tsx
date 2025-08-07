"use client";
import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, ProgressBar } from "react-bootstrap";
import Jpgimg from "../../assets/images/Jpgimg.png";
import ContentContainer from "../ui/ContentContainer";
import { InputFieldGroup } from "../ui/InputField";
import Image from "next/image";
import Pdfimg from "../../assets/images/Pdfimg.png";
import uplodimg from "../../assets/images/Upload.png";
import EditProfile from "../../assets/images/EditProfile.png";
import GreenRight from "../../assets/images/GreenRight.png";
import Trash from "../../assets/images/Trash.png";
import Add from "../../assets/images/Add.png";
import Loading from "../../assets/images/Loading.png";
import Completed from "../../assets/images/Completed.png";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Modal from "../ui/Modal";



export default function KYCDetails({ onNext, onPrevious }: { onNext: () => void, onPrevious: () => void }) {


  interface FormError {
    [key: string]: string;

  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);


  type FormData = {
    Adcard: string,
    Pancard: string,
    LicNumber: string,
  };
  const initialFormData: FormData = {
    Adcard: "",
    Pancard: "",
    LicNumber: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);


  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Adcard.trim()) errors.Adcard = "Adcard is required";
    if (!data.Pancard.trim()) errors.Pancard = "Pancard is required";
    // if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.LicNumber.trim()) errors.LicNumber = "LicNumber is required";
    return errors;
  };

  const handleNextClick = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      console.log("✅ Form is valid, go to next step");
      // onNext(); // navigate to next tab or page
    } else {
      console.log("❌ Form has errors:", errors);
    }
  };



  // Add Button click in modal open //
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      name: "MD_Gynaecologist_Certificate.pdf",
      size: "60 KB of 120 KB",
      progress: 50,
      status: "uploading",
      reportName: "",
    },
    {
      name: "MBBS_Certificate.pdf",
      size: "60 KB",
      status: "completed",
      reportName: "MBBS Certificate",
    },
  ]);


  // browser select image //
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open file manager
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleClose = () => setShowModal(false);


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
                error={formError.Adcard}
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
                error={formError.Pancard}
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
                required={true} gap-2
                disabled={false}
                readOnly={false}
                error={formError.LicNumber}
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
                <div className="border custom-tab rounded-3 d-flex align-items-center p-1 ">
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
              onClick={() => setShowModal(true)}
            >
              <Image
                src={Add}
                alt="pdf"
                width="40"
              />
              <span className="about-text">Add New File</span>
            </div>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              header="Upload Report"
              closeButton={true}
              dialogClassName="custom-modal-width"
            >
              <div className="border rounded-3 p-4 text-center mb-4">
                <div className="mb-2 ">
                  <Image
                    src={uplodimg}
                    alt="pdf"
                    width="30"
                    height="30"
                    className="modal-bg p-1 rounded-2"
                  />
                </div>
                <div>Click here to upload your file or drag.</div>
                <small className="text-muted">Supported Format: SVG, JPG, PNG (10mb each)</small>
                <div className="mt-3">

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button variant="btn-border border" onClick={handleButtonClick}>Browse File</Button>
                </div>
              </div>

              {/* File Previews */}
              {uploadedFiles.map((file, index) => (
                <div key={index} className="p-3 mb-4 bg-white rounded-3 border ">

                  {/* Header Row */}

                  <div className="modal-bg p-3 rounded-3">
                    <div className="d-flex justify-content-between align-items-start ">
                      <div className="d-flex align-items-center gap-3">

                        {/* PDF Icon */}
                        <div className=" d-flex align-items-center justify-content-center">
                          <Image
                            src={Pdfimg}
                            alt="pdf"
                            width="45"
                            height="50"
                          />
                        </div>

                        {/* File Info */}

                        <div>
                          <div className="fw-semibold">{file.name}</div>
                          <div className="text-muted">{file.size} •
                            {file.status === "uploading" ? (
                              <span className="d-inline-flex align-items-center gap-1">
                                <div role="status" />
                                <Image src={Loading} alt="pdf" width="20" height="20" /> Uploading...
                              </span>
                            ) : (
                              <span className="d-inline-flex align-items-center gap-1">
                                <div role="status" />
                                <Image src={Completed} alt="pdf" width="20" height="20" /> Completed
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Cancel/Delete Button */}
                      <button className="btn btn-sm btn-outline-light text-muted border-0">✕</button>
                    </div>

                    {/* Progress Bar */}
                    {file.status === "uploading" && (
                      <div className="mt-3">
                        <div className="progress rounded-pill" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-dark rounded-pill"
                            role="progressbar"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Report Name */}
                  <div className="mt-4">
                    <label className="form-label fw-semibold">
                      Report Name <span className="text-  ">*</span>
                    </label>

                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control rounded-3 px-3 py-2 me-2"
                        placeholder="Enter Report Name"
                        value={file.reportName}
                        onChange={(e) =>
                          setUploadedFiles((prev) =>
                            prev.map((f) =>
                              f.name === file.name ? { ...f, reportName: e.target.value } : f
                            )
                          )
                        }
                      />

                      <div
                        className="d-flex align-items-center justify-content-center border rounded-3 p-2 bg-white"
                        style={{ width: '42px', height: '42px' }}
                      >
                        {file.status === 'completed' ? (
                          <Image src={EditProfile} alt="completed" width="20" height="20" />
                        ) : (
                          <Image src={GreenRight} alt="editing" width="20" height="20" />
                        )}
                      </div>
                    </div>
                  </div>






                </div>
              ))}


              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Button variant="btn-border border" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="all-btn-color">Save</Button>
              </div>
            </Modal>


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
          onClick={handleNextClick}
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>


    </div>




  );

}
