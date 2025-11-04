import  "../StaticData";


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

  export type OptionType = { value: string; label: string };

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
  id: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string
  systolic: string;
  diastolic: string;
  heartRate: string;
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
