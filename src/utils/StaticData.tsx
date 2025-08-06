// static.ts
import { ColumnDef } from '@tanstack/react-table';

import { LeaveEntry } from "../utils/types/interfaces";
import Trash from "../assets/images/Trash.png";
import LightEditimg from "../assets/images/LightEditimg.png";
import Image from 'next/image';

export const leaveData: LeaveEntry[] = [
    {   
        id: '01',
        type: 'Casual leave',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '1 Day',
    },
    {
        id: '02',
        type: 'Sick leave', 
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '3 Days',
    },
    {
        id: '03',
        type: 'Vacation',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '15 Days',
    },
    {
        id: '04',
        type: 'Family Thing',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '1 Day',
    },
    {
        id: '05',
        type: 'Sick leave',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '2 Days',
    },
    {
        id: '06',
        type: 'Casual leave',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '1 Day',
    },
    {
        id: '07',
        type: 'Family thing',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '2 Days',
    },
    {
        id: '08',
        type: 'Casual leave',
        startDate: '12/08/25',
        endDate: '12/08/25',
        days: '1 Day',
    },
];

export const leaveColumns: ColumnDef<LeaveEntry>[] = [
    {
        header: '#',
        accessorKey: 'id',
    },
    {
        header: 'Leave Type',
        accessorKey: 'type',
    },
    {
        header: 'Start Date',
        accessorKey: 'startDate',
    },
    {
        header: 'End Date',
        accessorKey: 'endDate',
    },
    {
        header: 'No. of days',
        accessorKey: 'days',
    },
    {
        header: 'Action',
        cell: () => (
            <div className="d-flex gap-2">
                <button className="btn btn-sm profile-card-boeder ">
                              <Image src={LightEditimg} alt="Specialization" width={18} height={20} />
                </button>
                <button className="btn btn-sm profile-card-boeder">
                   <Image src={Trash} alt="Specialization" width={18} height={20} />
                </button>
            </div>
        ),
    },
import { Patient } from "./types/interfaces";

export const tableResponse: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];