"use client";
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import ContentContainer from "@/components/ui/ContentContainer";
import patientImage from "@/assets/images/Img-1.png";
import React, { useEffect, useState } from 'react';
import CustomTabs from './ui/CustomTabs';

export default function AppointmentPatientDetailPage() {
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
            <div className="row mb-2">
                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Patient Details</h6>
                    <ContentContainer className="shadow-sm border-0 h-75 ">
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
                                    {["Irregular Periods", "Trouble Getting Pregnant", "Hormonal Imbalance",].map((tag) => (
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

            <div
                className="d-flex justify-content-end gap-3 p-3 border-top bg-white w-100 appointment-patient-detail-image"
                
            >
                <Button variant="light" className="edit-profile-btn">Cancel</Button>
                <Button className="Button-login" variant="primary">Mark as Complete</Button>
            </div>

        </>
    );
}