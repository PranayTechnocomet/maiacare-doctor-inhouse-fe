"use client";

import { useParams } from "next/navigation";
import InventoryDetailPage from "@/components/inventoryDetailPage";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { consultationData } from "@/utils/StaticData";

export default function inventoryDetailPage() {
    const params = useParams();
    const patientId = params?.id;
    const dispatch: AppDispatch = useDispatch();

    const patient = useMemo(
        () => consultationData.find(p => String(p.id) === String(patientId)),
        [patientId]
    );

    useEffect(() => {
        dispatch(setHeaderData({ title: patient ? patient.name : "Patient Not Found" }));
    }, [patient, dispatch]);

    if (!patient) {
        return <div className="p-4">Patient not found</div>;
    }

    return (
        <div>
            {/* Pass the data to the component */}
            <InventoryDetailPage />
        </div>
    );
}
