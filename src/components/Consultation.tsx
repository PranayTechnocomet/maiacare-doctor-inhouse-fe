"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    InputGroup,

    Pagination,
} from "react-bootstrap";
import { consultationData } from "@/utils/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import "@/style/Consultation.css";
import { LuTrash2, LuArrowDown } from "react-icons/lu";
import AppointmentSummaryCards from "@/components/layout/AppointmentSummaryCards";
import Link from "next/link";
import woman from "@/assets/images/woman.png";
import Button from "./ui/Button";

// const statusColor: Record<string, string> = {
//     Completed: "success",
//     Pending: "primary",
//     Scheduled: "info",
//     "No Response": "danger",
//     Rescheduled: "warning",
// };

export type ConsultationStatus =
    | "Completed"
    | "Pending"
    | "Scheduled"
    | "No Response"
    | "Rescheduled"
    | "Cancelled";

export default function Consultation() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");

    const [filteredData, setFilteredData] = useState(consultationData);
    const [searchQuery, setSearchQuery] = useState("");
    const [timeFilter, setTimeFilter] = useState("All Time");


    // const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);
    const handleDownload = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // delete function
    const handleDelete = (id: number) => {
        const updated = filteredData.filter((item) => item.id !== id);
        setFilteredData(updated);
    };


    // useEffect(() => {
    //     if (filter === "completed") {
    //         setFilteredData(consultationData.filter(item => item.status === "Completed"));
    //     } else if (filter === "cancelled") {
    //         setFilteredData(consultationData.filter(item => item.status === "Cancelled"));
    //     } else {
    //         setFilteredData(consultationData);
    //     }
    // }, [filter]);
    useEffect(() => {
        let data = consultationData;

        // 🔹 filter by status (query param)
        if (filter === "completed") {
            data = data.filter((item) => item.status === "Completed");
        } else if (filter === "cancelled") {
            data = data.filter((item) => item.status === "Cancelled");
        }

        // 🔹 filter by search
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            data = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    item.email.toLowerCase().includes(q) ||
                    item.mobile.toLowerCase().includes(q)
            );
        }

        // 🔹 filter by time
        if (timeFilter !== "All Time") {
            const now = new Date();

            data = data.filter((item) => {
                if (!item.date) return false; // skip if no date
                const itemDate = new Date(item.date);
                if (isNaN(itemDate.getTime())) return false;

                if (timeFilter === "Today") {
                    return itemDate.toDateString() === now.toDateString();
                }

                if (timeFilter === "This Week") {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay()); // Sunday
                    weekStart.setHours(0, 0, 0, 0);

                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7); // Next Sunday

                    return itemDate >= weekStart && itemDate < weekEnd;
                }

                if (timeFilter === "This Month") {
                    return (
                        itemDate.getMonth() === now.getMonth() &&
                        itemDate.getFullYear() === now.getFullYear()
                    );
                }

                return true;
            });
        }

        setFilteredData(data);
    }, [filter, searchQuery, timeFilter]);



    const columns: ColumnDef<any>[] = [
        {
            header: "#",
            cell: (info) => {
                const index = info.row.index + 1; // row number start from 1
                return index < 10 ? `0${index}` : index; // format 01,02,03
            },
        },

        {
            header: "Name",
            cell: (info) => {
                const imgSrc = info.row.original.image;
                const name = info.row.original.name;
                const id = info.row.original.id; // <-- Make sure you have an `id`

                return (
                    <Link href={`/patients/${id}`} className="text-decoration-none text-dark">
                        <div className="d-flex align-items-center gap-2">
                            {typeof imgSrc === "string" ? (
                                <img
                                    src={imgSrc}
                                    alt={name}
                                    className="rounded-circle border"
                                    width="36"
                                    height="36"
                                />
                            ) : (
                                <Image
                                    src={imgSrc}
                                    alt={name}
                                    width={36}
                                    height={36}
                                    className="rounded-circle border"
                                />
                            )}
                            {name}
                        </div>
                    </Link>
                );
            },
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
            header: "Pin Code",
            accessorKey: "pin",
        },
        {
            header: "Status",
            cell: (info) => {
                const status = info.row.original.status;
                const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;
                return (
                    <span className={`status-pill ${statusClass}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            header: "Actions",
            cell: (info) => {
                const id = info.row.original.id; // <-- use id directly
                return (
                    <div className="text-center d-flex">
                        <Button
                            variant="light"
                            size="sm"
                            className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
                            onClick={() => handleDownload(`/files/${name}.pdf`, `${name}.pdf`)}
                        >
                            {/* <LuArrowDown className="arrow-down" /> */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2594 3.85684L11.768 0.366217C11.6519 0.250114 11.5141 0.158014 11.3624 0.0951779C11.2107 0.0323417 11.0482 0 10.884 0C10.7198 0 10.5572 0.0323417 10.4056 0.0951779C10.2539 0.158014 10.1161 0.250114 10 0.366217L0.366412 9.99981C0.249834 10.1155 0.157407 10.2531 0.0945056 10.4048C0.0316038 10.5565 -0.000518312 10.7192 6.32418e-06 10.8834V14.3748C6.32418e-06 14.7063 0.131702 15.0243 0.366123 15.2587C0.600543 15.4931 0.918486 15.6248 1.25001 15.6248H14.375C14.5408 15.6248 14.6997 15.559 14.8169 15.4418C14.9342 15.3245 15 15.1656 15 14.9998C15 14.8341 14.9342 14.6751 14.8169 14.5579C14.6997 14.4407 14.5408 14.3748 14.375 14.3748H6.50938L15.2594 5.62481C15.3755 5.50873 15.4676 5.37092 15.5304 5.21925C15.5933 5.06757 15.6256 4.905 15.6256 4.74083C15.6256 4.57665 15.5933 4.41408 15.5304 4.26241C15.4676 4.11073 15.3755 3.97292 15.2594 3.85684ZM4.74141 14.3748H1.25001V10.8834L8.12501 4.0084L11.6164 7.49981L4.74141 14.3748ZM12.5 6.61622L9.00938 3.12481L10.8844 1.24981L14.375 4.74122L12.5 6.61622Z" fill="#2B4360" />
                            </svg>

                        </Button>
                        <Button
                            variant="light"
                            size="sm"
                            className="btn btn-sm profile-card-boeder border bg-white"
                            onClick={() => handleDelete(id)} // <-- pass id
                        >
                            <LuTrash2 className="trash" />
                        </Button>
                    </div>
                );
            },
        }
    ];

    return (
        <div className="">
            {/* Summary Cards */}
            {/* <AppointmentSummaryCards target="patients" /> */}

            {/* Search and Filter */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
                {/* Search Input */}
                <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
                    {/* Search Input */}
                    <InputGroup className="custom-search-group">
                        <Form.Control
                            placeholder="Search"
                            className="custom-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroup.Text className="custom-search-icon">
                            <IoSearch className="search-icon" />
                        </InputGroup.Text>
                    </InputGroup>

                    <div className="border custom-filter-button p-2 consultations-image-summary-cards">
                        <Image src={woman} alt="Total" className="img-fluid women-image" />
                        <div className="consultations-image-book">
                            <div className="Consultations-book">98 Consultations</div>
                        </div>
                    </div>
                </div>

                {/* Sort + Filter */}
                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-muted small short-by">Sort by:</span>
                    <Form.Select
                        className="custom-sort-select"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)} // ✅ update state
                    >
                        <option>All Time</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </Form.Select>
                    <Button variant="light" className="border custom-filter-button">
                        <PiSlidersDuotone />
                    </Button>
                </div>

            </div>

            {/* Table */}
            <CommonTable data={filteredData} columns={columns} />

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <small className="text-muted">Showing {filteredData.length} of {consultationData.length} results</small>
                <Pagination size="sm" className="mb-0">
                    <Pagination.Prev disabled />
                    {[1, 2, 3, 4, 5].map((p) => (
                        <Pagination.Item key={p} active={p === 1}>
                            {p}
                        </Pagination.Item>
                    ))}
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item>99</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </div>
        </div>
    );
}