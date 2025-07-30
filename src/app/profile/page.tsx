"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Profile from "@/components/Profile";
import ProfileTabes from "@/components/ProfileTabes";

function Page() {
    const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "profile", subtitle: "profile List" }));
  }, []);
  return (
    <div>
      <Profile/>
      <ProfileTabes/>
      </div>
  )
}

export default Page;