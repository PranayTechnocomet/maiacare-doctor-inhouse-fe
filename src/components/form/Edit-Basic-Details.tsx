"use client";
// import { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useRef, useState } from "react";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import Textarea from "../ui/Textarea";
import ContentContainer from "../ui/ContentContainer";
import { ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import Profiledoctor from "../../assets/images/Profile-doctor.png";
import Trash from "../../assets/images/Trash.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Camera from "../../assets/images/Camera.png";

export default function PersonalDetails() {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const [formData, setFormData] = useState({
    Name: "",
    Speciality: "",
    Experience: "",
    date: "",
    gender: "female", // default value
    Contact: "",
    Email: "",
    About: "",

    degree: "",
    field: "",
    university: "",
    startYear: "",
    endYear: "",

    MF: "",
    SS: "",
    Time: "",
    Timer: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));

  };

  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = 2000 + i;
    return { id: year.toString(), value: year.toString(), label: year.toString() };
  });


  //********* EDIT PROFILE MODAL *********//
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setPreviewImage(imageURL);
    }
  };

  const handleSave = () => {
    if (previewImage) {
      setSelectedImage(previewImage); // ✅ set image in parent
    }
    setShowModal(false); // Close modal
  };

  return (
    <div>
      <ContentContainer className="mt-4">
        <Row className="mt-1">
          <Col>
            <h5 className="fw-bold">Personal Details</h5>
            <div className="d-flex align-items-center gap-4 mt-4 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
              <div className="profile-wrapper">
                {/* Profile image */}
                <Image
                  src={selectedImage ? selectedImage : Simpleeditpro}
                  alt="Profile"
                  className="profile-image"
                  width={160}
                  height={160}
                />

                {/* Camera Icon */}
                <div
                  className="camera-icon"
                  onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}
                >
                  <Image
                    src={cameraicon}
                    alt="Upload"
                    width={40}
                    height={40}
                  />
                </div>
              </div>


              {/* Edit Profile click in Modal  */}

              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                header="Profile Photo"
                closeButton={true}
                className="text-pink"
                dialogClassName="custom-modal-width"
              >
                <div className="d-flex flex-column align-items-center p-4">
                  <div
                    className="rounded overflow-hidden mb-2 mx-auto position-relative"
                    style={{ width: 160, height: 160, borderRadius: "16px" }}
                  >
                    <Image
                      src={previewImage ? previewImage : Profiledoctor}
                      alt="Profile"
                      width={160}
                      height={160}
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex gap-4 align-items-center flex-wrap">
                      <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                        <Image src={LightEditimg} alt="Edit" width={18} height={18} />
                        <div className="small">Edit</div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </div>

                      <div className="text-center">
                        <Image src={ImageSquare} alt="Add Photo" width={18} height={18} />
                        <div className="small">Add Photo</div>
                      </div>
                      <div className="text-center">
                        <Image src={Camera} alt="Take Photo" width={18} height={18} />
                        <div className="small">Take Photo</div>
                      </div>
                    </div>

                    <div className="d-flex gap-3 mt-3 mt-md-0 align-items-center">
                      <button className="btn p-0">
                        <Image src={Trash} alt="Trash" width={22} height={22} />
                      </button>
                      <button className="btn px-4 py-2 all-btn-color" onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <div>
                <div className="fw-semibold">Add Profile Picture</div>
                <div className="text-muted small">
                  Allowed Jpg, png of max size 5MB
                </div>
              </div>
            </div>

          </Col>
        </Row>

        <div>
          <Row className="mb-3">
            <Col>
              <InputFieldGroup
                label="Name"
                name="Time"
                type="text"
                value={formData.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Name: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Name"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <InputSelect
                label="Select Doctor"
                name="doctor"
                value={formData.Speciality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                required={true}
                disabled={false}
                options={[
                  { id: "1", value: "1", label: "Doctor 1" },
                  { id: "2", value: "2", label: "Doctor 2" },
                  { id: "3", value: "3", label: "Doctor 3" },
                ]}
              />
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
              <DatePickerFieldGroup
                label="Select Date"
                name="date"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                required={true}
                disabled={false}
                error={formError.date}
              />

            </Col>
            <Col md={6}>
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formData.gender}
                // defaultValue="female"
                onChange={(e) => handleChange(e)}
                required
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />

            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <InputFieldGroup
                label="Contact Name"
                name="Time"
                type="text"
                value={formData.Contact}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Contact: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder=" +91 12345 67890"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>

            <Col md={6}>
              <InputFieldGroup
                label="Email"
                name="Time"
                type="text"
                value={formData.Email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Email: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Email"
                required={true}
                disabled={false}
                readOnly={false}
                className="position-relative"
              >
              </InputFieldGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Textarea
                label="Description"
                name="About"
                value={formData.About}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => { }}
                placeholder="About"
                required={true}
                disabled={false}
                error={formError.About}
                maxLength={500}
              />

            </Col>
          </Row>
        </div>
      </ContentContainer>


      <ContentContainer className="mt-4">
        <h5 className="profile-card-main-titile mb-4">Qualification Details</h5>

        <Row className="mb-3">
          <Col md={6}>
            <InputFieldGroup
              label="degree"
              name="degree"
              type="text"
              value={formData.degree}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, degree: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="Degree"
              required={true}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
          <Col md={6}>
            <InputFieldGroup
              label="Field of study"
              name="field"
              type="text"
              value={formData.field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, field: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="field"
              required={true}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <InputFieldGroup
              label="University"
              name="University"
              type="text"
              value={formData.university}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, university: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="university"
              required={true}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <InputSelect
              label="Start Year"
              name="startYear"
              value={formData.startYear}
              onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
              options={yearOptions}
              required
              disabled={false}
            />
          </Col>

          <Col md={6}>
            <InputSelect
              label="End Year"
              name="endYear"
              value={formData.endYear}
              onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
              options={yearOptions}
              required
              disabled={false}
            />
          </Col>
        </Row>
        <Button variant="dark" className="px-4 py-2 all-btn-color">
          + Add Qualification
        </Button>
      </ContentContainer>


      <ContentContainer className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
          <h5 className="profile-card-main-titile mb-2 mb-md-0">
            Operational hours & Days
          </h5>
          <Form.Check
            type="checkbox"
            label="Select custom Hours and Days?"
            className="text-nowrap check-box input"
          />
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <InputFieldGroup
              label="Monday - Friday"
              name="MF"
              type="text"
              value={formData.MF}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, MF: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="10 AM"
              required={false}
              disabled={false}
              readOnly={false}
              className="position-relative card-university-text"
            >
            </InputFieldGroup>

          </Col>
          <Col md={6} className="mt-2 ">
            <InputFieldGroup
              name="Time"
              type="text"
              value={formData.Time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, Time: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="8 AM"
              required={false}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputFieldGroup
              label="Saturday- Sunday"
              name="SS"
              type="text"
              value={formData.SS}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, SS: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="10 AM"
              required={false}
              disabled={false}
              readOnly={false}
              className="position-relative card-university-text"
            >
            </InputFieldGroup>
          </Col>

          <Col md={6} className="mt-2">
            <InputFieldGroup
              name="name"
              type="text"
              value={formData.Timer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, Timer: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="8 AM"
              required={false}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
        </Row>
      </ContentContainer>


      <div className="d-flex justify-content-end mt-4">
        <Button variant="dark" className="d-flex align-items-center gap-2 px-4 py-2 rounded-2 all-btn-color">
          Next <ArrowRight size={16} />
        </Button>
      </div>


    </div>
  );
}
