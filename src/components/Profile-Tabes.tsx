import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import ProfileManageLeave from "@/components/form/Profile-Manage-Leave";
import ProfileBasicDetails from "@/components/form/Profile-Basic-Details";
import "../style/ProfileTabes.css";

const ProfileTabes = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <Container fluid className="mt-3">

      {/* <ul className="custom-tab nav">
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
            className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaves')}
          >
            Manage Leaves
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('Reviews')}
          >
            Reviews
          </button>
        </li>
      </ul> */}


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
              className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaves')}
            >
              Manage Leaves
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('Reviews')}
            >
              Reviews
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-4">
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

    </Container>
  );
};

export default ProfileTabes;
