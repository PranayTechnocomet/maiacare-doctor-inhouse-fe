import  "../StaticData";
import { StaticImageData } from "next/image";

export interface User {
    id: string;
    name: string;
    email: string;
  }

// interfaces.ts

  export interface Patient {
    id: number;
    name: string;
    mobile: string;
    email: string;
    pincode: string;
    treatment: string;
    status: string;
  };
export interface imageUpload {
  type: string;
  files: File;
}

  export type OptionType = { value: string; label: string };



  //Patients basic details  interface  
  export interface MedicalHistoryType {
  medication: string,
  surgeries: string,
  surgeriesContent: string,
  medicalCondition: OptionType[],
  familyMedicalHistory: string,
  lifestyle: OptionType[],
  stress: string,
  exercise: string,
  medicationcontent: string,
  surgeriescontent: string,

};

export interface PhysicalAssessmentDataModel {
  id?: string;
   _id?: string;   // ⬅ ADD THIS
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string
  systolic: string;
  diastolic: string;
  heartRate: string;
  date:string;
};

export interface FertilityAssessmentFormType {
  ageAtFirstMenstruation: string;
  cycleLength: string;
  periodLength: string;
  date: string;
  isCycleRegular: string;
  menstrualIssues: string;
  pregnancy: string;
  timeduration: string;
  ectopicpregnancy: string;
}



export interface EditFertilityAssessment {
  semenAnalysis: string;
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
}

export interface FertilityAssessmentType {
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  systolic: string;
  diastolic: string;
  heartRate: string;
  semenAnalysis: string;
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
}

export interface PhysicalAssessmentData {
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  bloodPressure: string;
  heartRate: string;
}

export interface BookAppointmentForm {
  //Appointment Details

  appointmentId: string;
  type: string;
  reasonForVisit: [];
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;

  //Patient Details
  // patientName: SelectPatientType | null;
  patientName: any;
  phone: string;
  email: string;
  patientAge: string;
  gender: string;
}

export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}
