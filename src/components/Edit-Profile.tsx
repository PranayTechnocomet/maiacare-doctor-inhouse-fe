"use client";
import React, { useEffect, useState } from 'react';
import Editbasicdetails from './form/Edit-Basic-Details';
import Editkycdetails from './form/Edit-Kyc-Details';
import "../style/Edit-Profile.css";
import CustomTabs from './ui/CustomTabs';
// import ContentContainer from './ui/ContentContainer';




const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  
  
    const handleNextClick = () => {
      setActiveTab("KYC");
    };
    
  const handlePrevious = () => {
    setActiveTab("basic");
  };


  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <></>
      ),
    },

    {
      key: "KYC",
      label: "KYC Details",
      content: (
        <></>
      ),
    },
    {
      key: "Clinic",
      label: "Clinic Details",
      content: (
        <></>
      ),
    },
  ];

  return (

    <div>

      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      {activeTab === 'basic' && (
        <div>
          <Editbasicdetails onNext={handleNextClick} />
        </div>
      )}

      {activeTab === 'KYC' && (
        <div>
          <Editkycdetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}

    </div>



  )

}
export default EditProfile;