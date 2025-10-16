"use client";

import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Frame1 from "@/assets/images/Frame1.png";
import Frame2 from "@/assets/images/Frame2.png";
import Frame3 from "@/assets/images/Frame3.png";
import ContentContainer from "@/components/ui/ContentContainer";
import "@/style/AppointmentSummaryCards.css"; // 👈 import css

// Props type
interface AppointmentSummaryCardsProps {
  target: "patients" | "inventory"; // 👈 compulsory prop
}

export default function AppointmentSummaryCards({ target }: AppointmentSummaryCardsProps) {
  const router = useRouter();

  // ✅ put hook inside component
  const [selected, setSelected] = useState<string | null>(null);

  const handleCardClick = (filterType: string) => {
    setSelected(filterType);
    router.push(`/${target}?filter=${filterType}`);
  };

  return (
    <div className="row g-3 mb-3">
      {/* Total Appointment */}
      <div className="col-md-4">
        <ContentContainer className={`p-2 card-container ${selected === "all" ? "selected-all" : ""}`}>
          <div
            className="border-0 appointment-summary-cards"
            onClick={() => handleCardClick("all")}
           
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

      {/* Complete Appointment */}
      <div className="col-md-4">
        <ContentContainer className={`p-2 card-container ${selected === "completed" ? "selected-completed" : ""}`}>
          <div
            className="border-0  appointment-summary-cards"
            onClick={() => handleCardClick("completed")}
           
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

      {/* Cancelled Appointment */}
      <div className="col-md-4">
        <ContentContainer className={`p-2 card-container ${selected === "cancelled" ? "selected-cancelled" : ""}`}>
          <div
            className="border-0  appointment-summary-cards"
            onClick={() => handleCardClick("cancelled")}
           
          >
            <Card.Body className="d-flex gap-2 align-items-center">
              <Image src={Frame3} alt="Cancelled" className="img-fluid lock-image" />
              <div>
                <div className="fs-5 fw-bold">2200</div>
                <div className="text-muted small">Cancelled Appointment</div>
              </div>
            </Card.Body>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
