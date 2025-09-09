"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "@/utils/redux/store";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors List" }));
  }, []);
  return (
    <div>
      <h1 className="font-geist-sans">a Doctors</h1>
    </div>
  );
}

export default Page;  
