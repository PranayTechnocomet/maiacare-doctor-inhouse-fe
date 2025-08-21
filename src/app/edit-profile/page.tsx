"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import EditProfile from "../../components/Edit-Profile";

function Page() {
    const dispatch: AppDispatch = useDispatch();

    
  useEffect(() => {
    dispatch(setHeaderData({ title: "EditProfile", subtitle: "profile > EditProfile " }));
  }, []);
  
  return (
        <Suspense fallback={<div>Loading...</div>}>
          <EditProfile/>
        </Suspense>
    
  );

}

export default Page;