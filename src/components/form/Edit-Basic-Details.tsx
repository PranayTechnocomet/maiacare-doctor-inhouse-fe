"use client";
// import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import Textarea from "../ui/Textarea";
import ContentContainer from "../ui/ContentContainer";
import { ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
// import Profiledoctor from "../../assets/images/Profile-doctor.png";
import LightTrush from "../../assets/images/LightTrush.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import EditProfile from "../../assets/images/Edit-Profile.png";
import Camera from "../../assets/images/Camera.png";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { useSearchParams } from "next/navigation";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import Button from "../ui/Button";


export default function PersonalDetails({ onNext }: { onNext: () => void }) {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [qualifications, setQualifications] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" }
  ]);

  const [formErrors, setFormErrors] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" },
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


  type Qualification = {
    degree: string;
    field: string;
    university: string;
    startYear: string;
    endYear: string;
  };


  const [formData, setFormData] = useState<FormData>(initialFormData);


  // All Validatation  

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Name.trim()) errors.Name = "Name is required";
    if (!data.Speciality.trim()) errors.Speciality = "Speciality is required";
    if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.date.trim()) errors.date = "DOB is required";
    if (!data.gender.trim()) errors.gender = "Gender is required";


    const contactRegex = /^[0-9]{10}$/;
    if (!data.Contact.trim()) {
      errors.Contact = "Contact number is required";
    } else if (!contactRegex.test(data.Contact)) {
      errors.Contact = "Please enter a valid 10-digit number";
    }



    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!data.Email.trim()) {
    //   errors.Email = "Email is required";
    // } else if (!emailRegex.test(data.Email)) {
    //   errors.Email = "Enter a valid email address";
    // }


    if (!data.About.trim()) errors.About = "About is required";


    // if (!data.degree.trim()) errors.degree = "Degree is required";
    // if (!data.field.trim()) errors.field = "Field is required";
    // if (!data.university.trim()) errors.university = "University is required";
    // if (!data.startYear.trim()) errors.startYear = "Start year is required";
    // if (!data.endYear.trim()) errors.endYear = "End year is required";


    // if (!data.MF.trim()) errors.MF = "Start time is required";
    // if (!data.SS.trim()) errors.SS = "Start time required";
    // if (!data.Time.trim()) errors.Time = "End Time is required";
    // if (!data.Timer.trim()) errors.Timer = "End Time is required";

    return errors;
  };


  // Add Qualifications validtation  
  const validateForm1 = (quals: typeof qualifications) => {
    const errors = quals.map((q) => ({
      degree: !q.degree ? "Degree is required" : "",
      field: !q.field ? "Field is required" : "",
      university: !q.university ? "University is required" : "",
      startYear: !q.startYear ? "Start Year is required" : "",
      endYear: !q.endYear ? "End Year is required " : "",
    }));
    return errors;
  };




  // const handleNextClick = () => {
  //   const errors = validateForm(formData);
  //   setFormError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     onNext();
  //   } else {
  //     console.log("Form has errors:", errors);
  //   }
  // };


  const handleNextClick = () => {
    const errors = validateForm(formData);    // single form errors All 
    const qualErrors = validateForm1(qualifications); // qualifications errors

    setFormError(errors);
    setFormErrors(qualErrors); // 👈 new state for qualifications

    const hasQualError = qualErrors.some((err) =>
      Object.values(err).some((msg) => msg !== "")
    );

    if (Object.keys(errors).length === 0 && !hasQualError) {
      onNext();
    } else {
      console.log("Form has errors:", { errors, qualErrors });
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
    setFormErrors([
      ...formErrors,
      { degree: "", field: "", university: "", startYear: "", endYear: "" },
    ]);
  };



  const yearOptions = Array.from({ length: 51 }, (_, i) => {
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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0]; //previewImage chnages
  //   if (selectedFile) {
  //     const imageURL = URL.createObjectURL(selectedFile);
  //     setPreviewImage(imageURL);
  //   }
  // };


  //  modal open and seletc image jpg/png image allow 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // ✅ 1. Only allow JPG and PNG
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Only JPG and PNG images are allowed.");
      event.target.value = ""; // reset input
      return;
    }

    // ✅ 2. Max size 5MB check
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrorMessage("File size must be less than 5MB.");
      event.target.value = ""; // reset input
      return;
    }

    // ✅ 3. If valid → set preview & clear error
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewImage(imageURL);
    setErrorMessage(""); // clear previous error
  };


  // camera image select 
  const handleFileCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Allowed image types
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only JPG and PNG images are allowed.");
        setPreviewImage(null);
        event.target.value = ""; // Reset input
        return;
      }

      setErrorMessage(""); // clear error if valid
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL); // show preview
    }
  };



  const handleSave = () => {
    setSelectedImage(previewImage); // save modal preview to actual profile
    setShowModal(false);

  };



  const handleDelete = () => {
    setPreviewImage(null); // delete only in modal
  };
  //modal  image delete click in save btn click image set.
  useEffect(() => {
    if (showModal) {
      setPreviewImage(selectedImage);
    }
  }, [showModal]);


  //profile qualification Edit button click in scroll to qualification-section
  // const searchParams = useSearchParams();
  // const scrollTo = searchParams.get("scrollTo");

  // useEffect(() => {
  //   if (scrollTo === "qualification") {
  //     // Check if this scroll was triggered by button click
  //     const shouldScroll = sessionStorage.getItem("triggerQualificationScroll");

  //     if (shouldScroll === "true") {
  //       setTimeout(() => {
  //         const section = document.getElementById("qualification-section");
  //         if (section) {
  //           section.scrollIntoView({
  //             behavior: "smooth",
  //             block: "start",
  //           });
  //         }
  //       }, 200);

  //       // reset flag after scroll so refresh won’t scroll again
  //       sessionStorage.removeItem("triggerQualificationScroll");
  //     }
  //   }
  // }, [scrollTo]);


  return (
    <div>
      <ContentContainer className="mt-3">
        <Row>
          <Col>
            <h5 className="profile-card-main-titile">Personal Details</h5>
            <div className="d-flex align-items-center gap-4 mt-3 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
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
                onHide={() => {
                  setShowModal(false);
                  setErrorMessage(""); //🔹Reset error msg on modal close
                }}
                size="md"
                header="Profile Photo"
                closeButton={true}
                className="text-pink"
                dialogClassName="custom-modal-width"
              >

                <div className="d-flex flex-column align-items-center" >
                  <div
                    className="rounded overflow-hidden mb-3 mx-auto position-relative edit-basic-details-modal">

                    {/* Defult Profile Image */}
                    <Image
                      src={previewImage ? previewImage : Simpleeditpro}
                      alt="Simpleeditpro"
                      width={160}
                      height={160}
                      className="edit-basic-details-image"
                    />
                  </div>
                  {errorMessage && (   // error msg only jpg/png image allow
                    <div className="text-danger mb-2 edit-basic-details-error-font">
                      {errorMessage}
                    </div>
                  )}

                  <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex gap-3 align-items-center flex-wrap">

                      {/* Edit button  */}

                      {/* <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                          <Image src={EditProfile} alt="Edit" width={18} height={18} />
                          <div className="kyc-details">Edit</div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </div> */}

                      <div className="text-center edit-basic-details-edit-button" onClick={handleEditClick}>
                        <Image src={ImageSquare} alt="Add Photo" width={21} height={21} />
                        <div className="small">Add Photo</div>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="edit-basic-details-edit-input"
                        />
                      </div>

                      <div className="text-center edit-basic-camera-icon" >
                        {/* Camera button */}
                        <Image src={Camera} alt="Take Photo" width={21} height={21} onClick={openCamera} />
                        <div className="small">Take Photo</div>

                        {/* Hidden input for camera */}
                        <input
                          type="file"
                          accept="image/*"
                          capture="user" // front camera
                          ref={cameraInputRef}
                          className="edit-basic-details-edit-input"
                          onChange={handleFileCamera}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-3 mt-md-0 align-items-center">
                      <button className="btn p-0" onClick={handleDelete}>
                        <Image src={LightTrush} alt="Trash" width={21} height={21} />
                        <div className="maiacare-input-field-helper-text">Delete</div>
                      </button>

                      <Button variant="default" className="btn px-4 py-2" onClick={handleSave}>
                        Save
                      </Button>
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
          <Row className="g-3">
            <Col className="" md={12}>
              <InputFieldGroup
                label="Name"
                name="Name"
                type="text"
                value={formData.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Name: e.target.value });
                  if (formError.Name) {   // typing in hide error 
                    setFormError({ ...formError, Name: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Name}
                className="position-relative ">
              </InputFieldGroup>
            </Col>



            <Col md={6} className="">
              {/* <InputFieldGroup
                label="Speciality"
                name="Speciality"
                type="text"
                value={formData.Speciality}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Speciality: e.target.value });
                  if (formError.Speciality) {   // typing in hide error 
                    setFormError({ ...formError, Speciality: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                placeholder="Speciality"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Speciality}
                className="position-relative">
              </InputFieldGroup> */}

              <InputSelect
                label="Speciality"
                name="Speciality"
                value={formData.Speciality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                required={true}
                disabled={false}
                error={formError.Speciality}

                options={[
                  { id: "1", value: "1", label: "Speciality 1" },
                  { id: "2", value: "2", label: "Speciality 2" },
                  { id: "3", value: "3", label: "Speciality 3" },
                ]}
              />
            </Col>


            <Col md={6} className="">
              <InputFieldGroup
                label="Year Of Experience"
                name="Experience"
                type="text"
                value={formData.Experience}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Experience: e.target.value });
                  if (formError.Experience) {   // typing in hide error 
                    setFormError({ ...formError, Experience: "" });
                  }
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

            <Col md={6} className="">
              <DatePickerFieldGroup
                label="DOB"
                name="date"
                placeholder="Select DOB"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (formError.date) {   // typing in hide error 
                    setFormError({ ...formError, date: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                required={true}
                disabled={false}
                error={formError.date}
              />

            </Col>
            <Col md={6} className="mt-4  ">
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formData.gender}
                // defaultValue="female"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e)
                  if (formError.gender) {   // typing in hide error 
                    setFormError({ ...formError, gender: "" });
                  }
                }}
                error={formError.gender}
                required
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </Col>



            <Col md={6} className="">
              <PhoneNumberInput
                label="Contact Number"
                value={formData.Contact}
                inputMode="numeric"
                onChange={(phone: string) => {
                  // ✅ Remove any non-digit character
                  let value = phone.replace(/\D/g, "");

                  // ✅ Allow only max 10 digits
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  // ✅ Update formData
                  setFormData({ ...formData, Contact: value });

                  // ✅ Hide error while typing
                  if (formError.Contact) {
                    setFormError({ ...formError, Contact: "" });
                  }
                }}

                required
                error={formError.Contact}

              />
            </Col>

            <Col md={6} className="">
              <InputFieldGroup
                label="Email ID"
                name="Email"
                type="text"
                value={formData.Email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Email: e.target.value });
                  if (formError.Email) {   // typing in hide error 
                    setFormError({ ...formError, Email: "" });
                  }
                }} z
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

            <Col className="">
              <Textarea
                label="About"
                name="About"
                value={formData.About}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                  if (formError.About) {   // typing in hide error 
                    setFormError({ ...formError, About: "" });
                  }
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

        <Row className="mb-3  ">
          <Col md={6} className="edit-basic-detail-timepicker">
            <TimePickerFieldGroup
              label="Monday-Friday"
              name="MF"
              placeholder="Select Time"
              value={formData.MF}
              onChange={(e) => {
                setFormData({ ...formData, MF: e.target.value });
              }}
            />
          </Col>

          <Col md={6} className="mt-2 edit-basic-detail-timepicker">
            <TimePickerFieldGroup
              name="Time"
              placeholder="Select Time"
              value={formData.Time}
              onChange={(e) => {
                setFormData({ ...formData, Time: e.target.value });
              }}
            />
          </Col>
        </Row>

        <Row className="mb-3 edit-basic-detail-timepicker">
          <Col md={6} className="edit-basic-detailsat-sun">
            <TimePickerFieldGroup
              label="Saturday-Sunday"
              name="SS"
              placeholder="Select Time"
              value={formData.SS}
              onChange={(e) => {
                setFormData({ ...formData, SS: e.target.value });
              }}
            />
          </Col>

          <Col md={6} className="mt-2 edit-basic-detail-timepicker">
            <TimePickerFieldGroup
              name="Timer"
              placeholder="Select Time"
              value={formData.Timer}
              onChange={(e) => {
                setFormData({ ...formData, Timer: e.target.value });
              }}
            />
          </Col>
        </Row>
      </ContentContainer>







      {/* <div id="qualification-section"> */}
      <ContentContainer className="mt-3" >
        <h5 className="profile-card-main-titile mb-4">Qualification Details</h5>

        {qualifications.map((q, index) => (
          <div key={index} className="position-relative mb-4">
            {/* Remove Button */}
            {index > 0 && (
              <div className="d-flex justify-content-end mb-1">
                <Button
                  variant="danger"
                  size="sm"
                  className="d-flex align-items-center justify-content-center edit-basic-qualification-button"

                  onClick={() => {
                    const updatedQuals = qualifications.filter((_, i) => i !== index);
                    const updatedErrors = formErrors.filter((_, i) => i !== index); // keep errors in sync
                    setQualifications(updatedQuals);
                    setFormErrors(updatedErrors);
                  }}
                >
                  -
                </Button>
              </div>
            )}

            {/* Qualification Box */}
            <div className=" p-3">
              <Row className="g-3">
                <Col md={6} className="">
                  <InputFieldGroup
                    label="Degree"
                    name="degree"
                    type="text"
                    value={q.degree}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].degree = e.target.value;
                      setQualifications(updatedQuals);

                      // clear error only for this field/index
                      const updatedErrors = [...formErrors];
                      updatedErrors[index].degree = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="Degree"
                    required
                    error={formErrors[index]?.degree}
                  />
                </Col>

                <Col md={6} className="">
                  <InputFieldGroup
                    label="Field of study"
                    name="field"
                    type="text"
                    value={q.field}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].field = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].field = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="Field"
                    required
                    error={formErrors[index]?.field}
                  />
                </Col>

                <Col className="" md={12}>
                  <InputFieldGroup
                    label="University"
                    name="university"
                    type="text"
                    value={q.university}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].university = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].university = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="University"
                    required
                    error={formErrors[index]?.university}
                  />
                </Col>

                <Col md={6} className="">
                  <InputSelect
                    label="Start Year"
                    name="startYear"
                    value={q.startYear}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].startYear = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].startYear = "";
                      setFormErrors(updatedErrors);
                    }}
                    options={yearOptions}
                    error={formErrors[index]?.startYear}
                    required
                  />
                </Col>

                <Col md={6} className="">
                  <InputSelect
                    label="End Year"
                    name="endYear"
                    value={q.endYear}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].endYear = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].endYear = "";
                      setFormErrors(updatedErrors);
                    }}
                    options={yearOptions.filter((year) => {
                      if (!q.startYear) return true;
                      return Number(year.value) >= Number(q.startYear) + 1;
                    })}
                    error={formErrors[index]?.endYear}
                    required
                  />

                </Col>
              </Row>


            </div>
          </div>
        ))}


        <Button
          variant="default"
          className="maiacare-button"
          onClick={handleAddQualification}
        >
          + Add Qualification
        </Button>
      </ContentContainer>

      {/* </div> */}


      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="default"
          className="maiacare-button"
          onClick={handleNextClick} // navigate 
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
