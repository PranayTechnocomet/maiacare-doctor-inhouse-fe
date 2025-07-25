"use client";
import React, { useState } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "@/utils/redux/store";

function MasterHelper({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Provider store={store}>
    <div className="d-flex">
      <SiteLayout collapsed={collapsed} setCollapsed={setCollapsed}>
        {children}
      </SiteLayout>
    </div>
    </Provider>
  );
}

export default MasterHelper;
