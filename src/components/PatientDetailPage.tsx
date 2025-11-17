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
import PatientBasicDetail from './PatientBasicDetail';
import PartnerDetail from './PartnerDetail';
import { getOne } from "@/utils/apis/apiHelper"; // <-- You MUST create this
import { useParams } from "next/navigation";
export default function PatientDetailPageComponent() {

    const [activeTab, setActiveTab] = useState<string>("basic");
  const params = useParams();
    const id = params?.id?.toString();   // <-- FIXED ✔✔✔

    const [patient, setPatient] = useState<any>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                if (!id) return;
                const res = await getOne(id);    // now correct type
                setPatient(res?.data?.data || res?.data);
            } catch (error) {
                console.error("Error fetching patient:", error);
            }
        };

        fetchPatient();
    }, [id]);
    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <>
                    <PatientBasicDetail />
                </>
            ),
        },
        {
            key: "Details",
            label: "Partner Details",
            content: (
                <>
                    <PartnerDetail setActiveTab={setActiveTab} />
                </>
            ),
        },
    ];

    return (
        <>
            <div className="row mb-4">

                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Patient Details</h6>
                    <div className="pation-profile-data">
                        <ContentContainer className="shadow-sm border-0 patient-box">
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
                </div>

                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Consultation Type and Concerns</h6>
                    <div className='pation-profile-dataa'>
                        <ContentContainer className="shadow-sm border-0 patient-box">
                            <Card.Body>
                                <div className="mb-3">
                                    <strong className=" d-block mb-2 heading-patient">Type:</strong>
                                    <div className="d-flex gap-3 flex-wrap mb-4">
                                        {["Irregular Periods", "Trouble Getting Pregnant", "Hormonal Imbalance", " Getting Pregnant",].map((tag) => (
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
            </div>

          
            <div
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
            </div>

            <div className="mt-1">
                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}
                />
            </div>
 
        </>
    );
}