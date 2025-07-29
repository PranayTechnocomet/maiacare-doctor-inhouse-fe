"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/utils/redux/store";
import { InputFieldGroup } from "@/components/ui/InputField";
import InputSelect from "@/components/ui/InputSelect";
import { DatePickerFieldGroup } from "@/components/ui/CustomDatePicker";
import { RadioButtonGroup } from "@/components/ui/RadioField";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ContentContainer from "@/components/ui/ContentContainer";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";
import Modal from "@/components/ui/Modal";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors List" }));
  }, []);

  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    doctor: "",
    date: "",
    gender: "",
    description: "",
    phone: "",
  });

  return (
    <div>
      <h1>Doctors</h1>
      <ContentContainer>
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
        <InputSelect
          label="Select Doctor"
          name="doctor"
          value={formData.doctor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData({ ...formData, doctor: e.target.value });
          }}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
          required={true}
          disabled={false}
          error="Doctor is required"
          helperText="Select doctor"
          options={[
            { id: "1", value: "1", label: "Doctor 1" },
            { id: "2", value: "2", label: "Doctor 2" },
            { id: "3", value: "3", label: "Doctor 3" },
          ]}
        />
        <DatePickerFieldGroup
          label="Select Date"
          name="date"
          value={formData.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, date: e.target.value });
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
          required={true}
          disabled={false}
          error="Date is required"
          helperText="Select date"
        />

        <RadioButtonGroup
          label="Gender"
          name="gender"
          value={formData.gender}
          defaultValue="male"
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
          required={true}
          disabled={false}
          error="Description is required"
          helperText="Enter description"
          maxLength={500}
        />

        <PhoneNumberInput
          label="Contact Number"
          value={formData.phone}
          onChange={(phone) => setFormData({ ...formData, phone })}
          required
          helperText="Enter a valid number including country code"
        />

        <Button variant="default" disabled={false} onClick={() => setShowModal(true)}>
          Submit
        </Button>
      </ContentContainer>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <h2 className="mb-0">This is modal content</h2>
      </Modal>
    </div>
  );
}

export default Page;
