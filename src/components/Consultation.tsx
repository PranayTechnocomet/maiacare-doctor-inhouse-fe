"use client";

import React from "react";
import {
    FaSortDown,
    FaCheck,
    FaTrashAlt,
    FaCalendarCheck,
    FaCalendarTimes,
    FaExclamationCircle,
} from "react-icons/fa";
import {
    Card,
    Form,
    InputGroup,
    Badge,
    Button,
    Pagination,
} from "react-bootstrap";
import { consultationData } from "@/utils/StaticData";
import Image from "next/image";
import Frame2 from "@/assets/images/Frame2.png";
import Frame3 from "@/assets/images/Frame3.png";
import Frame1 from "@/assets/images/Frame1.png";
import CommonTable from "@/components/ui/BaseTable";
import ContentContainer from "@/components/ui/ContentContainer";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const statusColor: Record<string, string> = {
    Completed: "success",
    Pending: "primary",
    Scheduled: "info",
    "No Response": "danger",
    Rescheduled: "warning",
};

const statusIcon: Record<string, React.ReactNode> = {
    Completed: <FaCheck className="me-1" />,
    Pending: <FaExclamationCircle className="me-1" />,
    Scheduled: <FaCalendarCheck className="me-1" />,
    "No Response": <FaExclamationCircle className="me-1" />,
    Rescheduled: <FaCalendarTimes className="me-1" />,
};

export default function Consultation() {
    const router = useRouter();

    const handleCardClick = (type: string) => {
        if (type === "cancelled") router.push("/appointments/cancelled");
        else if (type === "rescheduled") router.push("/appointments/rescheduled");
    };

    const columns: ColumnDef<any>[] = [
        {
            header: "#",
            cell: () => "01",
        },
        {
            header: "Name",
            cell: (info) => (
                <div className="d-flex align-items-center gap-2">
                    <img
                        src={info.row.original.image}
                        alt={info.row.original.name}
                        className="rounded-circle border"
                        width="36"
                        height="36"
                    />
                    {info.row.original.name}
                </div>
            ),
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
            cell: (info) => (
                <Badge
                    bg={statusColor[info.row.original.status]}
                    className="d-inline-flex align-items-center px-2 py-1"
                >
                    {statusIcon[info.row.original.status]}
                    {info.row.original.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            cell: () => (
                <div className="text-center">
                    <Button variant="light" size="sm" className="me-1">
                        <FaSortDown />
                    </Button>
                    <Button variant="outline-danger" size="sm">
                        <FaTrashAlt />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="container-fluid py-4 px-3 px-md-4">
            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <ContentContainer className="p-2">
                        <>
                            <Card.Body className="d-flex gap-2 align-items-center">
                                <Image src={Frame1} alt="Total" className="img-fluid lock-image" />
                                <div>
                                    <div className="fs-5 fw-bold">2200</div>
                                    <div className="text-muted small">Total Appointment</div>
                                </div>
                            </Card.Body>
                        </>
                    </ContentContainer>
                </div>

                <div className="col-md-4">
                    <ContentContainer className="p-2">
                        <div
                            className="border-0"
                            onClick={() => handleCardClick("cancelled")}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Body className="d-flex gap-2 align-items-center">
                                <Image src={Frame2} alt="Cancelled" className="img-fluid lock-image" />
                                <div>
                                    <div className="fs-5 fw-bold">2200</div>
                                    <div className="text-muted small">Cancelled Appointment</div>
                                </div>
                            </Card.Body>
                        </div>
                    </ContentContainer>
                </div>

                <div className="col-md-4">
                    <ContentContainer className="p-2">
                        <div
                            className="border-0"
                            onClick={() => handleCardClick("rescheduled")}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Body className="d-flex gap-2 align-items-center">
                                <Image src={Frame3} alt="Rescheduled" className="img-fluid lock-image" />
                                <div>
                                    <div className="fs-5 fw-bold">2200</div>
                                    <div className="text-muted small">Rescheduled Appointment</div>
                                </div>
                            </Card.Body>
                        </div>
                    </ContentContainer>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <InputGroup style={{ maxWidth: 300 }} className="mb-2">
                    <Form.Control placeholder="Search" />
                </InputGroup>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-muted small">Sort by:</span>
                    <Form.Select size="sm" style={{ width: 150 }}>
                        <option>All Time</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </Form.Select>
                </div>
            </div>

            {/* Common Table */}
            <CommonTable data={consultationData} columns={columns} />

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
