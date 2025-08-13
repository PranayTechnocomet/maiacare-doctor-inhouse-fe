"use client";
// import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
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
// import Profiledoctor from "../../assets/images/Profile-doctor.png";
import Trash from "../../assets/images/Trash.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Camera from "../../assets/images/Camera.png";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";


export default function PersonalDetails({ onNext }: { onNext: () => void }) {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const [qualifications, setQualifications] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" }
  ]);


  type FormData = {
    Name: string;
    Speciality: string;
    Experience: string;
    date: string;
    gender: string; // default will be "female"
    Contact: string;
    Email: string;
    About: string;

    degree: string;
    field: string;
    university: string;
    startYear: string;
    endYear: string;

    MF: string;
    SS: string;
    Time: string;
    Timer: string;
  };


  const initialFormData: FormData = {
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
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Name.trim()) errors.Name = "Name is required";
    if (!data.Speciality.trim()) errors.Speciality = "Speciality is required";
    if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.date.trim()) errors.date = "Date is required";
    if (!data.gender.trim()) errors.gender = "Gender is required";



    const contactRegex = /^[0-9]{10}$/;

    if (!data.Contact.trim()) {
      errors.Contact = "Contact is required";
    } else if (!contactRegex.test(data.Contact)) {
      errors.Contact = "Please enter valid number";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.Email.trim()) {
      errors.Email = "Email is required";
    } else if (!emailRegex.test(data.Email)) {
      errors.Email = "Enter a valid email address";
    }

    if (!data.About.trim()) errors.About = "About is required";
    if (!data.degree.trim()) errors.degree = "Degree is required";
    if (!data.field.trim()) errors.field = "Field is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear.trim()) errors.startYear = "Start year is required";
    if (!data.endYear.trim()) errors.endYear = "End year is required";

    if (!data.MF.trim()) errors.MF = "Start time is required";
    if (!data.SS.trim()) errors.SS = "Start time required";
    if (!data.Time.trim()) errors.Time = "End Time is required";
    if (!data.Timer.trim()) errors.Timer = "End Time is required";

    return errors;
  };

  const handleNextClick = () => {
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };


  // const handleQualificationChange = (index: number, field: string, value: string) => {
  //   const updated = [...qualifications];
  //   updated[index][field] = value;
  //   setQualifications(updated);
  // };

  // Add new qualification

  const handleAddQualification = () => {
    setQualifications([
      ...qualifications,
      { degree: "", field: "", university: "", startYear: "", endYear: "" }
    ]);
  };

  const yearOptions = Array.from({ length: 31 }, (_, i) => {
    const year = 2000 + i;
    return { id: year.toString(), value: year.toString(), label: year.toString() };
  });


  //********* EDIT PROFILE MODAL *********//
  const fileInputRef = useRef<HTMLInputElement>(null);  // file input programmatically open 
  const cameraInputRef = useRef<HTMLInputElement>(null); // camera image select 

  const [previewImage, setPreviewImage] = useState<string | null>(null);  //previewImage 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);//selectedImage 

  const handleOpenModal = () => {
    setPreviewImage(selectedImage || Simpleeditpro.src); // show image in modal
    setShowModal(true);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();   //Edit btn click in file chhose
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; //previewImage chnages
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setPreviewImage(imageURL);
    }
  };

  const handleFileCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL); // show preview
    }
  };

  const handleSave = () => {
    if (previewImage) {
      setSelectedImage(previewImage); // ✅ set image in parent
    }
    setShowModal(false); // Close modal
  };

  const handleDelete = () => {
    setSelectedImage(null); // remove selected image
    setPreviewImage(Simpleeditpro.src); // reset to default image in modal
  };

  return (
    <div>
      <ContentContainer className="mt-4">
        <Row className="mt-1">
          <Col>
            <h5 className="profile-card-main-titile">Personal Details</h5>
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
                  // onClick={() => setShowModal(true)}  onClick={handleOpenModal} style={{ cursor: "pointer" }}
                  onClick={handleOpenModal}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={cameraicon}
                    alt="Upload"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              {/* Edit Profile click in Modal */}
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
                    style={{ width: 160, height: 160, borderRadius: "16px" }}>

                    {/* Defult Profile Image */}
                    <Image
                      src={previewImage ? previewImage : Simpleeditpro}
                      alt="Simpleeditpro"
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

                      <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                        <Image src={ImageSquare} alt="Add Photo" width={18} height={18} />
                        <div className="small">Add Photo</div>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </div>

                      <div className="text-center" style={{ cursor: "pointer" }}>
                        {/* Camera button */}
                          <Image src={Camera} alt="Take Photo" width={18} height={18} onClick={openCamera}/>
                          <div className="small">Take Photo</div>
                    
                        {/* Hidden input for camera */}
                        <input
                          type="file"
                          accept="image/*"
                          capture="user" // front camera
                          ref={cameraInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileCamera}
                        />
                      </div>
                    </div>


                    <div className="d-flex gap-3 mt-3 mt-md-0 align-items-center">
                      <button className="btn p-0" onClick={handleDelete}>
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
                name="Name"
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
                error={formError.Name}
                className="position-relative">
              </InputFieldGroup>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <InputFieldGroup
                label="Speciality"
                name="Speciality"
                type="text"
                value={formData.Speciality}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Speciality: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Speciality"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Speciality}
                className="position-relative">
              </InputFieldGroup>
            </Col>


            <Col md={6}>
              <InputFieldGroup
                label="Year Of Experience"
                name="Experience"
                type="text"
                value={formData.Experience}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Experience: e.target.value });
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Year Of Experience"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Experience}
                className="position-relative">
              </InputFieldGroup>
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
                error={formError.gender}
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
                label="Contact Number"
                name="Contact"
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
                error={formError.Contact}
                className="position-relative">
              </InputFieldGroup>
            </Col>

            <Col md={6}>
              <InputFieldGroup
                label="Email"
                name="Email"
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
                error={formError.Email}
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

        {qualifications.map((q, index) => (
          <div key={index} className="position-relative mb-4">

            {/* Remove Button - Show only for added qualifications */}
            {index > 0 && (
              <div className="d-flex justify-content-end mb-1">
                <Button
                  variant="danger"
                  className="d-flex align-items-center justify-content-center custom-remove-btn"
                  size="sm"
                  onClick={() => {
                    const updated = qualifications.filter((_, i) => i !== index);
                    setQualifications(updated);
                  }}
                >
                  -
                </Button>
              </div>
            )}

            {/* Qualification Box */}
            <div className="border rounded p-3">
              <Row className="mb-3">
                <Col md={6}>
                  <InputFieldGroup
                    label="Degree"
                    name="degree"
                    type="text"
                    value={q.degree}
                    onChange={(e) => {
                         setFormData({ ...formData, degree: e.target.value });
                      const updated = [...qualifications];
                      updated[index].degree = e.target.value;
                      setQualifications(updated);
                    }}
                    placeholder="Degree"
                    required
                    error={formError.degree}
                  />
                </Col>

                <Col md={6}>
                  <InputFieldGroup
                    label="Field of study"
                    name="field"
                    type="text"
                    value={q.field}
                    onChange={(e) => {
                                setFormData({ ...formData, field: e.target.value });
                      const updated = [...qualifications];
                      updated[index].field = e.target.value;
                      setQualifications(updated);
                    }}
                    placeholder="Field"
                    required
                    error={formError.field}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <InputFieldGroup
                    label="University"
                    name="university"
                    type="text"
                    value={q.university}
                    onChange={(e) => {
                          setFormData({ ...formData, university: e.target.value });
                      const updated = [...qualifications];
                      updated[index].university = e.target.value;
                      setQualifications(updated);
                    }}
                    placeholder="University"
                    required
                    error={formError.university}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <InputSelect
                    label="Start Year"
                    name="startYear"
                    value={q.startYear}
                    onChange={(e) => {
                      setFormData({ ...formData, startYear: e.target.value });
                      const updated = [...qualifications];
                      updated[index].startYear = e.target.value;
                      setQualifications(updated);
                    }}
                    options={yearOptions}
                    error={formError.startYear}
                    required
                  />
                </Col>

                <Col md={6}>
                  <InputSelect
                    label="End Year"
                    name="endYear"
                    value={q.endYear}
                    onChange={(e) => {
                       setFormData({ ...formData, endYear: e.target.value });
                      const updated = [...qualifications];
                      updated[index].endYear = e.target.value;
                      setQualifications(updated);
                    }}
                    options={yearOptions}
                    error={formError.endYear}
                    required
                  />
                </Col>
              </Row>
            </div>
          </div>
        ))}

        <Button
          variant="dark"
          className="px-4 py-2 all-btn-color"
          onClick={handleAddQualification}
        >
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
            <TimePickerFieldGroup
              label="Monday-Friday"
              name="MF"
              value={formData.MF}
              onChange={(e) =>
                setFormData({ ...formData, MF: e.target.value })
              }
              required
              error={formError?.MF}
            />

          </Col>
          <Col md={6} className="mt-2 ">
            <TimePickerFieldGroup
              name="Time"
              value={formData.Time}
              onChange={(e) =>
                setFormData({ ...formData, Time: e.target.value })
              }
              error={formError?.Time}
            />


          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <TimePickerFieldGroup
              label="Monday-Friday"
              name="SS"
              value={formData.SS}
              onChange={(e) =>
                setFormData({ ...formData, SS: e.target.value })
              }
              required
              error={formError?.SS}
            />
          </Col>

          <Col md={6} className="mt-2">
            <TimePickerFieldGroup
              name="Timer"
              value={formData.Timer}
              onChange={(e) =>
                setFormData({ ...formData, Timer: e.target.value })
              }
              error={formError?.Timer}
            />

          </Col>
        </Row>
      </ContentContainer>


      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="dark"
          className="d-flex align-items-center gap-2 px-4 py-2 rounded-2 all-btn-color"
          onClick={handleNextClick} // 👈 aa mukvu pade
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>



    </div>
  );
}
