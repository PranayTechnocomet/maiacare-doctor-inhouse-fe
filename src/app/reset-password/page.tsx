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
import "@/style/login.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderData({ title: "login", subtitle: "login" }));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", "true");
    alert("Password reset successful!");
    // Optionally redirect here
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
            <Image
              src={Maia}
              alt="maia-care"
              className="img-fluid mb-3 maia-care-image"
            />

            <h5 className="mb-1 modal-heading">Reset Password</h5>
            <p className="mb-2 brand-text">
              Secure your account by setting a new password.
            </p>

            <Form onSubmit={handleLogin}>
              {/* New Password */}
              <div className="mb-2 position-relative">
                <InputFieldGroup
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="*****************"
                  required
                  className="position-reletive test"
                />
                <div className="position-absolute top-50 start-0 translate-middle-y ps-2 mt-3">
                  <LuLock className="icon-color" size={20} />
                </div>

                {/* Toggle password icon on the right */}
                <div
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 mt-3"
                  onClick={() => setShowNewPassword(prev => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {showNewPassword ? <IoEyeOutline className="eye-color" size={20} /> : <FaRegEyeSlash className="eye-color" size={20} />}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 position-relative">
                <InputFieldGroup
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="*****************"
                  required
                  className="position-reletive test"

                />
                <div className="position-absolute top-50 start-0 translate-middle-y ps-2 mt-3">
                  <LuLock className="icon-color" size={20} />
                </div>

                {/* Toggle password icon on the right */}
                <div
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 mt-3"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <IoEyeOutline className="eye-color" size={20} /> : <FaRegEyeSlash className="eye-color" size={20} />}
                </div>
              </div>



              {/* Error Message */}
              {error && (
                <Form.Text className="text-danger d-block mb-3">
                  {error}
                </Form.Text>
              )}

              <Button type="submit" className="w-100 Button-login">
                Reset Password
              </Button>
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
      </Row>
    </Container>
  );
}