// src/data/consultationData.ts

export interface ConsultationEntry {
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string;
}

export const consultationData: ConsultationEntry[] = [
  {
    name: "Rani Desai",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: "https://via.placeholder.com/32",
  },
  {
    name: "Nina Gupta",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Pending",
    image: "https://via.placeholder.com/32",
  },
  {
    name: "Himari Roy",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Scheduled",
    image: "https://via.placeholder.com/32",
  },
  {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "No Response",
    image: "https://via.placeholder.com/32",
  },
  {
    name: "Aastha Patil",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Rescheduled",
    image: "https://via.placeholder.com/32",
  },
];
