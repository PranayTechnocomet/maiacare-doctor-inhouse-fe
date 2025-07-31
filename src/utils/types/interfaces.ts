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
