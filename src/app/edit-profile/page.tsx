"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import EditProfile from "../../components/Edit-Profile";

function Page() {
    const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "EditProfile", subtitle: "EditProfile List" }));
  }, []);
  return (
    <EditProfile/>
  );

}

export default Page;