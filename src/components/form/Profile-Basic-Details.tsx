import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Add from "../../assets/images/Add.png";
import Delete from "../../assets/images/Delete.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Pdfimg from "../../assets/images/Pdfimg.png";
import Download from "../../assets/images/Download.png";
import Image from 'next/image';
import { useRouter } from "next/navigation";
// import Modal from "../ui/Modal";
import ContentContainer from '../ui/ContentContainer';
import { TimePickerFieldGroup } from '../ui/CustomTimePicker';
import Modal from '../ui/Modal';
import { InputFieldGroup } from '../ui/InputField';
import InputSelect from '../ui/InputSelect';


const ProfileBasicDetails = () => {
  interface FormError {
    [key: string]: string;

  }

  const router = useRouter();

  // const handleEditClick = () => {
  //   // set flag before navigation
  //   sessionStorage.setItem("triggerQualificationScroll", "true");
  //   router.push("/edit-profile?scrollTo=qualification");
  // };

  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [activeTab,] = useState('basic');
  const [startTime, setStartTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [endTime, setEndTime] = useState("");

  const [defaultQualifications, setDefaultQualifications] = useState([
    { title: 'MD Gynaecology', university: 'Medical University', years: '2015 - 2017' },
    { title: 'MBBS', university: 'Medical University', years: '2010 - 2015' },
  ]);



  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;
    qualification: string;
    degree: string;
    field: string;
    university: string;
    startYear: string;
    endYear: string;

  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",
    
    qualification: "",
    degree: "",
    field: "",
    university: "",
    startYear: "",
    endYear: ""
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormData);



  const documents = [
    { name: 'Certificate.pdf', date: 'October 20, 2024' },
    { name: 'Aadhar Card.pdf', date: 'October 20, 2024' },
    { name: 'License.pdf', date: 'October 20, 2024' },
    { name: 'Certificate.pdf', date: 'October 20, 2024' },
  ];

  const handleDelete = (index: number) => {
    const updated = defaultQualifications.filter((_, i) => i !== index);
    setDefaultQualifications(updated);
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const operationalHours = [
    { days: "Mon to Fri", time: "10 AM – 5 PM" },
    { days: "Sat & Sun", time: "10 AM – 2 PM" },
  ];


  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData(initialFormData);
    setFormError(initialFormError);
  }

  const yearOptions = Array.from({ length: 31 }, (_, i) => {
    const year = 2000 + i;
    return { id: year.toString(), value: year.toString(), label: year.toString() };
  });

// ✅ University list JSON
const universities = [
  { id: "1", value: "gujarat", label: "Gujarat University" },
  { id: "2", value: "mumbai", label: "Atmiya University" },
  { id: "3", value: "delhi", label: "saurashtra University" },
  { id: "4", value: "bangalore", label: "Darshan University" },
];





  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.qualification.trim()) errors.qualification = "Qualification is Required";
    if (!data.degree.trim()) errors.degree = "Degree is required";
    if (!data.field.trim()) errors.field = "Field is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear.trim()) errors.startYear = "Start year is required";
    if (!data.endYear.trim()) errors.endYear = "End year is required";

    return errors;
  };


  const handleSave = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    // ✅ If no errors → proceed
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted", formData);

      // 1) Close modal
      handleClose();

      // 2) Reset data & errors ONLY after success
      setFormData(initialFormData);
      setFormError(initialFormError);
    }
  };










  
  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>

        {/* =====LEFT COLUMN  PART ======== */}


        <Col lg={8}>

          {/* Operational hours & Days */}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
                <h5 className="profile-card-main-titile mb-2 mb-md-0">
                  Operational hours & Days
                </h5>
              </div>
              <div>
                {operationalHours.map((item, idx) => (
                  <p key={idx} className="mb-1 text-muted">
                    <span className=" maiacare-radio-label">{item.days}:</span>{" "}
                    {item.time}
                  </p>
                ))}
              </div>
            </ContentContainer>
          </div>


          {/* Qualification */}
          <div>
            <ContentContainer className='mt-4' >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Qualification</h5>
                <Button onClick={handleOpen} className="profile-card-boeder profile-card-button bg-transparent" >
                  <Image src={Add} alt="Add" />
                </Button>


                <Modal
                  show={showModal}
                  onHide={handleClose}
                  dialogClassName="custom-modal-width"
                  header="Qualification Details"
                  centered
                >
                  <div>
                    <div>
                      <InputSelect
                        label="Qualification Select"
                        name="qualification"
                        onChange={(e) => {
                            setFormData({ ...formData, qualification: e.target.value });

                            // ✅ Error hide when user types
                            if (formError.qualification) {
                              setFormError({ ...formError, qualification: "" });
                            }
                          }}
                        onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                        required={true}
                        disabled={false}
                        error={formError.qualification}
                          options={universities}   // ✅ JSON array used here
                      />
                    </div>

                    {/* Fields */}
                    <Row>
                      <Col md={6} className="mt-3">
                        <InputFieldGroup
                          label="Degree"
                          name="degree"
                          type="text"
                          value={formData.degree}
                          onChange={(e) => {
                            setFormData({ ...formData, degree: e.target.value });

                            // ✅ Error hide when user types
                            if (formError.degree) {
                              setFormError({ ...formError, degree: "" });
                            }
                          }}
                          placeholder="Enter Degree"
                          required={true}
                          error={formError.degree}
                        />
                      </Col>

                      <Col md={6} className="mt-3">
                        <InputFieldGroup
                          label="Field of study"
                          name="field"
                          type="text"
                          value={formData.field}
                          onChange={(e) => {
                            setFormData({ ...formData, field: e.target.value });
                            if (formError.field) {
                              setFormError({ ...formError, field: "" });
                            }
                          }}
                          placeholder="Select Field"
                          required={true}
                          error={formError.field}
                        />
                      </Col>

                      <Col md={12} className="mt-3">
                        <InputFieldGroup
                          label="University"
                          name="university"
                          type="text"
                          value={formData.university}
                          onChange={(e) => {
                            setFormData({ ...formData, university: e.target.value });
                            if (formError.university) {
                              setFormError({ ...formError, university: "" });
                            }
                          }}
                          placeholder="University"
                          required={true}
                          error={formError.university}
                        />
                      </Col>

                      <Col md={6} className="mt-3">
                        <InputSelect
                          label="Start Year"
                          name="startYear"
                          value={formData.startYear}
                          onChange={(e) => {
                            setFormData({ ...formData, startYear: e.target.value });
                            if (formError.startYear) {
                              setFormError({ ...formError, startYear: "" });
                            }
                          }}
                          required={true}
                          error={formError.startYear}
                          options={yearOptions}
                        />
                      </Col>

                      <Col md={6} className="mt-3">
                        <InputSelect
                          label="End Year"
                          name="endYear"
                          value={formData.endYear}
                          onChange={(e) => {
                            setFormData({ ...formData, endYear: e.target.value });
                            if (formError.endYear) {
                              setFormError({ ...formError, endYear: "" });
                            }
                          }}
                          required={true}
                          error={formError.endYear}
                          options={yearOptions}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    {/* Left side: Add button */}
                    <Button className="maiacare-button">+ Add Qualification</Button>

                    {/* Right side: Save button */}
                    <Button onClick={handleSave} className="maiacare-button">
                      Save
                    </Button>
                  </div>
                </Modal>


              </div>

              {defaultQualifications.length === 0 ? (
                <div className="text-center text-muted p-4 border rounded-4">
                  Data not found
                </div>
              ) : (
                defaultQualifications.map((item, idx) => (

                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-start p-3 mb-3 bg-white border rounded-4 profile-card-boeder"
                  >
                    <div>
                      <div className="card-feild">{item.title}</div>
                      <div className="card-university-text">{item.university}</div>
                      <div className="card-year">{item.years}</div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button className="border p-2 rounded-3 edit-del-btn  bg-transparent">
                        <Image src={LightEditimg} alt="Specialization" width={18} height={18} />
                      </Button>

                      <Button className="border p-2 rounded-2 edit-del-btn  bg-transparent"
                        onClick={() => handleDelete(idx)} // 👈 click par delete
                      >
                        <Image src={Delete} alt="Specialization" width={18} height={18} />
                      </Button>

                    </div>
                  </div>
                ))
              )}
            </ContentContainer>

          </div>

        </Col>


        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

        <Col lg={4}>
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile">About</h5>
              <p className="mb-0 about-text" >
                I'm Dr. Riya Dharang, a fertility specialist with over 12 years of experience in reproductive medicine. I specialize in IVF, IUI, and fertility preservation, providing personalized, compassionate care to help individuals and couples achieve their parenthood dreams. Your well-being and trust are my top priorities.
              </p>
            </ContentContainer>
          </div>

          {/* Documents */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">Documents</h5>

                {documents.map((doc, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width="40"
                        className="me-3"
                      />
                      <div>
                        <div className="card-feild">{doc.name}</div>
                        <div className="card-year">{doc.date}</div>
                      </div>
                    </div>

                    <button
                      className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded  Download-border"
                      onClick={() => handleDownload(`/files/${doc.name}.pdf`, doc.name)}

                    >
                      <Image src={Download} alt="experience" width={25} height={25} />
                    </button>
                  </div>
                ))}

              </div>

            </ContentContainer>
          </div>

        </Col>
      </Row>
    </div>
    // </Container>
  );
};

export default ProfileBasicDetails;
