"use client";

import { useParams } from "next/navigation";
import PatientDetailPageComponent from "@/components/PatientDetailPage";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";

export default function PatientDetailPage() {
    const params = useParams();
    const patientId = params?.id;
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        dispatch(setHeaderData({ title: "Riya Gupta", }));
    }, []);

    return (
        <div>
            {/* You can log patientId or fetch data */}
            {/* <h4>Patient ID: {patientId}</h4> */}
            <PatientDetailPageComponent />
        </div>
    );
}