"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import ContentContainer from "@/components/ui/ContentContainer";
import patientImage from "@/assets/images/Img-1.png";
import EditProfile from "../assets/images/EditProfile-2.png";
import "../style/ProfileTabes.css";
import CustomTabs from './ui/CustomTabs';
import PatientBasicDetail from './PatientBasicDetail';
import PartnerDetail from './PartnerDetail';
import { getOne } from "@/utils/apis/apiHelper";
import { useParams } from "next/navigation";

export default function PatientDetailPageComponent({ onPatientLoaded }: any) {

    const [activeTab, setActiveTab] = useState<string>("basic");
    const params = useParams();
    const id = params?.id?.toString();

    const [patient, setPatient] = useState<any>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                if (!id) return;

                const res = await getOne(id);
                const pData = res?.data?.data || res?.data;

                setPatient(pData);

                // Send patient name to parent
                onPatientLoaded?.(pData?.personalDetails?.name || "N/A");

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

    const p = patient?.personalDetails;

    return (
        <>
            <div className="row mb-4">

                {/* LEFT SIDE - PATIENT BASIC DETAILS */}
                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Patient Details</h6>

                    <div className="pation-profile-data">
                        <ContentContainer className="shadow-sm border-0 patient-box">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <Image
                                        src={p?.profileImage ? p.profileImage : patientImage}
                                        alt="Patient"
                                        width={60}
                                        height={60}
                                        className="rounded-circle me-3"
                                    />

                                    <div>
                                        <h5 className="mb-1 fw-semibold name-patient">
                                            {p?.name || "N/A"}
                                        </h5>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6 ">
                                        <div className="heading-patient">Phone</div>
                                        <p className="mb-2 sub-heading-patient">{p?.contactNumber || "N/A"}</p>
                                    </div>

                                    <div className="col-6 ">
                                        <div className="heading-patient">Email Address</div>
                                        <p className="mb-2 sub-heading-patient">{p?.email || "N/A"}</p>
                                    </div>

                                    <div className="col-6 ">
                                        <div className="heading-patient">Gender</div>
                                        <p className="mb-2 sub-heading-patient">{p?.gender || "N/A"}</p>
                                    </div>

                                    <div className="col-6 ">
                                        <div className="heading-patient">Age</div>
                                        <p className="mb-2 sub-heading-patient">
                                            {p?.age ?? "N/A"}
                                        </p>
                                    </div>

                                    <div className="col-6 ">
                                        <div className="heading-patient">Pin Code</div>
                                        <p className="sub-heading-patient">{p?.pincode || "N/A"}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </ContentContainer>
                    </div>
                </div>

                {/* RIGHT SIDE - CONSULTATION & CONCERNS */}
                <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 mt-2 Patient-Details">Consultation Type and Concerns</h6>

                    <div className='pation-profile-dataa'>
                        <ContentContainer className="shadow-sm border-0 patient-box">
                            <Card.Body>
                                {/* CONSULTATION TYPE */}
                                <div className="mb-3">
                                    <strong className=" d-block mb-2 heading-patient">Type:</strong>

                                    <div className="d-flex gap-3 flex-wrap mb-4">
                                        {patient?.concerns?.length > 0 ? (
                                            patient.concerns.map((tag: string) => (
                                                <span key={tag} className="sub-patient bg-white">
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span>No concerns found</span>
                                        )}
                                    </div>
                                </div>

                                {/* REVIEW / CONCERNS */}
                                <div className="mt-1 mb-3">
                                    <strong className=" d-block mb-1 heading-patient">Concerns:</strong>

                                    <p className="mb-0 Patient-review">
                                        {patient?.consultReview || "No review added yet."}
                                    </p>
                                </div>
                            </Card.Body>
                        </ContentContainer>
                    </div>
                </div>
            </div>

            {/* FIXED FOOTER BUTTONS */}
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

            {/* TABS */}
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
