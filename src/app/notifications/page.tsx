// src/app/notifications/page.tsx
"use client";
import React from "react";
import NotificationScreen from "@/components/NotificationScreen";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";



export default function NotificationsPage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderData({ title: "Notifications", subtitle: "Search History" }));
  }, []);


  return(
    <>
    <NotificationScreen />
    </>
  ) 
};

