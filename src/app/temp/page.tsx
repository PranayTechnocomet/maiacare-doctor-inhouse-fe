"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AppDispatch } from "@/utils/redux/store";
import {
  InputFieldGroup,
  InputFieldHelperText,
} from "@/components/ui/InputField";
import InputSelect from "@/components/ui/InputSelect";
import { DatePickerFieldGroup } from "@/components/ui/CustomDatePicker";
import { RadioButtonGroup } from "@/components/ui/RadioField";

import Button from "@/components/ui/Button";
import ContentContainer from "@/components/ui/ContentContainer";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";
import Modal from "@/components/ui/Modal";
import BaseTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { IoIosEye } from "react-icons/io";
import { Patient } from "@/utils/types/interfaces";
import { tableResponse } from "@/utils/StaticData";
import Textarea from "@/components/ui/Textarea";
import CustomTabs from "@/components/ui/CustomTabs";
import { TimePickerFieldGroup } from "@/components/ui/CustomTimePicker";

const data: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];

const columns: ColumnDef<Patient>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Mobile No",
    accessorKey: "mobile",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Pincode",
    accessorKey: "pincode",
  },
  {
    header: "Treatment Plan",
    accessorKey: "treatment",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <span
          className={`badge ${
            status === "Active"
              ? "bg-primary"
              : status === "Discontinued"
              ? "bg-warning"
              : "bg-danger"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

// Types for form data and form error
type FormData = {
  name: string;
  doctor: string;
  date: string;
  gender: string;
  description: string;
  phone: string;
  startTime: string;
  endTime: string;
};

type FormError = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  doctor: "",
  date: "",
  gender: "",
  description: "",
  phone: "",
  startTime: "",
  endTime: "",
};

const initialFormError: FormError = {};

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(
      setHeaderData({
        title: "Sample Page",
        subtitle: "Sample Page for check common components",
      })
    );
    setTableData(tableResponse);
    setLoading(false);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  

  // Validation Function
  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.doctor.trim()) errors.doctor = "Doctor name is required";
    if (!data.date) errors.date = "Date is required";
    if (!data.gender) errors.gender = "Gender is required";

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.description.trim())
      errors.description = "Description is required";

    if (!data.startTime.trim()) errors.startTime = "Start time is required";
    if (!data.endTime.trim()) errors.endTime = "End time is required";

    return errors;
  };

  // Handle form field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  // Submit Handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
      setFormError(initialFormError);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <ContentContainer className="mt-5">
          <h1>Basic Details</h1>
        </ContentContainer>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: (
        <ContentContainer className="mt-5">
          <h1>Leaves Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "xyz",
      label: "Xyz",
      content: (
        <ContentContainer className="mt-5">
          <h1>XYZ</h1>
        </ContentContainer>
      ),
    },
    {
      key: "abc",
      label: "ABC",
      content: (
        <ContentContainer className="mt-5">
          <h1>ABC</h1>
        </ContentContainer>
      ),
    },
    {
      key: "de",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <ContentContainer>
        <InputFieldGroup
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
          placeholder="Enter name"
          required={false}
          disabled={false}
          readOnly={true}
          error={formError.name}
          helperText="Enter name"
          className="position-relative xyz"
        >
          <div className="position-absolute abc">
            <IoIosEye size={25} />
          </div>
        </InputFieldGroup>
        <InputSelect
          label="Select Doctor"
          name="doctor"
          value={formData.doctor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
          required={true}
          disabled={false}
          error={formError.doctor}
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
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
          required={true}
          disabled={false}
          error={formError.date}
          helperText="Select date"
        />

        <RadioButtonGroup
          label="Gender"
          name="gender"
          value={formData.gender}
          defaultValue="male"
          onChange={(e) => handleChange(e)}
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
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
          required={true}
          disabled={false}
          error={formError.description}
          helperText="Enter description"
          maxLength={500}
        />

        <PhoneNumberInput
          label="Contact Number"
          value={formData.phone}
          onChange={(phone: any) => {
            // setFormData((prev) => ({ ...prev, phone }));
            // setFormError((prev) => ({ ...prev, phone: "" }));
            handleChange({
              target: { name: "phone", value: phone },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          required
          helperText="Enter a valid number including country code"
          error={formError.phone}
        />
        <TimePickerFieldGroup
          label="Start Time"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          error={formError.startTime}
        />

        <TimePickerFieldGroup
          label="End Time"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          helperText="Enter operational end time"
        />

        <div className="d-flex gap-2">
          <Button variant="default" disabled={false} type="submit">
            Submit
          </Button>
          <Button variant="outline" disabled={false} onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </ContentContainer>

      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      <div className="my-4">
        <h4>Patient List</h4>
        <BaseTable data={tableData} columns={columns} />
      </div>

      <InputFieldHelperText helperText="Helper Text" />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        header="Modal Header"
        closeButton={true}
      >
        <h2 className="mb-0 text-center">Form Submitted Successfully</h2>
      </Modal>
    </form>
  );
}
