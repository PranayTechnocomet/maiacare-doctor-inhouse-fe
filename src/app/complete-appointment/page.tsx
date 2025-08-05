"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Appointment from "@/components/Appointment";

function Page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderData({ title: "Consultation Bookings ",}));
  }, []);

  return (
    <>
      <Appointment/>
    </>
  );
}

export default Page;
