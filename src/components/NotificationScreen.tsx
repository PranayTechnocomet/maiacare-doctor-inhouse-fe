"use client";
import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import "@/style/NotificationScreen.css";
import { PiSlidersDuotone } from "react-icons/pi";
import "@/style/Consultation.css";
import emergencyImg from "@/assets/images/emergency.png";
import leaveUpdateImg from "@/assets/images/leave-update.png";
import doctorBackImg from "@/assets/images/doctor-back.png";

interface NotificationItem {
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  image: string;
}

const notifications: NotificationItem[] = [
  {
    title: "Emergency update",
    description: "Patient Riya Gupta needed a sudden Laparoscopic procedure",
    time: "10 mins ago",
    image: emergencyImg.src,
  },
  {
    title: "Dr. Sonia Advani - Leave Update",
    description: "Check and block doctor's calendar during the leave",
    time: "15 mins ago",
    image: leaveUpdateImg.src,
    unread: true,
  },
  {
    title: "Dr. Sushant Patil - Leave Update",
    description: "Dr. Sushant is back from leave schedule missed appointments",
    time: "18 days ago",
    image: leaveUpdateImg.src
  },
  {
    title: "System Alerts",
    description: "Important updates and system-wide notifications.",
    time: "1 month ago",
    image: doctorBackImg.src
  },
  {
    title: "System Alerts",
    description: "Important updates and system-wide notifications.",
    time: "3 months ago",
    image: doctorBackImg.src,
    unread: true,
  }
];



const NotificationScreen: React.FC = () => {
  const router = useRouter();

  return (
    <div className="notifications-page">
      {/* header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
        {/* Search Input */}
        <div>
          <InputGroup className="mb-2 custom-search-group">
            <Form.Control
              placeholder="Search"
              className="custom-search-input"
            />
            <InputGroup.Text className="custom-search-icon">
              <IoSearch className="search-icon" />
            </InputGroup.Text>
          </InputGroup>
        </div>

        {/* Sort + Filter */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="text-muted small short-by">Sort by:</span>
          <Form.Select className="custom-sort-select">
            <option>All Time</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </Form.Select>
          <Button variant="light" className="border custom-filter-button">
            <PiSlidersDuotone />
          </Button>
        </div>
      </div>

      {/* search */}
      {/* <div className="mt-3">
        <InputGroup>
          <InputGroup.Text>
            <FiSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search History" />
        </InputGroup>
      </div> */}

      {/* list */}
      <div className="mt-3 notifications-list">
        {notifications.map((n, idx) => (
          <div
            key={idx}
            className={`notification-item d-flex justify-content-between align-items-start p-3 mb-2 rounded ${n.unread ? "unread" : ""}`}

            role="button"
          >
            <div className="d-flex align-items-start">
              <img
                src={n.image}
                alt={n.title}
                className="me-3"
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold">{n.title}</div>
                <div className="text-muted small">{n.description}</div>
              </div>
            </div>
            <div className="text-muted small ms-3">{n.time}</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default NotificationScreen;
