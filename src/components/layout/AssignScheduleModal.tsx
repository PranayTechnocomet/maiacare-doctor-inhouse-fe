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
                    <div className="col-5 col-md-3 text-end mt-2 mt-md-0">Action</div>
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
                        <div className="col-12 col-md-5 mt-3 mt-md-0">
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
        </Modal>
    );
}
