import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../style/profile.css";
import Profiledoctor from "../../assets/images/Profile-doctor.png";
import Stethoscope from "../../assets/images/Stethoscope.png";
import Expirence from "../../assets/images/Expirence.png";
import Bithdate from "../../assets/images/Bithdate.png";
import Gender from "../../assets/images/Gender.png";
import Phone from "../../assets/images/Phone.png";
import Email from "../../assets/images/Email.png";
import MaiaVerify from "../../assets/images/MaiaVerify.png";
import EditProfile from "../../assets/images/EditProfile.png";
import Image from 'next/image';

const Profile = () => {



    const doctorData = {
        name: "Dr. Riya Dharang",
        isVerified: true,
        specialization: "Gynecologist",
        experience: "11 Years",
        dob: "7 Jan 1999",
        gender: "Female",
        phone: "+91 12345 67890",
        email: "riyadharang@miacare.com",
        memberSince: "02 March 23",
        image: Profiledoctor,
    };

    const DoctorProfileCard: React.FC<{ doctor: typeof doctorData }> = ({ doctor }) => {
        return (

    
                <div className="profile-card bg-white">
                    <Row>
                        <Col lg={8} md={9} className='d-flex flex-md-row flex-column align-items-center'>
                            <div className='col-4 col-md-4 col-lg-3 col-xl-2'>
                                <Image
                                    src={doctor.image}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            </div>
                            <div className='col-12 col-md-8 col-lg-9 col-xl-10 ms-4'>
                                <div>
                                    <div className="profile-name">
                                        <strong>{doctor.name}</strong>
                                        <Image src={MaiaVerify} alt="Specialization" width={18} height={18} />
                                        <span className="profile-verified-badge">Maia Verified</span>
                                    </div>
                                    <div className="profile-details">
                                        <div className="detail-row profile-sub-title">
                                            <span>
                                                <Image src={Stethoscope} alt="Specialization" width={18} height={18} /> {doctor.specialization}</span>
                                            <span>
                                                <Image src={Expirence} alt="Specialization" width={18} height={18} /> {doctor.experience}</span>
                                        </div>
                                        <div className="detail-row profile-sub-title">
                                            <span>
                                                <Image src={Bithdate} alt="Specialization" width={18} height={18} /> {doctor.dob}</span>
                                            <span>
                                                <Image src={Gender} alt="Specialization" width={18} height={18} /> {doctor.gender}</span>
                                        </div>
                                        <div className="detail-row profile-sub-title">
                                            <span> <Image src={Phone} alt="Specialization" width={18} height={18} /> {doctor.phone}</span>
                                            <span> <Image src={Email} alt="Specialization" width={18} height={18} />  {doctor.email}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 profile-member-since profile-sub-title">
                                        Member since {doctor.memberSince}
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={3} className="text-md-end text-center mt-3 mt-md-0">
                            <Button className="edit-profile-btn">
                                <span className="me-2">
                                    <Image src={EditProfile} alt="Specialization" width={18} height={18} />
                                </span>
                                Edit Profile
                            </Button>
                        </Col>
                    </Row>
                </div>


        );
    };

    return <DoctorProfileCard doctor={doctorData} />;
};

export default Profile;
