import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Add from "../assets/images/Add.png";
import Delete from "../assets/images/Delete.png";
import LightEditimg from "../assets/images/LightEditimg.png";
import Image from 'next/image';
import ContentContainer from "./ui/ContentContainer";
import { InputFieldGroup } from './ui/InputField';
import "../style/ProfileTabes.css";
// import { IoIosEye } from 'react-icons/io';

const ProfileTabes = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [qualifications,] = useState([
    { title: 'MD Gynaecology', university: 'Medical University', years: '2015 - 2017' },
    { title: 'MBBS', university: 'Medical University', years: '2010 - 2015' },
  ]);

  const [formData, setFormData] = useState({
    MF :"",
    SS : "",
    Time : "",
    Timer :"",

  });

  return (
    <Container fluid className="mt-3">

      
       {/* <ul className="custom-tab nav">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Details
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaves')}
          >
            Manage Leaves
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('Reviews')}
          >
            Reviews
          </button>
        </li>
      </ul> */}


<div className="tab-scroll-container">
  <ul className="custom-tab nav">
    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
        onClick={() => setActiveTab('basic')}
      >
        Basic Details
      </button>
    </li>

    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
        onClick={() => setActiveTab('leaves')}
      >
        Manage Leaves
      </button>
    </li>

    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
        onClick={() => setActiveTab('Reviews')}
      >
        Reviews
      </button>
    </li>
  </ul>
</div>





      <div className="mt-4">
        {activeTab === 'basic' && (
          <Row>

            {/* =====LEFT COLUMN  PART ======== */}



            <Col lg={8} className="mb-3">
              <div>
                <ContentContainer className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="profile-card-main-titile">Qualification</h5>
                    <Button variant="light" className="profile-card-boeder">
                      <Image src={Add} alt="Add" width={18} height={18} />
                    </Button>
                  </div>

                  {qualifications.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between align-items-center p-3 mb-3 bg-white border rounded-4 shadow-sm profile-card-boeder"
                    >
                      <div>
                        <div className="card-feild">{item.title}</div>
                        <div className="card-university-text">{item.university}</div>
                        <div className="card-year">{item.years}</div>
                      </div>

                      <div className="d-flex gap-2">
                        <Button variant="light" className="border  p-2 rounded-3">
                          <Image src={LightEditimg} alt="Specialization" width={22} height={22} />
                        </Button>

                        <Button variant="light" className="border  p-2 rounded-3 ">
                          <Image src={Delete} alt="Specialization" width={22} height={22} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ContentContainer>
              </div>

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
              </div>
            </Col>


            {/* ======RIGHT COLUMN =========== */}


            <Col lg={4}>
              <div>
                <ContentContainer className="mt-4">
                  <h5 className="profile-card-main-titile">About</h5>
                  <p className="mb-0 about-text" style={{ fontSize: "14px" }}>
                    I'm Dr. Riya Dharang, a fertility specialist with over 12 years of experience in reproductive medicine. I specialize in IVF, IUI, and fertility preservation, providing personalized, compassionate care to help individuals and couples achieve their parenthood dreams. Your well-being and trust are my top priorities.
                  </p>
                </ContentContainer>
              </div>


              <div>
                <ContentContainer className="mt-4">
                  <div>

                  </div>

                </ContentContainer>
              </div>


            </Col>






          </Row>

        )}

        {activeTab === 'leaves' && (
          <div>Manage Leaves Content</div>
        )}

        {activeTab === 'Reviews' && (
          <div>Reviews Content</div>
        )}
      </div>


    </Container>
  );
};

export default ProfileTabes;
