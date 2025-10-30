import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import BookCalendar from "../../assets/images/BookCalendar.png";
import Image from 'next/image';
import {
  leaveData as defaultLeaveData,
  leaveColumns as defaultLeaveColumns,
  LeaveEntry,
} from "@/utils/StaticData";
import BaseTable from "@/components/ui/BaseTable";
import Trash from "../../assets/images/Trash.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Button from '../ui/Button';

const ManageLeave = () => {

  const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);

  // delete function
  const handleDelete = (id: string) => {
    const updated = leaveData.filter((item) => item.id !== id);
    setLeaveData(updated);
  };


  const leaveColumns = [
    ...defaultLeaveColumns,
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="d-flex gap-2 profile-icon-border">
          {/* Edit Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small">
            <Image src={LightEditimg} alt="Edit" width={18} height={20} />
          </Button>

          {/* Delete Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small" onClick={() => handleDelete(row.original.id)}>
            <Image src={Trash} alt="Delete" width={18} height={20} />
          </Button>
        </div>
      ),
    },
  ];

  return (
   
      <div className="mt-4">
          {/* Header Row */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-2 mb-md-0 profile-card-main-titile">Leave History</h4>
            <div className="d-flex align-items-center flex-wrap gap-2 maiacare-button-large">
              <div className="d-flex align-items-center gap-2 profile-icon-border">
                <span className="about-text ">Sort by:</span>
                <Button className="" variant="outline" contentSize="medium">
                  Last 6 Months
                </Button>
              </div>

              <Button className="d-flex align-items-center gap-2 " variant="default" contentSize="medium">
                <Image src={BookCalendar} alt="Specialization" width={20} height={20} />
                Block Calendar
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-4">
            <BaseTable data={leaveData} columns={leaveColumns} />
          </div>

        </div>

 

  );
};

export default ManageLeave;