"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";

function Page() {
    const dispatch: AppDispatch = useDispatch();
useEffect(() => {
  dispatch(setHeaderData({ title: "Treatment Plan", subtitle: "Treatment Plan" }));
}, []);
  return <div>Treatment Plan</div>;
}

export default Page