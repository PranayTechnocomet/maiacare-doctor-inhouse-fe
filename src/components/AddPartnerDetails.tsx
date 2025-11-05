"use client"

import { FormEvent, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import { BasicDetailsForm, FertilityAssessment, MedicalHistoryForm, PhysicalAssessment } from "./form/AddPartnerDetailsForm";
import { Accordion } from "react-bootstrap";
import Button from "./ui/Button";
// import '../style/fertilityassessment.css'
import { FertilityAssessmentType } from "@/utils/types/interfaces";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";

interface AddPartnerDetailsProps {
    setAddPartner: (value: boolean) => void;
    setShowContent: (value: boolean) => void;
    setShowPartnerDetail: (value: boolean) => void;
    setShowData: (value: any) => void;
    modalEditTab: string | null;
    setModalEditTab: (value: string | null) => void;
    showData: any;
}

export function AddPartnerDetails({
    setAddPartner,
    setShowContent,
    setShowPartnerDetail,
    setShowData,
    modalEditTab,
    setModalEditTab,
    showData, }
    : AddPartnerDetailsProps) {

    const [activeTab, setActiveTab] = useState<string>("basic");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <div>
                    <BasicDetailsForm setAddPartner={setAddPartner}
                        setActiveTab={setActiveTab}
                        setShowData={setShowData}
                    />
                </div>
            ),
        },
        
        {
            key: "medical history",
            label: "Medical History",
            content: (
                <MedicalHistoryForm
                    setAddPartner={setAddPartner}
                    setActiveTab={setActiveTab}
                    setShowData={setShowData}
                    initialData={modalEditTab === "medical history" ? showData.medicalHistory : undefined}
                />
                // <h6>Medical History</h6>
            ),
        },
        {
            key: "physical & fertility assessment",
            label: "Physical & Fertility Assessment",
            content: (
                <PhysicalFertilityAssessmentAccordion
                    setShowContent={setShowContent}
                    setAddPartner={setAddPartner}
                    setShowPartnerDetail={setShowPartnerDetail}
                    setShowData={setShowData}
                    showData={showData}
                    initialData={modalEditTab === "physical & fertility assessment" ? showData.fertilityAssessment : undefined}
                />

                // <PhysicalFertilityAssessmentForm
                //     setShowContent={setShowContent}
                //     setAddPartner={setAddPartner}
                //     setShowPartnerDetail={setShowPartnerDetail}
                //     setShowData={setShowData}
                //     showData={showData}
                //     initialData={modalEditTab === "physical & fertility assessment" ? showData.fertilityAssessment : undefined}
                //     eventKey={eventKey}
                // />
            ),
        },
    ];

    return (
        <>
            <CustomTabs
                tabOptions={tabOptions}
                className="mb-3"
                activeKey={activeTab}
                setActiveKey={handleTabChange}
            />

        </>
    )
}

