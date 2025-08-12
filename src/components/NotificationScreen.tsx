"use client";
import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import "@/style/NotificationScreen.css";
import "@/style/Consultation.css";
import emergencyImg from "@/assets/images/emergency.png";
import leaveUpdateImg from "@/assets/images/leave-update.png";
import doctorBackImg from "@/assets/images/Avatar.png";
import ContentContainer from "@/components/ui/ContentContainer";

interface NotificationItem {
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  image: string;
}

const notifications: NotificationItem[] = [
  {
    title: "Dolo 650 Low Stock",
    description: "Important updates and system-wide notifications.",
    time: "3 months ago",
    image: emergencyImg.src,
  },
  {
    title: "Stock Updated",
    description: "Dolo 650 stocks updated",
    time: "3 months ago",
    image: doctorBackImg.src,
    unread: true,
  },
  {
    title: "Allegra Out of Stock ",
    description: "Allegra Out of Stock.",
    time: "3 months ago",
    image: emergencyImg.src,
  },
  {
    title: "System Alerts",
    description: "Important updates and system-wide notifications.",
    time: "3 month ago",
    image: leaveUpdateImg.src,
  },
  {
    title: "Allegra Out of Stock ",
    description: "Allegra Out of Stock.",
    time: "3 months ago",
    image: emergencyImg.src,
    unread: true,
  },
  {
    title: "System Alerts",
    description: "Important updates and system-wide notifications.",
    time: "3 month ago",
    image: leaveUpdateImg.src,
  },
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
          {/* <Button variant="light" className="border custom-filter-button">
            <PiSlidersDuotone />
          </Button> */}
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
      <ContentContainer className="mt-3 notifications-list">
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
                className="me-3 notification-image"
              />
              <div>
                <div className="notification-title">{n.title}</div>
                <div className="notification-description">{n.description}</div>
              </div>
            </div>
            <div className="notification-time ms-3">{n.time}</div>
          </div>
        ))}
      </ContentContainer>
    </div>
  );
};

export default NotificationScreen;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          