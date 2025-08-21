"use client";
import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, ProgressBar, Toast } from "react-bootstrap";
import Jpgimg from "../../assets/images/Jpgimg.png";
import ContentContainer from "../ui/ContentContainer";
import { InputFieldGroup } from "../ui/InputField";
import Image from "next/image";
import Pdfimg from "../../assets/images/Pdfimg.png";
import uplodimg from "../../assets/images/Upload.png";
import EditProfile from "../../assets/images/EditProfile.png";
import GreenRight from "../../assets/images/GreenRight.png";
import Trash from "../../assets/images/Trash.png";
import Pluslight from "../../assets/images/Pluslight.png";
import Add from "../../assets/images/Add.png";
import Loading from "../../assets/images/Loading.png";
import Completed from "../../assets/images/Completed.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";


export default function KYCDetails({ onNext, onPrevious }: { onNext: () => void, onPrevious: () => void }) {


  interface FormError {
    [key: string]: string;

  }
  const initialFormError: FormError = {};
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [completedFiles, setCompletedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [aadharFile, setAadharFile] = useState<UploadedFile | null>(null);
  const [panFile, setPanFile] = useState<UploadedFile | null>(null);
  const [licenceFile, setLicenceFile] = useState<UploadedFile | null>(null);


  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const panFileRef = useRef<HTMLInputElement | null>(null)
  const aadharFileRef = useRef<HTMLInputElement>(null);
  const licenceFileRef = useRef<HTMLInputElement>(null);


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



  const formatAadhaar = (value: string) => {
    return value
      .replace(/\D/g, "") // remove non-digits
      .slice(0, 12) // max 12 digits
      .replace(/(\d{4})(?=\d)/g, "$1 "); // add space after every 4 digits
  };

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    // if (!data.Adcard.trim()) errors.Adcard = "Adcard  number is required";
    if (!data.Adcard.trim()) {
      errors.Adcard = "Aadhaar number is required";
    } else {
      const rawValue = data.Adcard.replace(/\s/g, ""); // remove spaces

      if (rawValue.length < 12) {
        errors.Adcard = "Aadhaar number must be 12 digits";
      }
    }

    if (!data.Adcard) errors.Adphoto = "Aadhar card photo is required";
    if (!data.Pancard) errors.Panphoto = "Pancard photo is required";
    // if (!data.Pancard.trim()) errors.Pancard = "Pancard is required";
    if (!data.Pancard.trim()) {
      errors.Pancard = "Pancard  number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.Pancard)) {
      errors.Pancard = "Invalid Pancard format (e.g. ABCDE1234F)";
    }

    // if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.LicNumber.trim()) errors.LicNumber = "Licence Number is required";
    if (!data.LicNumber) errors.Licphoto = "Licence photo is required";

    return errors;
  };

  const handleSaveChnage = () => {

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      console.log("✅ Form is valid, go to next step");
      router.push("/profile");  //navigate for profile screen  
      // onNext(); // navigate to next tab or page
    } else {
      console.log("❌ Form has errors:", errors);
    }
  };


  // Aadhar Card image select //
  const handleAadharFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      const fileDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",

      });
      const fileURL = URL.createObjectURL(file);

      const newFile: UploadedFile = {
        name: file.name,
        size: `${sizeInKB} KB`,
        actualSize: sizeInKB,
        date: fileDate,
        preview: fileURL,
        status: "completed",
        reportName: "Aadhar Card", // You can change if needed
      };

      setAadharFile(newFile);
      setFormError((prev) => ({ ...prev, Adphoto: "" }));
    }
  };


  //PanCard image select //
  const handlePanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      const fileDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const fileURL = URL.createObjectURL(file);

      const newFile: UploadedFile = {
        name: file.name,
        size: `${sizeInKB} KB`,
        actualSize: sizeInKB,
        date: fileDate,
        status: "completed",
        reportName: "Pan Card", // You can make this dynamic
      };

      setPanFile(newFile);
      setFormError((prev) => ({ ...prev, Panphoto: "" }));
    }
  };

  // licence image select//

  const handleLicenceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      const fileDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const newFile: UploadedFile = {
        name: file.name,
        size: `${sizeInKB} KB`,
        actualSize: sizeInKB,
        date: fileDate,
        status: "completed",
        reportName: "Licence",
      };

      setLicenceFile(newFile);
      setFormError((prev) => ({ ...prev, Licphoto: "" }));
    }
  };

  interface UploadedFile {
    name: string;
    size: string;
    progress?: number;
    status: "uploading" | "completed";
    reportName: string;


    // KYC ADHAR,PAN,LICEN CARD 
    date?: string;       // For uploaded date
    preview?: string;    // For preview URL or icon
    actualSize?: string; // For original file size
  }



  // Add Button click in modal open //
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
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

  const handleOpenModal = () => {
    setUploadedFiles([]); // reset every time modal opens
    setShowModal(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInKB = `${Math.round(file.size / 1024)} KB`;

    const fileURL = URL.createObjectURL(file);

    const newFile: UploadedFile = {
      name: file.name,
      size: sizeInKB, // ✅ use actual size for display
      progress: 0,
      status: "uploading",
      reportName: "",

    };

    // ✅ Update preview card
    setSelectedFile(newFile);

    // ✅ Keep in uploadedFiles if you still need for tracking
    setUploadedFiles((prev) => [...prev, newFile]);

    simulateUpload(file, sizeInKB);
  };


  // MODAL DATA SHOW IN PERVIOUS PAGE 
  const simulateUpload = (file: File, totalSize: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === file.name
            ? {
              ...f,
              progress: Math.min(progress, 100),
              size:
                progress < 100
                  ? `${Math.floor((progress / 100) * parseInt(totalSize))} KB of ${totalSize}`
                  : `${totalSize}`,
              status: progress >= 100 ? "completed" : "uploading",
            }
            : f
        )
      );

      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleSave = () => {
    const completed = uploadedFiles.filter((f) => f.status === "completed");
    setCompletedFiles((prev) => [...prev, ...completed]);
    setUploadedFiles([]);
    setShowModal(false); // closes the modal
  };

  const handleClose = () => {
    setShowModal(false);
  };


  return (
    <div>
      <ContentContainer className="mt-4">
        <div className=" p-4">
          <h5 className="mb-3 profile-card-main-titile">KYC Details</h5>

          {/* Aadhar & Pan Card Inputs */}
          <Row >
            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Aadhar Number"
                name="field"
                type="text"
                value={formatAadhaar(formData.Adcard)} // 👈 format while typing  
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Adcard: e.target.value });
                  if (formError.Adcard) {  // msg type validtation msg hide 
                    setFormError({ ...formError, Adcard: "" });
                  }
                }}

                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {

                }}
                placeholder="Aadhar Number"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Adcard}
                className="position-relative"
              >

              </InputFieldGroup>
            </Col>

            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Pan Card Number"
                name="Pancard"
                type="text"
                value={formData.Pancard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Pancard: e.target.value });
                  if (formError.Pancard) {  // msg type validtation msg hide 
                    setFormError({ ...formError, Pancard: "" });
                  }
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
          <Row >
            <Col md={6} sm={12}className="mt-3" >
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Aadhar Card Photo <span className="text-danger">*</span>
                </Form.Label>

                <div
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (!aadharFile) {
                      aadharFileRef.current?.click(); // only open file manager if no file selected
                    }
                  }}
                >
                  {aadharFile ? (
                    <>
                      <Image
                        src={Pdfimg} // or Jpgimg depending on type
                        alt="jpg"
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild">Aadhar Card</div>
                        <div className="kyc-details">{aadharFile.name}</div>
                        <div className="card-year">
                          {aadharFile.size} - {aadharFile.date}


                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn btn-sm profile-card-boeder me-2"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent file manager opening
                          setAadharFile(null); // clear file
                        }}
                      >
                        <Image src={Trash} alt="delete" width={17} height={18} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Image src={Add} alt="add" width={40} className="p-1" />
                      <span className="about-text">Add Aadhar Card Photo</span>
                    </div>
                  )}

                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={aadharFileRef}
                  style={{ display: "none" }}
                  onChange={handleAadharFileChange}
                />
              </Form.Group>
              {formError?.Adphoto && (
                <div className="text-danger small mt-1">{formError.Adphoto}</div>
              )}
            </Col>

            <Col md={6} sm={12} className="mt-3">
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Pan Card Photo <span className="text-danger">*</span>
                </Form.Label>


                <div
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (!panFile) {
                      panFileRef.current?.click(); // only open file manager if no file selected
                    }
                  }}
                >
                  {panFile ? (
                    <>
                      <Image
                        src={Jpgimg}
                        alt="jpg"
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild">Pan Card</div>
                        <div className="kyc-details">{panFile.name}</div>
                        <div className="card-year">
                          {panFile.size} - {panFile.date}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn btn-sm profile-card-boeder me-2"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent file manager opening
                          setPanFile(null); // clear file
                        }}
                      >
                        <Image src={Trash} alt="delete" width={17} height={18} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Image src={Add} alt="add" width={40} className="p-1" />
                      <span className="about-text">Add Pan Card Photo</span>
                    </div>
                  )}

                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={panFileRef}
                  style={{ display: "none" }}
                  onChange={handlePanFileChange}
                />
              </Form.Group>
              {formError?.Panphoto && (
                <div className="text-danger small mt-1">{formError.Panphoto}</div>
              )}

            </Col>

          </Row>


          {/* Licence Number */}
          <Row >
            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Licence Number"
                name="LicNumber"
                type="text"
                value={formData.LicNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, LicNumber: e.target.value });
                  if (formError.LicNumber) {  // msg type validtation msg hide 
                    setFormError({ ...formError, LicNumber: "" });
                  }
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
            <Col md={6} sm={12} className="mt-3">
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Licence Photo <span className="text-danger">*</span>
                </Form.Label>

                <div
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (!licenceFile) {
                      licenceFileRef.current?.click(); // only open if no file selected
                    }
                  }}
                >
                  {licenceFile ? (
                    <>
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild">License</div>
                        <div className="kyc-details">{licenceFile.name}</div>
                        <div className="card-year">
                          {licenceFile.size} - {licenceFile.date}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn btn-sm profile-card-boeder me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLicenceFile(null);
                        }}
                      >
                        <Image src={Trash} alt="delete" width={17} height={18} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Image src={Add} alt="add" width={40} className="p-1 " />
                      <span className="about-text">Add Licence Photo</span>
                    </div>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".pdf,image/*"
                  ref={licenceFileRef}
                  style={{ display: "none" }}
                  onChange={handleLicenceFileChange}
                />
              </Form.Group>
              {formError?.Licphoto && (
                <div className="text-danger small mt-1">{formError.Licphoto}</div>
              )}

            </Col>

          </Row>
        </div>
      </ContentContainer>











      <ContentContainer className="mt-4">
        <h6 className="profile-card-main-titile mb-3">Qualification Certificates</h6>
        <div>
          {/* Add New File */}

          {/* modal save button click in add data  */}
          <div className="d-flex gap-3 flex-wrap">

            {completedFiles.map((file, idx) => (
              <div
                key={idx}
                className="border rounded-3 p-3 text-center position-relative bg-white"
                style={{ width: "130px", height: "130px" }} // fixed size same as Add button
              >
                {/* Delete Icon */}
                <button
                  className="btn p-0 position-absolute top-0 end-0 m-2"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setCompletedFiles((prev) => prev.filter((_, i) => i !== idx))
                  }
                >
                  <Image src={Trash} alt="delete" width={18} height={18} />
                </button>

                {/* PDF Icon */}
                <Image src={Pdfimg} alt="pdf" width={40} height={40} />

                {/* File Title */}
                <div
                  className="fw-semibold mt-2 text-truncate"
                  style={{ maxWidth: "100%" }}
                  title={file.reportName || file.name}
                >
                  {file.reportName || file.name}
                </div>

                {/* File Name */}
                <div
                  className="text-muted small text-truncate"
                  style={{ maxWidth: "100%" }}
                >
                  {file.name}
                </div>
              </div>
            ))}

            {/* Add New File Button */}
            <div
              className="add-file-box rounded-3 border  d-flex flex-column align-items-center justify-content-center text-center bg-white"
              style={{ width: "130px", height: "130px", cursor: "pointer" }} // same size as uploaded files
              onClick={handleOpenModal}
            >
              <Image src={Pluslight} alt="add" width={65} className="my-custom-icon" />
              <span className="about-text">Add New File</span>
            </div>
          </div>


          <Modal
            show={showModal}
            onHide={handleClose}
            header="Upload Report"
            closeButton
            dialogClassName="custom-modal-width"
          >
            {/* Always show Browse UI */}
            <div className="border rounded-3 p-4 text-center mb-4">
              <div className="mb-2">
                <Image src={uplodimg} alt="upload" width={30} height={30} className="modal-bg p-1 rounded-2" />
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
                <Button variant="btn-border border" onClick={handleButtonClick}>
                  Browse File
                </Button>
              </div>
            </div>

            {/* Uploaded files list (below browse) */}
            {uploadedFiles.map((file, index) => (
              <div key={index} className="p-3 mb-4 bg-white rounded-3 border">
                <div className="modal-bg p-3 rounded-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={Pdfimg} alt="pdf" width={45} height={50} />
                      <div>
                        <div className="fw-semibold">{file.name}</div>
                        <div className="text-muted">
                          {file.size} •{" "}
                          {file.status === "uploading" ? (
                            <>
                              <Image src={Loading} alt="loading" width={20} height={20} /> Uploading...
                            </>
                          ) : (
                            <>
                              <Image src={Completed} alt="completed" width={20} height={20} /> Completed
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {file.status === "uploading" && (
                    <div className="mt-3">
                      <div className="progress rounded-pill" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-dark rounded-pill"
                          role="progressbar"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">

                  <label className="form-label fw-semibold">
                    Report Name <span className="text-center">*</span>
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
              <Button className=" maiacare-button" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Modal>

        </div>
      </ContentContainer>




      <div className="d-flex justify-content-end gap-3 mt-4">
        {/* Previous Button */}
        <button
          className="btn-border border d-flex align-items-center gap-2 px-4 py-2 rounded-3"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        {/* Next Button */}
        {/* 
        <button
          className="all-btn-color text-white d-flex align-items-center gap-2 px-4 py-2 rounded-3"
          onClick={handleSaveChnage}
        >
          Save Changes
        </button> */}


        <Button variant="default" disabled={false} type="submit" className=" maiacare-button" onClick={handleSaveChnage}>
          Save Changes
        </Button>

      </div>


    </div>




  );

}
