"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Image from "next/image";
import { InputFieldGroup } from "@/components/ui/InputField";
import Maia from "@/assets/images/maia.png";
import "@/style/login.css";
import Link from "next/link";
import { MdOutlineMail } from 'react-icons/md';

function Page() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderData({ title: "verification", subtitle: "verification" }));
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
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="bg-white rounded shadow p-5 verification-form">
                <div className="text-center mb-3">
                    <Image src={Maia}
                        alt="maia-care"
                        className="img-fluid maia-care-image d-block mx-auto"
                    />
                </div>

                <h5 className="text-center mb-2 fw-semibold modal-heading">Forgot Password</h5>
                <p className="text-center  small mb-4  brand-text">
                    An email with a verification code was just sent to bm@gmail.com
                </p>

                <Form onSubmit={handleLogin}>
                    <div className="mb-4 position-relative">
                        <InputFieldGroup
                            label="Verification Code"
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

                    <Link href="/reset-password">
                        <Button type="submit" className="w-100 Button-login">
                            Verify
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default Page;