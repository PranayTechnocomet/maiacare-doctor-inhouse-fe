"use client";
import React, { useState } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import { Provider } from "react-redux";
import { store } from "@/Hook/Redux/Store/store";
import { usePathname } from "next/navigation";

function MasterHelper({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
const authPages = ["/login", "/register", "/forgotppassword","/resetpassword","/verification"];
  const pathName = usePathname();
  
  return (
    <Provider store={store}>
      {authPages.includes(pathName) ? (
        children //Implement auth layout here 
      ) : (
          <div className="d-flex">
          <SiteLayout collapsed={collapsed} setCollapsed={setCollapsed}>
            {children}
          </SiteLayout>
        </div>
      )}
    </Provider>
  );
}

export default MasterHelper;
