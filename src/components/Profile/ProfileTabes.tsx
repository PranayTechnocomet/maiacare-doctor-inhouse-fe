import React, { useState } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';
import { Container, Row, Col,  Button, Card } from 'react-bootstrap';

const ProfileTabes = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <Container fluid className="mt-3">
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

      <div className="mt-3">
        {activeTab === 'basic' && (
          <Row>
            {/* Left Column */}


       <Col lg={8} className="mb-3">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body>
          {/* Header with title and plus button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Qualification</h5>
            <Button variant="light" className="rounded border">
              <Plus size={18} />
            </Button>
          </div>

          {/* Each qualification item */}
          {[{ title: 'MD Gynaecology' }, { title: 'MBBS' }].map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center p-3 mb-3 bg-white border rounded-3 shadow-sm"
            >
              <div>
                <div className="fw-semibold">{item.title}</div>
                <div className="text-muted small">Medical University</div>
                <div className="text-muted small">2015 - 2017</div>
              </div>

              <div className="d-flex gap-2">
                <Button variant="light" className="border  p-2">
                  <Pencil size={16} color="#1e3a8a" />
                </Button>
                <Button variant="light" className="border  p-2 ">
                  <Trash size={16} color="#dc3545" />
                </Button>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Col>


          </Row>
        )}

        {activeTab === 'leaves' && (
          <div className="bg-light p-4 rounded">Manage Leaves Content</div>
        )}

        {activeTab === 'Reviews' && (
          <div className="bg-light p-4 rounded">Reviews Content</div>
        )}
      </div>
    </Container>
  );
};

export default ProfileTabes;
