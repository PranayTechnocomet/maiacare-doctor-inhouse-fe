"use client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { doctorsData, Doctor } from "@/utils/StaticData";
import "@/style/AssignScheduleModal.css";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function AssignScheduleModal({ show, onHide }: Props) {
    const [selected, setSelected] = useState<{ [key: string]: string | null }>({});

    return (
        <Modal closeButton={false} show={show} onHide={onHide} centered size="lg" className="p-3">

            <div className="">
                {/* ===== Header Row ===== */}
                <div className="row border-bottom pb-2 mb-3 assign-header">
                    <div className="col-2 col-md-1">#</div>
                    <div className="col-5 col-md-3">Doctor</div>
                    <div className="col-12 col-md-5 mt-2 mt-md-0">Available Slots</div>
                    <div className="col-5 col-md-3 text-center mt-2 mt-md-0">Action</div>
                </div>

                {/* ===== Rows ===== */}
                {doctorsData.map((doctor: Doctor) => (
                    <div key={doctor.id} className="row align-items-center py-2 border-bottom">
                        {/* ID */}
                        <div className="col-2 col-md-1 assign-doctor">
                            {String(doctor.id).padStart(2, "0")}
                        </div>

                        {/* Doctor Info */}
                        <div className="col-10 col-md-3 d-flex align-items-center gap-2 mt-2 mt-md-0">
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                width={40}
                                height={40}
                                className="rounded-circle border"
                            />
                            <span className="assign-doctor">{doctor.name}</span>
                        </div>

                        {/* Available Slots */}
                        {/* <div className="col-12 col-md-5 mt-3 mt-md-0">
                            <div className="row g-2">
                                {(doctor.slots ?? []).map((slot, i) => (
                                    <div key={i} className="col-6 col-lg-4">
                                        <button
                                            className={`slot-btn ${selected[doctor.id] === slot ? "selected" : ""
                                                }`}
                                            onClick={() =>
                                                setSelected((prev) => ({ ...prev, [doctor.id]: slot }))
                                            }
                                        >
                                            {slot}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div> */}


                        <div className="col-12 col-md-5 mt-3 mt-md-0">
                            <div className="row g-2">
                                {(doctor.slots ?? []).map((slot, i) => {
                                    const isSelected = selected[doctor.id] === slot;
                                    const isDisabled = slot === "3:00 PM"; // 👈 Example condition

                                    return (
                                        <div key={i} className="col-6 col-lg-4  slot-btns">
                                            <button
                                                className={`slot-btn ${isSelected ? "selected" : ""}`}
                                                disabled={isDisabled}
                                                onClick={() =>
                                                    !isDisabled &&
                                                    setSelected((prev) => ({ ...prev, [doctor.id]: slot }))
                                                }
                                            >
                                                {slot}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        {/* Action */}
                        <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
                            <Button
                                variant="primary"
                                className="maiacare-button-small Assign-button"
                                disabled={!selected[doctor.id]}
                                onClick={() => {
                                    alert(`Assigned ${selected[doctor.id]} to ${doctor.name}`);
                                    onHide();
                                }}
                            >
                                Assign
                            </Button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="d-flex justify-content-around align-items-center mt-3 assign-pagination">
                <Button variant="link" className="p-0 page-btn ">
                    &lt; Previous
                </Button>
                <div className="pages d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((p) => (
                        <button
                            key={p}
                            className={`page-btn ${p === 5 ? "active" : ""}`}
                        >
                            {p}
                        </button>
                    ))}
                    <span className="dots">…</span>
                    <button className="page-btn">99</button>
                </div>
                <Button variant="link" className="p-0 page-btn ">
                    Next &gt;
                </Button>
            </div>

        </Modal >
    );
}
