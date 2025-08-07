// "use client";

// import { AppDispatch } from "@/utils/redux/store";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setHeaderData } from "@/utils/redux/slices/headerSlice";
// import Consultation from "@/components/Consultation";


// function Page() {
//   const dispatch: AppDispatch = useDispatch();


//   useEffect(() => {
//     dispatch(setHeaderData({ title: "Consultation Bookings ",}));
//   }, []);

//   return (
//     <>
//       <Consultation />
//     </>
//   );
// }

// export default Page;


// ✅ This is a Server Component (no "use client" at the top)
"use client";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { Suspense } from "react";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Consultation from "@/components/Consultation";

export default function PatientsPage() {
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(setHeaderData({ title: "Consultation Bookings ", }));
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading consultations...</div>}>
        <Consultation />
      </Suspense>
    </div>
  );
}



// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setHeaderData } from "@/utils/redux/slices/headerSlice";
// import Consultation from "@/components/Consultation";
// import { AppDispatch } from "@/utils/redux/store";

// export default function PatientsPage() {
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderData({ title: "Consultation Bookings" }));
//   }, []);

//   return <Consultation />;
// }


