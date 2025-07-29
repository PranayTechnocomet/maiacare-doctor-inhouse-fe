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
import BaseTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { IoIosEye } from "react-icons/io";

type Patient = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  treatment: string;
  status: string;
};

const data: Patient[] = [
  {
    id: 1,
    name: 'Meera Joshi',
    mobile: '9092038491',
    email: '----',
    pincode: '400072',
    treatment: 'Fertility Support +2',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Anjali Kapoor',
    mobile: '9092038491',
    email: 'ashok.kumar@gmail.com',
    pincode: '400072',
    treatment: 'IVF',
    status: 'Deactivated',
  },
  // ...add more rows
];

const columns: ColumnDef<Patient>[] = [
  {
    header: '#',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Mobile No',
    accessorKey: 'mobile',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Pincode',
    accessorKey: 'pincode',
  },
  {
    header: 'Treatment Plan',
    accessorKey: 'treatment',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: info => {
      const status = info.getValue() as string;
      return (
        <span
          className={`badge ${
            status === 'Active'
              ? 'bg-primary'
              : status === 'Discontinued'
              ? 'bg-warning'
              : 'bg-danger'
          }`}
        >
          {status}
        </span>
      );
    },
  }
];



export default function Page() {
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
          className="position-relative"
        >
          <div className="position-absolute" style={{top: "44%", right: "0%", transform: "translate(-50%, -50%)"}}>
          <IoIosEye size={25}/>
          </div>
        </InputFieldGroup>
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
          error="Phone number is required"
        />

<div className="d-flex gap-2">
        <Button variant="default" disabled={false} onClick={() => setShowModal(true)}>
          Submit
        </Button>
        <Button variant="outline" disabled={false} onClick={() => setShowModal(true)}>
          Cancel
        </Button>
</div>
      </ContentContainer>

          <div className="my-4">
          <h4>Patient List</h4>
      <BaseTable data={data} columns={columns} />
          </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} header="Modal Header" closeButton={true}>
          <h2 className="mb-0 text-center">This is modal content</h2>
      </Modal>
    </div>
  )
}
