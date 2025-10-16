"use client";
import React, { useRef, useState } from "react";
import { Row, Col, Form, ProgressBar, Toast } from "react-bootstrap";
import Jpgimg from "../../assets/images/Jpgimg.png";
import ContentContainer from "../ui/ContentContainer";
import { InputFieldGroup } from "../ui/InputField";
import Image from "next/image";
import PdfWhite from "../../assets/images/Pdf-White.png";
import PDFAddhar from "../../assets/images/PDFAddhar.png";
import pdfimg from "../../assets/images/Pdfimg.png";
import uplodimg from "../../assets/images/Upload.png";
import EditProfile from "../../assets/images/EditProfile.png";
import GreenRight from "../../assets/images/GreenRight.png";
import Trash from "../../assets/images/Trash.png";
import Cross from "../../assets/images/Cross.png";
import Delete from "../../assets/images/Delete.png";
import Pluslight from "../../assets/images/Pluslight.png";
import Add from "../../assets/images/Add.png";
import Loading from "../../assets/images/Loading.png";
import Completed from "../../assets/images/Completed.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import toast from "react-hot-toast";


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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileError, setFileError] = useState<string>("");


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

    // if (!data.Adcard.trim()) errors.Adcard = "Adcard \number is required";
    if (!data.Adcard.trim()) {
      errors.Adcard = "Aadhar  card number is required";
    } else {
      const rawValue = data.Adcard.replace(/\s/g, ""); // remove spaces

      if (rawValue.length < 12) {
        errors.Adcard = "Aadhar card number must be 12 digits";
      }
    }

    // if (!data.Adcard) errors.Adphoto = "Aadhar card photo is required";
    // Aadhaar photo
    if (!aadharFile) {
      errors.Adphoto = "Aadhaar card photo is required";
    }
    if (!panFile) {
      errors.Panphoto = "PAN card photo is required";
    }

    // if (!data.Pancard) errors.Panphoto = "Pancard photo is required";
    // if (!data.Pancard.trim()) errors.Pancard = "Pancard is required";

    if (!data.Pancard.trim()) {
      errors.Pancard = "Pancard  number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.Pancard)) {
      errors.Pancard = "Invalid Pancard format (e.g. ABCDE1234F)";
    }

    // if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.LicNumber.trim()) {
      errors.LicNumber = "Licence Number is required";
    } else if (!/^\d+$/.test(data.LicNumber)) {
      errors.LicNumber = "Licence Number must contain only digits";
    } else if (data.LicNumber.length !== 10) {
      errors.LicNumber = "Licence Number must be exactly 10 digits";
    }
    // if (!data.LicNumber) errors.Licphoto = "Licence photo is required";
    // Licence photo
    if (!licenceFile) {
      errors.Licphoto = "Licence photo is required";
    }

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
    if (!file) return;

    // Allowed file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      // Show error if file type is not allowed
      setFormError((prev) => ({ ...prev, Adphoto: "Only JPG, PNG, or PDF files are allowed." }));
      e.target.value = ""; // Reset the input
      return;
    }

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
      reportName: "Aadhar Card",
    };

    setAadharFile(newFile);
    setFormError((prev) => ({ ...prev, Adphoto: "" }));
  };

  HTMLInputElement
  //PanCard image select //
  const handlePanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      // Show error if file type is not allowed
      setFormError((prev) => ({ ...prev, Panphoto: "Only JPG, PNG, or PDF files are allowed." }));
      e.target.value = ""; // Reset the input
      return;
    }

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
      reportName: "Pan Card",
    };

    setPanFile(newFile);
    setFormError((prev) => ({ ...prev, Panphoto: "" }));
  };

  // licence image select//
  const handleLicenceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      // Show error if file type is not allowed
      setFormError((prev) => ({ ...prev, Licphoto: "Only JPG, PNG, or PDF files are allowed." }));
      e.target.value = ""; // Reset the input
      return;
    }

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
  };


  interface UploadedFile {
    name: string;
    size: string;
    progress?: number;
    status: "uploading" | "completed";
    reportName: string;
    uploadedAt?: number; // timestamp (new Date().getTime())
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


  //file size , file name / select file 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation rules
    const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      setFileError(`Only SVG, PNG, JPG Allowed.`);
      return;
    }

    if (file.size > maxSize) {
      setFileError(`Exceeds 10MB limit.`);
      return;
    }

    setFileError("");

    // Check if file already uploaded

    const exists = uploadedFiles.some((f) => f.name === file.name && f.size === `${Math.round(file.size / 1024)} KB`);
    if (exists) {
      setFileError("This file is already uploaded.");
      return;
    }

    const sizeInKB = `${Math.round(file.size / 1024)} KB`;
    const fileURL = URL.createObjectURL(file);

    const newFile: UploadedFile = {
      name: file.name,
      size: sizeInKB,
      progress: 0,
      status: "uploading",
      reportName: "",
      preview: fileURL,
      uploadedAt: Date.now(), // 👈 upload date store
    };

    setSelectedFile(newFile);
    setUploadedFiles((prev) => [...prev, newFile]);
    simulateUpload(file, sizeInKB);

    e.target.value = "";
  };


  // MODAL DATA SHOW IN PERVIOUS PAGE  Qualificataion
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
    let newErrors: { [key: number]: string } = {};

    // ✅ Validation: Required + unique report names
    const reportNames: string[] = [];
    uploadedFiles.forEach((file, index) => {
      if (!file.reportName.trim()) {
        newErrors[index] = "Report Name is required";
      } else if (reportNames.includes(file.reportName.trim())) {
        newErrors[index] = "Report Name must be unique";
      } else {
        reportNames.push(file.reportName.trim());
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // stop saving
    }
    // ✅ Move completed files
    const completed = uploadedFiles.filter((f) => f.status === "completed");
    setCompletedFiles((prev) => [...prev, ...completed]);
    setUploadedFiles([]);
    setShowModal(false);

  // ✅ Toast success message
  toast.success("Files saved successfully!", {
  position: "top-right", // ✅ Right side 
    // autoClose: 3000,
  });
  };


  const handleClose = () => {
    setShowModal(false);
    setFileError("");       // file upload error reset (jo use karto hoy to)
  };


  return (
    <div>
      <ContentContainer className="mt-4">
        <div className=" p-4">
          <h5 className="mb-4 mb-xxl-2 profile-card-main-titile">KYC Details</h5>

          {/* Aadhar & Pan Card Inputs */}
          <Row className="g-3" >
            <Col md={6} sm={12} className="">
              <InputFieldGroup
                label="Aadhar Number"
                name="Aadhar"
                type="text"
                value={formatAadhaar(formData.Adcard)} // Aadhaar formatting (xxxx xxxx xxxx)
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value;

                  // only didgit type
                  let value = rawValue.replace(/\D/g, "");

                  // only 12 digit enter 
                  if (value.length > 12) {
                    value = value.slice(0, 12);
                  }

                  setFormData({ ...formData, Adcard: value });

                  // only digit type validtation msg hide 
                  if (/^\d+$/.test(rawValue)) {
                    if (formError.Adcard) {
                      setFormError({ ...formError, Adcard: "" });
                    }
                  }
                }}
                placeholder="Aadhar Number"
                required
                error={formError.Adcard}
                className="position-relative"
              />


              {/* Aadhaar File Upload */}
              <div className="mt-3">
                <Form.Group>
                  <Form.Label className="maiacare-input-field-label">
                    Aadhar Card Photo <span className="text-danger">*</span>
                  </Form.Label>

                  <div
                    className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!aadharFile) aadharFileRef.current?.click();
                    }}
                  >
                    {aadharFile ? (
                      <>
                        <Image
                          src={aadharFile.name.endsWith(".pdf") ? PdfWhite : Jpgimg}
                          alt={aadharFile.name.endsWith(".pdf") ? "pdf" : "jpg"}
                          width={50}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <div className="card-feild">Aadhar Card</div>
                          <div className="kyc-details file-name-ellipsis" title={aadharFile.name}>
                            {aadharFile.name}
                          </div>
                          <div className="card-year">
                            {aadharFile.size} - {aadharFile.date}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn rounded-2 d-inline-flex p-2 profile-card-boeder me-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAadharFile(null);
                          }}
                        >
                          <Image src={Trash} alt="delete" width={17} height={18} />
                        </button>
                      </>
                    ) : (
                      <div className="d-flex flex-column justify-content-center align-items-center w-100">
                        <Image src={Add} alt="add" width={40} className="p-1" />
                        <span className="about-text">Add Aadhar Card Photo</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.image/*"
                    ref={aadharFileRef}
                    style={{ display: "none" }}
                    onChange={handleAadharFileChange}
                  />
                </Form.Group>
                {formError?.Adphoto && <div className="text-danger maiacare-input-field-error  mt-1">{formError.Adphoto}</div>}
                
              </div>
            </Col>

            <Col md={6} sm={12} className="">
              <InputFieldGroup
                label="Pan Card Number"
                name="Pancard"
                type="text"
                value={formData.Pancard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 10) {
                    setFormData({ ...formData, Pancard: e.target.value.toUpperCase() });
                  }
                  if (formError.Pancard) {
                    setFormError({ ...formError, Pancard: "" });
                  }
                }}
                placeholder="Pan Card Number"
                required
                error={formError.Pancard}
                className="position-relative"
                maxLength={10}
              />




            <Col md={6} sm={12} className="">
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Aadhar Card Photo <span className="text-danger">*</span>
                </Form.Label>

                <div
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2 "

                  onClick={() => {
                    if (!aadharFile) {
                      aadharFileRef.current?.click();
                    }
                  }}
                >
                  {aadharFile ? (
                    <>
                      <Image
                        src={aadharFile.name.endsWith(".pdf") ? PDFAddhar : Jpgimg}
                        alt={aadharFile.name.endsWith(".pdf") ? "pdf" : "jpg"}
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild">Aadhar Card</div>
                        <div
                          className="kyc-details file-name-ellipsis "
                          title={aadharFile.name} // show full name on hover
                        >  {aadharFile.name}
                        </div>
                        <div className="card-year">
                          {aadharFile.size} - {aadharFile.date}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn  rounded-2 d-inline-flex p-2 profile-card-boeder me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAadharFile(null);
                        }}
                      >
                        <Image src={Trash} alt="delete" width={17} height={18} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center kyc-edit-aadhar"

                    >
                      <Image src={Add} alt="add" width={36} height={36} className="p-1" />
                      <span className="about-text">Add Aadhar Card Photo</span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  ref={aadharFileRef}
                  className="kyc-edit-aadhar-photo"
                  onChange={handleAadharFileChange}
                />
              </Form.Group>
              {formError?.Adphoto && (
                <div className="text-danger small mt-1">{formError.Adphoto}</div>
              )}
            </Col>


            <Col md={6} sm={12} className="">
              <Form.Group>
                <Form.Label className="maiacare-input-field-label">
                  Pan Card Photo <span className="text-danger">*</span>
                </Form.Label>


                <div
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2"

                  onClick={() => {
                    if (!panFile) {
                      panFileRef.current?.click(); // only open file manager if no file selected
                    }
                  }}
                >
                  {panFile ? (
                    <>
                      <Image
                        src={panFile.name.endsWith(".pdf") ? PdfWhite : Jpgimg}
                        alt={panFile.name.endsWith(".pdf") ? "pdf" : "jpg"}
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild  ">Pan Card</div>
                        <div className="kyc-details file-name-ellipsis ">{panFile.name}</div>


                        <div className="card-year">
                          {panFile.size} - {panFile.date}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn  rounded-2 d-inline-flex p-2  profile-card-boeder me-2"
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
                      className="d-flex flex-column justify-content-center align-items-center kyc-edit-aadhar"

                    >
                      <Image src={Add} alt="add" width={36} height={36} className="p-1" />
                      <span className="about-text">Add Pan Card Photo</span>
                    </div>
                  )}

                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  ref={panFileRef}
                  className="kyc-edit-aadhar-photo"
                  onChange={handlePanFileChange}
                />
              </Form.Group>
              {formError?.Panphoto && (
                <div className="text-danger small mt-1">{formError.Panphoto}</div>
              )}

            </Col>

          </Row>


          {/* Licence Number */}
          <Row>
            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Licence Number"
                name="LicNumber"
                type="text"
                value={formData.LicNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                  let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");




                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  setFormData({ ...formData, LicNumber: value });


                  if (formError.LicNumber) {
                    setFormError({ ...formError, LicNumber: "" });
                  }
                }}
                placeholder="Licence Number"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.LicNumber}
                className="position-relative"
              />
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
                  className="custom-tab border rounded-3 d-flex align-items-center p-1 gap-2 licence-data"
                  onClick={() => {
                    if (!licenceFile) {
                      licenceFileRef.current?.click(); // only open if no file selected
                    }
                  }}
                >
                  {licenceFile ? (
                    <>
                      <Image
                        src={licenceFile.name.endsWith(".pdf") ? PdfWhite : Jpgimg}
                        alt={licenceFile.name.endsWith(".pdf") ? "pdf" : "jpg"}
                        width={50}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="card-feild">License</div>
                        <div className="kyc-details file-name-ellipsis  ">{licenceFile.name}</div>
                        <div className="card-year">
                          {licenceFile.size} - {licenceFile.date}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn  rounded-2 d-inline-flex p-2  profile-card-boeder me-2"
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
                      className="d-flex flex-column justify-content-center align-items-center kyc-edit-aadhar"

                    >
                      <Image src={Add} alt="add" width={36} height={36} className="p-1 " />
                      <span className="about-text">Add Licence Photo</span>
                    </div>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.image/*"
                  ref={licenceFileRef}
                  className="kyc-edit-aadhar-photo"
                  onChange={handleLicenceFileChange}
                />
              </Form.Group>
              {formError?.Licphoto && (
                <div className="text-danger maiacare-input-field-error  mt-1">{formError.Licphoto}</div>
              )}

            </Col>

          </Row>
        </div>
      </ContentContainer>






      <ContentContainer className="mt-4">
        <h6 className="profile-card-main-titile mb-3">Other Documents</h6>
        <div>
          {/* Add New File */}

          {/* modal save button click in add data  */}
          <div className="d-flex gap-3 flex-wrap">

            {completedFiles.map((file, idx) => (
              <div
                key={idx}
                className="border rounded-3 p-3 text-center position-relative bg-white qualification-certificates-data"

              >
                {/* Delete Icon */}
                <button
                  className="btn p-0 position-absolute top-0 end-0 m-2 qualification-certificates-btn"
                  onClick={() =>
                    setCompletedFiles((prev) => prev.filter((_, i) => i !== idx))
                  }
                >
                  <div className="border profile-card-boeder rounded-2 d-inline-flex p-1">
                    <Image src={Trash} alt="delete" width={18} height={18} />
                  </div>
                </button>
                {/* File Icon (PDF or Image) */}
                <Image
                  src={
                    file.name?.toLowerCase().endsWith(".pdf")
                      ? pdfimg
                      : [".jpg", ".jpeg", ".png", ".gif"].some((ext) =>
                        file.name?.toLowerCase().endsWith(ext)
                      )
                        ? Jpgimg
                        : pdfimg
                  }
                  alt={file.name}
                  width={40}
                  height={40}
                />

                {/* File Title */}
                <div
                  className="mt-2 card-feild text-truncate d-block qualification-certificates-file-title"
                  title={file.reportName || file.name}
                >
                  {file.reportName || file.name}
                </div>

                {/* File Name */}
                <div
                  className="card-year text-truncate d-block qualification-certificates-file-title"

                >
                  {file.name}
                </div>

                {/* File Size & Date */}
                <div className="card-year">
                  {file.size} •{" "}
                  {file.uploadedAt
                    ? new Date(file.uploadedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    : ""}
                </div>
              </div>
            ))}


            {/* Add New File Button */}
            <div
              className="add-file-box rounded-3 border  d-flex flex-column align-items-center justify-content-center text-center bg-white qualification-certificates-add-new-file"

              onClick={handleOpenModal}
            >
              <Image src={Pluslight} alt="add" width={65} className="my-custom-icon" />
              <span className="card-feild ">Add New File</span>
            </div>
          </div>


          <Modal
            show={showModal}
            onHide={handleClose}
            header="Upload Documents"
            closeButton
            dialogClassName="custom-modal-width"
          >
            {/* Always show Browse UI */}
            <div className=" modal-border-color rounded-4 p-4 text-center mb-4 upload-report-data">
              <div className="mb-2">
                <Image src={uplodimg} alt="upload" width={33} height={33} className="modal-bg p-1 rounded-2" />
              </div>
              <div>Click here to upload your file or drag.</div>
              <small className="kyc-modal-subheading">Supported Format: SVG, JPG, PNG (10mb each)</small>
              <div className="mt-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg,.jpeg,.png,.pdf,.image/*"
                  onChange={handleFileChange}
                  className="kyc-edit-aadhar-photo"
                />
                <Button variant="outline" onClick={handleButtonClick}>
                  Browse File
                </Button>
              </div>
              {fileError && <div className="text-danger mt-2">{fileError}</div>}

            </div>

            {/* Uploaded files list (below browse) */}
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="p-3 mb-4 bg-white modal-border-color rounded-4 border"
              >
                <div className="modal-bg p-3 rounded-3">
                  <div className="d-flex justify-content-between align-items-start">
                    {/* File Info */}
                    <div className="d-flex align-items-center gap-3">
                      {/* <Image src={Jpgimg} alt="pdf" width={45} height={50} /> */}
                      <Image
                        src={
                          file.name.toLowerCase().endsWith(".pdf")
                            ? PdfWhite
                            : [".jpg", ".jpeg", ".png", ".gif"].some((ext) =>
                              file.name.toLowerCase().endsWith(ext)
                            )
                              ? Jpgimg
                              : PdfWhite // fallback = pdf icon
                        }
                        alt={file.name}
                        width={45}
                        height={50}
                      />

                      <div>
                        <div className="fw-semibold file-name-ellipsis">
                          {file.name}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="profile-sub-title">{file.size}</span>
                          <span>•</span>
                          {file.status === "uploading" ? (
                            <span className="d-flex align-items-center gap-1 uploding-complete-text ">
                              <Image src={Loading} alt="loading" width={20} height={20} />
                              Uploading...
                            </span>
                          ) : (
                            <span className="d-flex align-items-center gap-1 uploding-complete-text">
                              <Image src={Completed} alt="completed" width={20} height={20} />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Close/Delete Icon */}
                    <button
                      className="btn border-0 bg-transparent"
                      onClick={() => {
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      {file.status === "uploading" ? (
                        <Image src={Cross} alt="edit" width={20} height={20} />
                      ) : (
                        <Image src={Delete} alt="edit" width={20} height={20} />
                      )}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {file.status === "uploading" && (
                    <div className="mt-3">
                      <div className="progress rounded-pill qualification-certificates-progress-bar">
                        <div
                          className="progress-bar rounded-pill custom-progress"
                          role="progressbar"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Report Name Input */}
                <div className="mt-4 mb-3">
                  <label className="report-name">
                    Report Name <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center mt-1">
                    <input
                      type="text"
                      className="form-control px-3 py-2 me-2 maiacare-input-field"
                      placeholder="Enter Report Name"
                      value={file.reportName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUploadedFiles((prev) =>
                          prev.map((f, i) =>
                            i === index ? { ...f, reportName: value } : f
                          )
                        );
                        setErrors((prev) => {
                          const updated = { ...prev };
                          delete updated[index];
                          return updated;
                        });
                      }}
                    />
                    <div
                      className="d-flex align-items-center justify-content-center border rounded-3 p-2 bg-white qualification-certificates-edit-btn"

                    >
                      {file.status === "completed" ? (
                        // <Image src={EditProfile} alt="edit" width={20} height={20} />
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.2594 4.23184L11.768 0.741217C11.6519 0.625114 11.5141 0.533014 11.3624 0.470178C11.2107 0.407342 11.0482 0.375 10.884 0.375C10.7198 0.375 10.5572 0.407342 10.4056 0.470178C10.2539 0.533014 10.1161 0.625114 10 0.741217L0.366412 10.3748C0.249834 10.4905 0.157407 10.6281 0.0945056 10.7798C0.0316038 10.9315 -0.000518312 11.0942 6.32418e-06 11.2584V14.7498C6.32418e-06 15.0813 0.131702 15.3993 0.366123 15.6337C0.600543 15.8681 0.918486 15.9998 1.25001 15.9998H14.375C14.5408 15.9998 14.6997 15.934 14.8169 15.8168C14.9342 15.6995 15 15.5406 15 15.3748C15 15.2091 14.9342 15.0501 14.8169 14.9329C14.6997 14.8157 14.5408 14.7498 14.375 14.7498H6.50938L15.2594 5.99981C15.3755 5.88373 15.4676 5.74592 15.5304 5.59425C15.5933 5.44257 15.6256 5.28 15.6256 5.11583C15.6256 4.95165 15.5933 4.78908 15.5304 4.63741C15.4676 4.48573 15.3755 4.34792 15.2594 4.23184ZM4.74141 14.7498H1.25001V11.2584L8.12501 4.3834L11.6164 7.87481L4.74141 14.7498ZM12.5 6.99122L9.00938 3.49981L10.8844 1.62481L14.375 5.11622L12.5 6.99122Z" fill="#2B4360" />
                        </svg>

                      ) : (
                        <Image src={GreenRight} alt="editing" width={20} height={20} />
                      )}
                    </div>
                  </div>

                  {/* Error Message */}
                  {errors[index] && (
                    <div className="text-danger mt-1">{errors[index]}</div>
                  )}
                </div>
              </div>
            ))}


            {/* Action Buttons */}


            <div className="d-flex mt-3 gap-3">


              <Button variant="outline" className="w-100" onClick={handleClose}>
                Cancel
              </Button>


              <Button className="w-100" variant="default" onClick={handleSave}>
                Save
              </Button>

            </div>








          </Modal>

        </div>
      </ContentContainer >


      <div className="d-flex justify-content-end gap-3 mt-4">
        {/* Previous Button */}
        <Button
          variant="outline"

          onClick={onPrevious}
        >
          <ArrowLeft size={16} className="me-2" />
          Previous
        </Button>

        {/* Next Button */}
        {/* 
        <button
          className="all-btn-color text-white d-flex align-items-center gap-2 px-4 py-2 rounded-3"
          onClick={handleSaveChnage}
        >
          Save Changes
        </button> */}


        <Button variant="default" disabled={false} type="submit" className=" maiacare-button" onClick={handleSaveChnage}>
          Save
        </Button>

      </div>


    </div >




  );

}