export function PhysicalFertilityAssessmentAccordion({ setShowContent, setAddPartner, setShowPartnerDetail, setShowData, showData, initialData }: { setShowContent: (value: boolean) => void, setAddPartner: (value: boolean) => void, setShowPartnerDetail: (value: boolean) => void, setShowData: (value: any) => void, showData: any, initialData: any }) {

    const initialFormData: FertilityAssessmentType = {
        height: "",
        weight: "",
        bmi: "",
        bloodGroup: "",
        systolic: "",
        diastolic: "",
        heartRate: "",
        semenAnalysis: initialData?.semenAnalysis || "yes",
        semenAnalysisContent: initialData?.semenAnalysisContent || "",
        fertilityIssues: initialData?.fertilityIssues || "no",
        fertilityIssuesContent: initialData?.fertilityIssuesContent || "",
        fertilityTreatment: initialData?.fertilityTreatment || "no",
        fertilityTreatmentContent: initialData?.fertilityTreatmentContent || "",
        surgeries: initialData?.surgeries || "no",
        surgeriesContent: initialData?.surgeriesContent || "",
    };

    const [formData, setFormData] = useState<FertilityAssessmentType>(initialFormData);
    type FormError = Partial<Record<keyof FertilityAssessmentType, string>>;

    const initialFormError: FormError = {};
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const validateForm = (data: FertilityAssessmentType): FormError => {
        const errors: FormError = {};

        if (!data.height.trim()) errors.height = "Height is required";
        if (!data.weight.trim()) errors.weight = "Weight is required";
        if (!data.bmi.trim()) errors.bmi = "BMI is required";
        if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";
        if (!data.systolic.trim()) errors.systolic = "Blood pressure is required";

        if (!data.heartRate.trim()) errors.heartRate = "Heart rate is required";

        if (!data.semenAnalysis.trim()) errors.semenAnalysis = "Seminal Analysis is required";
        if (data.semenAnalysis === 'yes' && !data.semenAnalysisContent.trim()) errors.semenAnalysisContent = "Seminal Analysis Content is required";
        if (!data.fertilityIssues.trim()) errors.fertilityIssues = "Fertility Issues is required";
        if (data.fertilityIssues === 'yes' && !data.fertilityIssuesContent.trim()) errors.fertilityIssuesContent = "Fertility Issues Content is required";
        if (!data.fertilityTreatment.trim()) errors.fertilityTreatment = "Fertility Treatment is required";
        if (data.fertilityTreatment === 'yes' && !data.fertilityTreatmentContent.trim()) errors.fertilityTreatmentContent = "Fertility Treatment Content is required";
        if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
        if (data.surgeries === 'yes' && !data.surgeriesContent.trim()) errors.surgeriesContent = "Surgeries Content is required";

        return errors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const errors = validateForm(formData);
        console.log("Form submitted", formData);
        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            // Handle form submission
            setFormError(initialFormError);
            setAddPartner(false);
            setShowPartnerDetail(false);
            setShowContent(true);

            setShowData((prev: any) => ({ ...prev, PhysicalAssessmentData: [...prev.PhysicalAssessmentData, formData] }));
            setShowData((prev: any) => ({ ...prev, fertilityAssessment: { ...prev.fertilityAssessment, ...formData } }));

            toast.success('Partner added successfully', {
                icon: <BsInfoCircle size={22} color="white" />,
            });
        }
        // setShowData((prev: any) => ({ ...prev, PhysicalAssessmentData: [...prev.PhysicalAssessmentData, formData] }));
        // setShowData((prev: any) => ({ ...prev, fertilityAssessment: { ...prev.fertilityAssessment, ...formData } }));

    };
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="fertilitiy-assement-accodion-item mb-3 mt-3">
                    <Accordion.Header>
                        <div className="fertilitiy-assement-accodion-title">
                            Physical Assessment
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className='pt-0'>
                        <PhysicalAssessment setFormError={setFormError} formError={formError} formData={formData} setFormData={setFormData} setShowContent={setShowContent} setShowPartnerDetail={setShowPartnerDetail} setShowData={setShowData} showData={showData} />

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="fertilitiy-assement-accodion-item mb-3 mt-3">
                    <Accordion.Header>
                        <div className="fertilitiy-assement-accodion-title">
                            Fertility Assessment
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className='pt-0'>
                        <FertilityAssessment formData={formData} setFormData={setFormData} setFormError={setFormError} formError={formError} setShowContent={setShowContent} setShowPartnerDetail={setShowPartnerDetail} setShowData={setShowData} showData={showData} initialData={initialData} />

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className='d-flex gap-3'>
                <Button className="w-100 mt-3" variant="outline" disabled={false} onClick={() => setAddPartner(false)}>
                    Cancel
                </Button>
                <Button className="w-100 mt-3" variant="default" disabled={false} type="button" onClick={(e: any) => handleSubmit(e)}
                >
                    Save
                </Button>
            </div>
        </>
    )
}

