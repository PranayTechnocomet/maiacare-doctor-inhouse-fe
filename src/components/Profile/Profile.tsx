import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../style/profile.css";
import Profiledoctor from "../../assets/images/Profile-doctor.png";
import Image from 'next/image';

const Profile = () => {
    return (
        <div className="profile-card">
            <Row >
                <Col xs={12} md={1}>
                    <Image
                        src={Profiledoctor}
                        alt="Profile"
                        className="profile-image"
                    />
                </Col>

                <Col xs={12} md={8} >
                    <div>
                        <div className="profile-name">
                            <strong>Dr. Riya Dharang</strong>
                            <span className="verified-badge">Maia Verified</span>
                        </div>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span>🩺 Gynecologist</span>
                                <span>🗓️ 11 Years</span>
                            </div>
                            <div className="detail-row">
                                <span>🎂 7 Jan 1999</span>
                                <span>🚺 Female</span>
                            </div>
                            <div className="detail-row">
                                <span>📞 +91 12345 67890</span>
                                <span>📧 riyadharang@miacare.com</span>
                            </div>
                        </div>


                        <div className="profile-member-since">
                            Member since 02 March 23
                        </div>
                    </div>
                </Col>

                <Col className="text-md-end text-center mt-3 mt-md-0">
                    <Button variant="outline-primary" className="edit-profile-btn">
                        ✏️ Edit Profile
                    </Button>
                </Col>
            </Row>
        </div>

    );
};

export default Profile;
