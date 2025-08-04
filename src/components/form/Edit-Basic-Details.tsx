"use client";
// import { useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useState } from "react";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";

export default function PersonalDetails() {

  interface FormError {
  [key: string]: string;
}

const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);



  const [formData, setFormData] = useState({
    Name: "",
    Speciality: "",
    Experience: "",
    DOB: "",
    Gender: "", 
    Contact:"",
    Email :"",
    About  :"",
  });
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="personal-details-container">
      <Container className="mt-5">
        <h5 className="fw-bold">Personal Details</h5>

        <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
          <div className="position-relative profile-placeholder rounded overflow-hidden">
            <Image
              src={Simpleeditpro}
              alt="Profile"
              className=" mb-3 rounded-4"
              style={{ cursor: "pointer", width: 100, height: 100 }}
            />

            <div
              className="  rounded-3 p-2 position-absolute"
              style={{ bottom: 0, right: 0 }}
            // onClick={handleImageClick}
            >       <Image
                src={cameraicon}
                alt="Profile"
                style={{ cursor: "pointer", width: 40, height: 40 }}
              />
            </div>
          </div>

          <div>
            <div className="fw-semibold">Add Profile Picture</div>
            <div className="text-muted small">Allowed jpg, png of max size 5MB</div>
          </div>
        </div>
      </Container>

      <Form className="mt-5">
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
              helperText="Select doctor"
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
                value={formData.DOB}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                required={true}
                disabled={false}
                error={formError.DOB}
                helperText="Select date"
              />

          </Col>
          <Col md={6}>
            <Form.Label>Gender *</Form.Label>
            <div className="d-flex gap-3 mt-2">
              <Form.Check type="radio" label="Male" name="gender" />
              <Form.Check type="radio" label="Female" name="gender" defaultChecked />
            </div>
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
              required={false}
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
              required={false}
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
              label="About"
              name="Time"
              type="text"
              value={formData.About}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, About: e.target.value });
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="Email"
              required={false}
              disabled={false}
              readOnly={false}
              className="position-relative"
            >
            </InputFieldGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
