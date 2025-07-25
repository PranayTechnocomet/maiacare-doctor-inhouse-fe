"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/utils/redux/store";
import { InputFieldGroup } from "@/components/ui/InputField";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors List" }));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <h1>Doctors</h1>
      <InputFieldGroup
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, name: e.target.value });
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
        placeholder="Enter name"
        required={true}
        disabled={false}
        readOnly={false}
        error="Name is required"
        helperText="Enter name"
      />
    </div>
  );
}

export default Page;
