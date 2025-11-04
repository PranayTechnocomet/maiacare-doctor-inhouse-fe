"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useEffect } from "react";
import SettingChangePassword from "@/components/SettingChangePassword";
import '@/style/settingsPassword.css'

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Settings", subtitle: "Settings" }));
  }, []);

  return (
    <>
      <SettingChangePassword />

    </>
  );
}

export default Page;

