"use client";
import React, { useEffect, useState } from 'react';
import Editbasicdetails from './form/Edit-Basic-Details';
import Editkycdetails from './form/Edit-Kyc-Details';
import "../style/Edit-Profile.css";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<string>('defaultTab');

  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);


    return (
        <div>
            <div className="tab-scroll-container">
                <ul className="custom-tab nav">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                            onClick={() => setActiveTab('basic')}
                        >
                            Basic Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'KYC' ? 'active' : ''}`}
                            onClick={() => setActiveTab('KYC')}
                        >
                            KYC Details
                        </button>
                    </li>
                </ul>
            </div>


   <div className="mt-4">
        {activeTab === 'basic' && (
          <div>
  <Editbasicdetails/>
          </div>
        )}

        {activeTab === 'KYC' && (
          <div>
   <Editkycdetails/>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div>Reviews Content</div>
        )}
      </div>

        </div>
      

      

    )

}
export default EditProfile;