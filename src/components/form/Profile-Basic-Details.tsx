import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Add from "../../assets/images/Add.png";
import Delete from "../../assets/images/Delete.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Pdfimg from "../../assets/images/Pdfimg.png";
import Download from "../../assets/images/Download.png";
import Image from 'next/image';
import { useRouter } from "next/navigation";

import ContentContainer from '../ui/ContentContainer';
import { TimePickerFieldGroup } from '../ui/CustomTimePicker';

const ProfileBasicDetails = () => {
  interface FormError {
    [key: string]: string;
    
  }

  const router = useRouter();

const handleEditClick = () => {
  // set flag before navigation
  sessionStorage.setItem("triggerQualificationScroll", "true");
  router.push("/edit-profile?scrollTo=qualification");
};

  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [activeTab,] = useState('basic');
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [qualifications, setQualifications] = useState([
    { title: 'MD Gynaecology', university: 'Medical University', years: '2015 - 2017' },
    { title: 'MBBS', university: 'Medical University', years: '2010 - 2015' },
  ]);



  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;
  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);



  const documents = [
    { name: 'Certificate.pdf', date: 'October 20, 2024'},
    { name: 'Aadhar Card.pdf', date: 'October 20, 2024'},
    { name: 'License.pdf', date: 'October 20, 2024' },
    { name: 'Certificate.pdf', date: 'October 20, 2024'},
  ];

  const handleDelete = (index: number) => {
    const updated = qualifications.filter((_, i) => i !== index);
    setQualifications(updated);
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    // <Container fluid className="mt-3">
      <div>
        <Row>

          {/* =====LEFT COLUMN  PART ======== */}
          {/* Qualification */}

          <Col lg={8}>
            <div>
              <ContentContainer className='mt-4' >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="profile-card-main-titile">Qualification</h5>
                  <Button onClick={handleEditClick} className="profile-card-boeder profile-card-button bg-transparent" >
                    <Image src={Add} alt="Add" />
                  </Button>
                </div>

                {qualifications.length === 0 ? (
                  <div className="text-center text-muted p-4 border rounded-4">
                    Data not found
                  </div>
                ) : (
                  qualifications.map((item, idx) => (

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
                        <Button  onClick={handleEditClick}  className="border p-2 rounded-3 edit-del-btn  bg-transparent">
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
            {/* Operational hours & Days */}
            <div>
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
                      // required
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

                <Row>
                  <Col md={6}>
                    <TimePickerFieldGroup
                      label="Monday-Friday"
                      name="SS"
                      value={formData.SS}
                      onChange={(e) =>
                        setFormData({ ...formData, SS: e.target.value })
                      }
                      // required
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
