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

import { Suspense } from "react";
import Consultation from "@/components/Consultation";

export default function PatientsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading consultations...</div>}>
        <Consultation />
      </Suspense>
    </div>
  );
}
