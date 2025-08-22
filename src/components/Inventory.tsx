"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    InputGroup,
    Button,
    Pagination,
} from "react-bootstrap";
import { inventoryData } from "@/utils/StaticData";
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
import AssignScheduleModal from "@/components/layout/AssignScheduleModal"; // adjust path


// const statusColor: Record<string, string> = {
//     Completed: "success",
//     Pending: "primary",
//     Scheduled: "info",
//     "No Response": "danger",
//     Rescheduled: "warning",
// };

export type InventoryDataStatus =
    | "Completed"
    | "Pending"
    | "Scheduled"
    | "No Response"
    | "Rescheduled"
    | "Cancelled";

export default function Inventory() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");

    const [filteredData, setFilteredData] = useState(inventoryData);

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

    const [showAssign, setShowAssign] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

    const handleAssignClick = (doctor: any) => {
        setSelectedDoctor(doctor);
        setShowAssign(true);
    };

    useEffect(() => {
        if (filter === "completed") {
            setFilteredData(inventoryData.filter(item => item.status === "Completed"));
        } else if (filter === "cancelled") {
            setFilteredData(inventoryData.filter(item => item.status === "Cancelled"));
        } else {
            setFilteredData(inventoryData);
        }
    }, [filter]);

    const columns: ColumnDef<any>[] = [
        {
            header: "#",
            cell: () => "01",
        },
        {
            header: "Name",
            cell: (info) => {
                const imgSrc = info.row.original.image;
                const name = info.row.original.name;
                const id = info.row.original.id; // <-- Make sure you have an `id`

                return (
                    <Link href={`/inventory/${id}`} className="text-decoration-none text-dark">
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
            header: "Schedule",
            cell: (info) => {
                const doctor = info.row.original;
                return (
                    <div>
                        <Button
                            className="maiacare-button-small Assign-button"
                            variant="primary"
                            onClick={() => handleAssignClick(doctor)}
                        >
                            Assign
                        </Button>
                    </div>
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
                            size="sm"
                            className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
                            onClick={() => handleDownload(`/files/${name}.pdf`, `${name}.pdf`)}
                        >
                            <LuArrowDown className="arrow-down" />
                        </Button>
                        <Button
                            size="sm"
                            className="btn btn-sm profile-card-boeder border bg-white"
                            onClick={() => handleDelete(id)} // <-- pass id
                        >
                            <LuTrash2 className="trash" />
                        </Button>
                    </div>
                );
            },
        },

    ];

    return (
        <div className="container-fluid py-4 px-3 px-md-4">
            {/* Summary Cards */}
            <AppointmentSummaryCards target="inventory" />

            {/* Search and Filter */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                {/* Search Input */}
                <InputGroup className="mb-2 custom-search-group">
                    <Form.Control
                        placeholder="Search"
                        className="custom-search-input"
                    />
                    <InputGroup.Text className="custom-search-icon">
                        <IoSearch className="search-icon" />
                    </InputGroup.Text>
                </InputGroup>

                {/* Sort + Filter */}
                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-muted small short-by">Sort by:</span>
                    <Form.Select className="custom-sort-select">
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
            {/* Assign Schedule Modal */}
            <AssignScheduleModal
                show={showAssign}
                onHide={() => setShowAssign(false)}
                // doctors={selectedDoctor ? [selectedDoctor] : []}
            />


            {/* Table */}
            <CommonTable data={filteredData} columns={columns} />

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <small className="text-muted">Showing {filteredData.length} of {inventoryData.length} results</small>
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