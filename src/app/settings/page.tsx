"use client";
import React, { useState } from "react";
import SettingsSidebar from "@/components/layout/SettingsSidebar";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { InputFieldGroup } from "@/components/ui/InputField";
import "@/style/login.css"
import Image from "next/image";
import lockimage from "@/assets/images/lock.png";
import deviceimage from "@/assets/images/device.png";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    localStorage.setItem("isLoggedIn", "true");
    alert("Password reset successful!");
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} md={4} lg={3} className="mb-4">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </Col>

        <Col xs={12} md={8} lg={9}>
          {activeTab === "login" && (
            <>
              <Card className="mb-4 shadow-sm">
                <div className="bg-white border-bottom p-3  " >
                  <div className="d-flex gap-3">
                    <Image src={lockimage}
                      alt="lock"
                      className="img-fluid lock-image"
                    />
                    <div>
                      <h1 className="mt-2 setting-head">Password Settings</h1>
                    </div>
                  </div>
                  <h4 className="pass-list-head mt-3 mb-0">For your security, please enter your current password followed by your new password.</h4>
                </div>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-2 position-relative">
                      <InputFieldGroup
                        label="Current Password"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div className="mb-2 position-relative">
                      <InputFieldGroup
                        label="New Password"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        required
                      />
                      <div className="mt-3 mb-2 pass-list-head">Your password must meet the following requirements:</div>
                      <ul className="ps-4 mb-0 small pass-list">
                        <li>At least one number</li>
                        <li>Minimum 8 characters</li>
                        <li>At least one uppercase & lowercase letter</li>
                        <li>At least one special character (e.g., !@#$%^&*)</li>
                      </ul>
                    </div>

                    <div className="mb-2 position-relative">
                      <InputFieldGroup
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        required
                        error={error}
                      />
                    </div>

                    <div className="d-flex justify-content-end flex-wrap gap-4 mt-4">
                      <div className="p-0 mt-2 forget-password">
                        Forgot Password?
                      </div>
                      <Button className="Button-login" type="submit">Save Password</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="shadow-sm p-4 bg-white">
                <Card.Body className="bg-white">
                  {/* <h5 className=" setting-head">Your Devices</h5> */}
                  <div className="d-flex gap-3">
                    <Image src={deviceimage}
                      alt="lock"
                      className="img-fluid lock-image"
                    />
                    <div>
                      <h1 className="mt-2 setting-head">Your Devices</h1>
                    </div>
                  </div>
                </Card.Body>

              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Notification Settings</h5>
                <p>You can customize your notification preferences here.</p>
              </Card.Body>
            </Card>
          )}

          {activeTab === "support" && (
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Support</h5>
                <p>Need help? Contact our support team at help@example.com</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
