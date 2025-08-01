"use client";
import React, { useState } from 'react';
import Editbasicdetails from './form/Edit-Basic-Details';

const EditProfile = () => {
    const [activeTab, setActiveTab] = useState('basic');
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
          shruti
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