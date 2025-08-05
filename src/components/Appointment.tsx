"use client";

import React from "react";
import {
    Form,
    InputGroup,
    Button,
    Pagination,
} from "react-bootstrap";
import { completeData } from "@/utils/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import "@/style/Consultation.css"
import { LuTrash2, LuArrowDown } from "react-icons/lu";
import AppointmentSummaryCards from "@/components/layout/AppointmentSummaryCards";


const statusColor: Record<string, string> = {
    Completed: "success",
};

export type ConsultationStatus =
    | "Completed";


export default function Consultation() {


    const columns: ColumnDef<any>[] = [
        {
            header: "#",
            cell: () => "01",
        },
        {
            header: "Name",
            cell: (info) => {
                const imgSrc = info.row.original.image;

                return (
                    <div className="d-flex align-items-center gap-2">
                        {typeof imgSrc === "string" ? (
                            <img
                                src={imgSrc}
                                alt={info.row.original.name}
                                className="rounded-circle border"
                                width="36"
                                height="36"
                            />
                        ) : (
                            <Image
                                src={imgSrc}
                                alt={info.row.original.name}
                                width={36}
                                height={36}
                                className="rounded-circle border"
                            />
                        )}
                        {info.row.original.name}
                    </div>
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
            cell: () => (
                <div className="text-center d-flex">
                    <Button size="sm" className="me-2 border bg-white">
                        <LuArrowDown className="arrow-down" />
                    </Button>
                    <Button className="border bg-white" size="sm">
                        <LuTrash2 className="trash" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="container-fluid py-4 px-3 px-md-4">
            {/* Summary Cards */}
            <AppointmentSummaryCards />

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

            {/* Common Table */}
            <CommonTable data={completeData} columns={columns} />

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <small className="text-muted">Showing 100 of 1,000 results</small>
                <Pagination size="sm" className="mb-0">
                    <Pagination.Prev disabled />
                    {[1, 2, 3, 4, 5].map((p) => (
                        <Pagination.Item key={p} active={p === 5}>
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
