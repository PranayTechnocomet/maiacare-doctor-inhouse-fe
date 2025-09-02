"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import ContentContainer from "@/components/ui/ContentContainer";
import patientImage from "@/assets/images/Img-1.png";
import EditProfile from "../assets/images/EditProfile-2.png";
import "../style/ProfileTabes.css";
// import ContentContainer from './ui/ContentContainer';
import CustomTabs from './ui/CustomTabs';


export default function PatientDetailPageComponent() {

    const [activeTab, setActiveTab] = useState<string>("basic");

    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <></>
            ),
        },
        {
            key: "Details",
            label: "Partner Details",
            content: (
                <></>
            ),
        },
    ];

    return (
        <>
            <div className="row mb-4">
                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Patient Details</h6>
                    <ContentContainer className="shadow-sm border-0 h-75">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <Image
                                    src={patientImage}
                                    alt="Patient"
                                    width={60}
                                    height={60}
                                    className="rounded-circle me-3"
                                />
                                <div>
                                    <h5 className="mb-1 fw-semibold name-patient">Riya Gupta</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 ">
                                    <div className="heading-patient">Phone</div>
                                    <p className="mb-2 sub-heading-patient">+91 8987656874</p>
                                </div>
                                <div className="col-6 ">
                                    <div className="heading-patient">Email Address</div>
                                    <p className="mb-2 sub-heading-patient">jakewilson@gmail.com</p>
                                </div>
                                <div className="col-6 ">
                                    <div className="heading-patient">Gender</div>
                                    <p className="mb-2 sub-heading-patient">Female</p>
                                </div>
                                <div className="col-6 ">
                                    <div className="heading-patient">Age</div>
                                    <p className="mb-2 sub-heading-patient">31 years</p>
                                </div>
                                <div className="col-6 ">
                                    <div className="heading-patient">Pin Code</div>
                                    <p className="sub-heading-patient">400077</p>
                                </div>
                            </div>
                        </Card.Body>
                    </ContentContainer>
                </div>

                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Consultation Type and Concerns</h6>
                    <ContentContainer className="shadow-sm border-0 h-75">
                        <Card.Body>
                            <div className="mb-3">
                                <strong className=" d-block mb-2 heading-patient">Type:</strong>
                                <div className="d-flex gap-3 flex-wrap mb-4">
                                    {["Irregular Periods", "Trouble Getting Pregnant", "Hormonal Imbalance", " Getting Pregnant", "Trouble Getting ",].map((tag) => (
                                        <span
                                            key={tag}
                                            className="sub-patient bg-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-1 mb-3">
                                <strong className=" d-block mb-1 heading-patient">Concerns:</strong>
                                <p className=" mb-0 Patient-review">
                                    Mild endometriosis and irregular periods has been an issue for 2 months.
                                </p>
                                <p className=" mb-0 Patient-review">
                                    Hormone Panel; All levels within normal range.
                                </p>
                            </div>
                        </Card.Body>
                    </ContentContainer>
                </div>
            </div>

            {/* <div className="row mb-5">
                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Review</h6>
                    <ContentContainer className="shadow-sm border-0 mb-4">
                        <Card.Body>
                            <strong className=" d-block mb-2 heading-patient">Consultation Review *</strong>
                            <p className=" border rounded p-3 Patient-review">
                                Patient presented for an IVF consultation due to [reason, e.g., infertility, recurrent pregnancy loss].
                                History reviewed, including obstetric, menstrual, and medical background, along with partner’s fertility evaluation.
                                Recommended investigations include a hormonal panel, ultrasound, and genetic screening if needed.
                                The IVF process, success rates, potential risks, and next steps were discussed.
                                Patient was advised on pre-treatment preparation, and a follow-up was scheduled.
                            </p>

                            <div className="d-flex justify-content-end mt-3">
                                <Button className="edit-profile-btn d-flex align-items-center">
                                    <span className="me-2">
                                        <Image src={EditProfile} alt="EditProfile-btn" width={18} height={18} />
                                    </span>
                                    Edit
                                </Button>
                            </div>
                        </Card.Body>
                    </ContentContainer>
                </div>
            </div> */}
            {/* <div
                className="d-flex justify-content-end gap-3 p-3 border-top bg-white w-100"
                style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    zIndex: 1050
                }}
            >
                <Button variant="light" className="edit-profile-btn">Cancel</Button>
                <Button className="Button-login" variant="primary">Mark as Complete</Button>
            </div> */}
            <div className="mt-1">
                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}
                />
                {activeTab === 'basic' && (
                    <div className="mt-4 mb-5">
                        ProfileBasicDetails
                    </div>
                )}

                {activeTab === 'Details' && (
                    <div className="mt-4 mb-5">
                        ProfileManageLeave
                    </div>
                )}
            </div>

        </>
    );
}