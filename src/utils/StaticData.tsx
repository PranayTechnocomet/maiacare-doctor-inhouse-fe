// src/data/consultationData.ts
import RaniImg from "@/assets/images/Img-1.png";
import NinaImg from "@/assets/images/Img-2.png";
import HimariImg from "@/assets/images/Img-3.png";
import AnjaliImg from "@/assets/images/Img-4.png";
import AasthaImg from "@/assets/images/Img-5.png";
import { StaticImageData } from "next/image";


export interface ConsultationEntry {
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string | StaticImageData; // allow both local and URL
}

export const consultationData: ConsultationEntry[] = [
  {
    name: "Rani Desai",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: RaniImg,
  },
  {
    name: "Nina Gupta",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Pending",
    image: NinaImg,
  },
  {
    name: "Himari Roy",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Scheduled",
    image: HimariImg,
  },
  {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "No Response",
    image: AnjaliImg,
  },
    {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "No Response",
    image: AnjaliImg,
  },
  {
    name: "Aastha Patil",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Rescheduled",
    image: AasthaImg,
  },
  {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "No Response",
    image: AnjaliImg,
  },
];


export const completeData: ConsultationEntry[] = [
  {
    name: "Rani Desai",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: RaniImg,
  },
  {
    name: "Nina Gupta",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: NinaImg,
  },
  {
    name: "Himari Roy",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: HimariImg,
  },
  {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: AnjaliImg,
  },
    {
    name: "Himari Roy",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: HimariImg,
  },
  {
    name: "Anjali Shinde",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Completed",
    image: AnjaliImg,
  },
];
