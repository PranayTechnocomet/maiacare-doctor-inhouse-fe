import React, { useState } from 'react'
import Image from 'next/image'
import { Accordion, Col, Row } from 'react-bootstrap'
import ContentContainer from './ui/ContentContainer'
import headphoneImg from "@/assets/images/headphone.png";

const supportFaqs = [
    {
        title: "How do I know which fertility treatment is right for me?",
        desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number."
    },
    {
        title: "How do I know which fertility treatment is right for me?",
        desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number."
    },
    {
        title: "How do I know which fertility treatment is right for me?",
        desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number."
    },
    {
        title: "How do I know which fertility treatment is right for me?",
        desc: "Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number."
    },
]

const SettingsSupport = () => {

    const [activeKey, setActiveKey] = useState<string | null>('0');

    const handleSelect = (eventKey: string | null | undefined, _e?: React.SyntheticEvent) => {
        setActiveKey(eventKey ?? null);
    };


    return (
        <>
            <ContentContainer>
                <div className="d-flex justify-content-start align-items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" rx="24" fill="#FFF3EE" />
                        <path d="M32.0817 15.9784C31.035 14.9212 29.79 14.0808 28.4181 13.5054C27.0461 12.9299 25.5741 12.6308 24.0864 12.625H24C20.9832 12.625 18.0899 13.8234 15.9567 15.9567C13.8234 18.0899 12.625 20.9832 12.625 24V30.125C12.625 30.8212 12.9016 31.4889 13.3938 31.9812C13.8861 32.4734 14.5538 32.75 15.25 32.75H17C17.6962 32.75 18.3639 32.4734 18.8562 31.9812C19.3484 31.4889 19.625 30.8212 19.625 30.125V25.75C19.625 25.0538 19.3484 24.3861 18.8562 23.8938C18.3639 23.4016 17.6962 23.125 17 23.125H14.4144C14.5831 21.3006 15.2684 19.562 16.3899 18.1131C17.5115 16.6642 19.0227 15.565 20.7466 14.9444C22.4705 14.3237 24.3357 14.2073 26.1234 14.6087C27.9111 15.0102 29.5473 15.9129 30.8403 17.2111C32.4207 18.7995 33.3927 20.8927 33.5867 23.125H31C30.3038 23.125 29.6361 23.4016 29.1438 23.8938C28.6516 24.3861 28.375 25.0538 28.375 25.75V30.125C28.375 30.8212 28.6516 31.4889 29.1438 31.9812C29.6361 32.4734 30.3038 32.75 31 32.75H33.625C33.625 33.4462 33.3484 34.1139 32.8562 34.6062C32.3639 35.0984 31.6962 35.375 31 35.375H24.875C24.6429 35.375 24.4204 35.4672 24.2563 35.6313C24.0922 35.7954 24 36.0179 24 36.25C24 36.4821 24.0922 36.7046 24.2563 36.8687C24.4204 37.0328 24.6429 37.125 24.875 37.125H31C32.1603 37.125 33.2731 36.6641 34.0936 35.8436C34.9141 35.0231 35.375 33.9103 35.375 32.75V24C35.3807 22.512 35.0927 21.0376 34.5276 19.6611C33.9625 18.2846 33.1313 17.0331 32.0817 15.9784ZM17 24.875C17.2321 24.875 17.4546 24.9672 17.6187 25.1313C17.7828 25.2954 17.875 25.5179 17.875 25.75V30.125C17.875 30.3571 17.7828 30.5796 17.6187 30.7437C17.4546 30.9078 17.2321 31 17 31H15.25C15.0179 31 14.7954 30.9078 14.6313 30.7437C14.4672 30.5796 14.375 30.3571 14.375 30.125V24.875H17ZM31 31C30.7679 31 30.5454 30.9078 30.3813 30.7437C30.2172 30.5796 30.125 30.3571 30.125 30.125V25.75C30.125 25.5179 30.2172 25.2954 30.3813 25.1313C30.5454 24.9672 30.7679 24.875 31 24.875H33.625V31H31Z" fill="#E29578" />
                    </svg>
                    <span className="accordion-title">Support</span>
                </div>

                <p className="settings-accordion-subtitle mt-lg-4 mt-3">Everything you need to know about the software and get help</p>

                <Row className='mt-lg-4 mt-0 g-lg-4 g-3'>
                    <Col xl="4" lg="5">
                        <div className='faqs-secation'>
                            <h6 className='support-faqs-title'>FAQs</h6>
                            <p className='support-faqs-desc'>Everything you need to know about the software and billing. Cant find answers you’re looking for? Please contact us on the phone number or on our email.</p>

                            <div className='mt-4 d-flex flex-column gap-3'>
                                <div className='d-flex gap-2'>
                                    <div className="support-contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                            <path d="M15.8112 13.9495C15.9151 13.8803 16.0346 13.8382 16.1588 13.8269C16.2831 13.8156 16.4082 13.8355 16.5228 13.8848L20.944 15.8657C21.093 15.9294 21.2174 16.0396 21.2985 16.1799C21.3796 16.3202 21.4132 16.4829 21.394 16.6438C21.2484 17.7323 20.7124 18.7309 19.8857 19.4537C19.059 20.1766 17.9978 20.5747 16.8997 20.5738C13.5182 20.5738 10.2751 19.2305 7.88405 16.8394C5.49296 14.4484 4.14966 11.2053 4.14966 7.82383C4.14882 6.72565 4.54686 5.66453 5.26975 4.83783C5.99264 4.01113 6.99118 3.47511 8.07966 3.32946C8.24057 3.31034 8.40334 3.34385 8.54361 3.42497C8.68388 3.50609 8.7941 3.63046 8.85779 3.77946L10.8387 8.20446C10.8874 8.31811 10.9072 8.44203 10.8964 8.56519C10.8856 8.68836 10.8445 8.80694 10.7768 8.91039L8.77341 11.2926C8.70234 11.3998 8.66032 11.5237 8.65145 11.652C8.64257 11.7803 8.66715 11.9088 8.72278 12.0248C9.4981 13.612 11.1387 15.2329 12.7306 16.0007C12.8472 16.0561 12.9762 16.0801 13.105 16.0704C13.2337 16.0607 13.3577 16.0176 13.4647 15.9454L15.8112 13.9495Z" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className='contact-detail m-0'>+9999999999</p>
                                </div>

                                <div className='d-flex gap-2'>
                                    <div className="support-contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                                            <path d="M3.39966 5.57422H21.3997V18.3242C21.3997 18.5231 21.3206 18.7139 21.18 18.8545C21.0393 18.9952 20.8486 19.0742 20.6497 19.0742H4.14966C3.95075 19.0742 3.75998 18.9952 3.61933 18.8545C3.47868 18.7139 3.39966 18.5231 3.39966 18.3242V5.57422Z" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21.3997 5.57422L12.3997 13.8242L3.39966 5.57422" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <p className='contact-detail m-0'>maiacare.support@gmail.com</p>
                                </div>

                            </div>
                        </div>

                    </Col>
                    <Col xl="8" lg="7">
                        <Accordion defaultActiveKey="0" activeKey={activeKey} onSelect={(e: any) => handleSelect(e)}>
                            {supportFaqs.map((item, index) => {
                                const currentKey = index.toString();
                                const isOpen = activeKey === currentKey;

                                return (
                                    <Accordion.Item
                                        eventKey={currentKey}
                                        key={index}
                                        className={`support-accordion-item mb-3 ${isOpen ? 'open' : ''}`}
                                    >
                                        <Accordion.Header className="support-accordion-header">
                                            <div className="support-accordion-header">
                                                {item.title}
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className="support-accordion-content p-0">
                                            {item.desc}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>

                    </Col>
                </Row>

            </ContentContainer>
        </>
    )
}

export default SettingsSupport
