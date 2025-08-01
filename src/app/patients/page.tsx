"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Consultation from "@/components/Consultation";

function Page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderData({ title: "Patients", subtitle: "Patients List" }));
  }, []);

  return (
    <>
      <Consultation />
    </>
  );
}

export default Page;
