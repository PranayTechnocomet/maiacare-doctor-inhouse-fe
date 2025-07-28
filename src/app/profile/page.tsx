"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Profile from "@/components/Profile/Profile";

function Page() {
    const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "profile", subtitle: "profile List" }));
  }, []);
  return (
    <div>
      <Profile/>
      </div>
  )
}

export default Page;