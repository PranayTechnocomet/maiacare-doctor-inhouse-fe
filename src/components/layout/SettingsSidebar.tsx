// src/components/settings/SettingsSidebar.tsx
import React from "react";
import { Nav } from "react-bootstrap";
import { RiLockPasswordLine, RiCustomerService2Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

interface Props {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Consultation = ({ activeTab, onTabChange }: Props) => {
    return (
        <div className="bg-white p-3 rounded shadow-sm">
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "login"}
                        onClick={() => onTabChange("login")}
                        className={`d-flex align-items-center gap-2 fw-medium ${activeTab === "login" ? "active-tab" : "text-secondary"
                            }`}
                    >
                        <RiLockPasswordLine size={18} />
                        Login & Security
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "notifications"}
                        onClick={() => onTabChange("notifications")}
                        className={`d-flex align-items-center gap-2 fw-medium ${activeTab === "notifications" ? "active-tab" : "text-secondary"
                            }`}
                    >
                        <IoNotificationsOutline size={18} />
                        Notification Settings
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "support"}
                        onClick={() => onTabChange("support")}
                        className={`d-flex align-items-center gap-2 fw-medium ${activeTab === "support" ? "active-tab" : "text-secondary"
                            }`}
                    >
                        <RiCustomerService2Line size={18} />
                        Support
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Consultation;
