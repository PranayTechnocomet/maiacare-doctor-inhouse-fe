import React from 'react';
import { Container, Button} from 'react-bootstrap';
import BookCalendar from "../../assets/images/BookCalendar.png";
import Image from 'next/image';
import "../../style/profileTabes.css";
import { leaveData, leaveColumns } from "@/utils/StaticData";
import BaseTable from "@/components/ui/BaseTable";


const ManageLeave = () => {
  return (
    <Container fluid className="mt-3">
      <div className="mt-4">
        <div className="p-3">

          {/* Header Row */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-2 mb-md-0 profile-card-main-titile">Leave History</h4>
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <span className="about-text ">Sort by:</span>
                <Button className="bg-white edit-profile-btn">
                  Last 6 Months
                </Button>
              </div>

              <Button className="d-flex align-items-center gap-2 px-2 all-btn-color">
                <Image src={BookCalendar} alt="Specialization" width={22} height={22} />
                Block Calendar
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-4 ">
            <BaseTable data={leaveData} columns={leaveColumns} />
          </div>

        </div>

      </div>
    </Container>
  );
};

export default ManageLeave;