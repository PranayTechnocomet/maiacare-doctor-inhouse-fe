"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import AppointmentPatientDetailPage from "@/components/AppointmentPatientDetailPage";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Appointments", subtitle: "Appointments List" }));
  }, []);
  return (
    <div>
      {/* Pass the data to the component */}
      <AppointmentPatientDetailPage />
    </div>
  )
}

export default Page;