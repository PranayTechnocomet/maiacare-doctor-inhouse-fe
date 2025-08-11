"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { InputFieldGroup } from "@/components/ui/InputField";
import PillsImage from "@/assets/images/pills.png";
import Maia from "@/assets/images/maia.png";
import "@/style/login.css"
import { MdOutlineMail } from 'react-icons/md';
import { LuLock, LuEye, LuEyeOff } from 'react-icons/lu';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch: AppDispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(setHeaderData({ title: "login", subtitle: "login" }));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email === "pharma@maiacare.com" && password === "12345678") {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        {/* Left: Login Form */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center bg-white px-4 py-5 login-form"
        >
          <div className="w-75">

            <Image src={Maia}
              alt="maia-care"
              className="img-fluid mb-3 maia-care-image d-block mx-auto"
            />

            <h5 className="text-center mb-3 modal-heading">
              Log In To Your Account.
            </h5>
            <p className="text-center mb-4 brand-text">
              Please enter details to access your dashboard
            </p>
            <Form onSubmit={handleLogin}>
              <div className="mb-2 position-relative">
                <InputFieldGroup
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="pharma@maiacare.com"
                  required
                  className="position-reletive test"
                />
                <div className="position-absolute top-50 start-0 translate-middle-y ps-2 mt-3">
                  <MdOutlineMail className="icon-color" size={20} />
                </div>
              </div>


              <div className="mb-2 position-relative">
                <InputFieldGroup
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="*****************"
                  required
                  className="position-reletive test"
                />

                {/* Lock icon on the left */}
                <div className="position-absolute top-50 start-0 translate-middle-y ps-2 mt-3">
                  <LuLock className="icon-color" size={20} />
                </div>

                {/* Toggle password icon on the right */}
                <div
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 mt-3"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <IoEyeOutline className="eye-color" size={20} /> : <FaRegEyeSlash className="eye-color" size={20} />}
                </div>
              </div>


              <div className="text-end mb-3">
                <a href="/forgot-password" className="small text-decoration-none forget-password">
                  Forgot Password?
                </a>
              </div>

              <Link href="/">
                <Button type="submit" className="w-100 Button-login">
                  Log In
                </Button>
              </Link>
            </Form>
          </div>
        </Col>

        {/* Right: Image and Text */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center position-relative p-0 image-col"
        >
          <Image
            src={PillsImage}
            alt="Pills spilling"
            className="img-fluid w-100 h-100 image-full"
          />

          <div className="image-overlay-text text-center w-100">
            “Managing your pharmacy, <br /> made easy!”
          </div>
        </Col>

      </Row >
    </Container >
  );
}