import React, { useEffect, useState } from 'react';
// import { Container} from 'react-bootstrap';
import ProfileManageLeave from "@/components/form/Profile-Manage-Leave";
import ProfileBasicDetails from "@/components/form/Profile-Basic-Details";
import "../style/ProfileTabes.css";
// import ContentContainer from './ui/ContentContainer';
import CustomTabs from './ui/CustomTabs';

const ProfileTabes = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
     <></>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: (
        <></>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      content: (
          <>Reviews</>
      ),
    },

  ];


  return (
    <div className='mt-4'>

      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

    {activeTab === 'basic' && (
          <div>
       <ProfileBasicDetails/>
          </div>
        )}

     {activeTab === 'leaves' && (
          <div>
            <ProfileManageLeave />
          </div>
        )}

    {activeTab === 'Reviews' && (
          <div>Reviews Content</div>
        )}

    </div>




      
  );
};

export default ProfileTabes;
