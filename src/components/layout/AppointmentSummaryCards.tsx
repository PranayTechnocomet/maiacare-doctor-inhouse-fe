"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";
import Frame1 from "@/assets/images/Frame1.png";
import Frame2 from "@/assets/images/Frame2.png";
import Frame3 from "@/assets/images/Frame3.png";
import ContentContainer from "@/components/ui/ContentContainer";
import { useRouter } from "next/navigation";

export default function AppointmentSummaryCards() {
    const router = useRouter();

    const handleCardClick = (type: string) => {
        if (type === "patients") router.push("/patients");
        else if (type === "cancelled") router.push("/complete-appointment");
        else if (type === "rescheduled") router.push("/rescheduled");
    };

    return (
        <div className="row g-3 mb-3">
            {/* Total Appointment - navigate to /patients */}
            <div className="col-md-4">
                <ContentContainer className="p-2">
                    <div
                        className="border-0"
                        onClick={() => handleCardClick("patients")}
                        style={{ cursor: "pointer" }}
                    >
                        <Card.Body className="d-flex gap-2 align-items-center">
                            <Image src={Frame1} alt="Total" className="img-fluid lock-image" />
                            <div>
                                <div className="fs-5 fw-bold">2200</div>
                                <div className="text-muted small">Total Appointment</div>
                            </div>
                        </Card.Body>
                    </div>
                </ContentContainer>
            </div>

            {/* Complete Appointment - navigate to /complete-appointment */}
            <div className="col-md-4">
                <ContentContainer className="p-2">
                    <div
                        className="border-0"
                        onClick={() => handleCardClick("cancelled")}
                        style={{ cursor: "pointer" }}
                    >
                        <Card.Body className="d-flex gap-2 align-items-center">
                            <Image src={Frame2} alt="Complete" className="img-fluid lock-image" />
                            <div>
                                <div className="fs-5 fw-bold">2200</div>
                                <div className="text-muted small">Complete Appointment</div>
                            </div>
                        </Card.Body>
                    </div>
                </ContentContainer>
            </div>

            {/* Rescheduled Appointment - navigate to /rescheduled */}
            <div className="col-md-4">
                <ContentContainer className="p-2">
                    <div
                        className="border-0"
                        onClick={() => handleCardClick("rescheduled")}
                        style={{ cursor: "pointer" }}
                    >
                        <Card.Body className="d-flex gap-2 align-items-center">
                            <Image src={Frame3} alt="Rescheduled" className="img-fluid lock-image" />
                            <div>
                                <div className="fs-5 fw-bold">2200</div>
                                <div className="text-muted small">Rescheduled Appointment</div>
                            </div>
                        </Card.Body>
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
}
