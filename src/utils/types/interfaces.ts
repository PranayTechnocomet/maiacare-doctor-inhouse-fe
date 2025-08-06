import  "../StaticData";


export interface User {
    id: string;
    name: string;
    email: string;
  }

// interfaces.ts

export interface LeaveEntry {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
}
  export interface Patient {
    id: number;
    name: string;
    mobile: string;
    email: string;
    pincode: string;
    treatment: string;
    status: string;
  };
