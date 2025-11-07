"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Card, Row, Col, } from "react-bootstrap";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Appointments from "../assets/images/Appointments.png";
import ActivePatients from "../assets/images/Active Patients.png";
import NewPatients from "../assets/images/New Patients.png";
import '../style/dashboard.css';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Profiledoctor from "@/assets/images/Profile-doctor.png"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Filler,
    BarElement,
    ArcElement,
    ChartOptions,
    ChartData,
} from "chart.js";
import Image from "next/image";
import { InputSelect } from "./ui/InputSelect";

import dynamic from "next/dynamic";
import { ImOffice } from "react-icons/im";
import ContentContainer from "./ui/ContentContainer";

const LineChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });
const BarChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });
const DoughnutChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Doughnut), { ssr: false });

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Filler,
    BarElement,
    ArcElement
);
interface TreatmentData {
    id: string;
    name: string;
    patients: number;
    successRate: number;
    color: string;
    iconColor: string;
}



// ---------- Interfaces ----------
interface DashboardData {
    appointments: number;
    appointmentsChange: number;
    activePatients: number;
    activePatientsChange: number;
    newPatients: number;
    newPatientsChange: number;
    noShowRate: number;
    noShowRateChange: number;
    patientOverview: { male: number; female: number };
    appointmentData: {
        months: string[];
        ivfTreatment: number[];
        kitTreatment: number[];
        icsiTreatment: number[];
        gametefreezing: number[];
        pgtTesting: number[];
    };
    dropoutData: { labels: string[]; values: number[] };
}

interface WaveChartProps {
    width?: number;
    height?: number;
}
const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {

};

// ---------- WaveChart Component ----------
const WaveChart: React.FC<WaveChartProps> = ({ width = 800, height = 400 }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<ChartJS | null>(null);

    const ivfStages = [
        "Fertility  Assessment",
        "Stimulation",
        "Egg Retrieval",
        "Fertilisation",
        "IVF",
        "Embryo Culture",
        "Embryo Transfer",
        "Pregnancy Test",
    ];

    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        if (chartInstanceRef.current) chartInstanceRef.current.destroy();

        // Generate wave-like values
        const generateWaveData = (): number[] => {
            const points = [];
            const numPoints = 200; // smooth line mate vadhu points

            for (let i = 0; i < numPoints; i++) {
                const x = (i / (numPoints - 1)) * 8 * Math.PI; // 8 stage mate

                // Fertility Assessment → Stimulation
                const wave1 = 20 * Math.sin(x * 0.5) + 20;

                // Stimulation → Egg Retrieval
                const wave2 = 30 * Math.sin(x * 0.6 + 1) + 30;

                // Egg Retrieval → Fertilisation
                const wave3 = 40 * Math.sin(x * 0.7 + 2) + 40;

                // Fertilisation → IVF
                const wave4 = 25 * Math.sin(x * 0.9 + 2) + 20;

                // IVF → Embryo Culture
                const wave5 = 35 * Math.sin(x * 0.8 + 3) + 30;

                // Embryo Culture → Embryo Transfer
                const wave6 = 30 * Math.sin(x * 0.7 + 4) + 25;

                // Embryo Transfer → Pregnancy Test
                const wave7 = 20 * Math.sin(x * 0.5 + 5) + 20;

                points.push(Math.max(0, (wave1 + wave2 + wave3 + wave4 + wave5 + wave6 + wave7) / 7));
            }

            console.log(points);

            return points;
        };

        const waveData = generateWaveData();
        const labels = Array.from({ length: waveData.length }, () => "");

        const chartData: ChartData<"line"> = {

            datasets: [
                {
                    label: "IVF Process Journey",
                    data: waveData,
                    borderColor: "#2c3e50",
                    backgroundColor: "rgba(174, 204, 237, 0.6)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                },
            ],
            labels,
        };

        const chartOptions: ChartOptions<"line"> = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: {
                x: { display: false, grid: { display: false } }, // hide axis, use bottom labels
                y: {
                    beginAtZero: true,
                    max: 140,
                    ticks: { stepSize: 20, color: "#6c757d", font: { size: 12 } },
                    grid: { color: "rgba(0,0,0,0.1)", lineWidth: 1 },
                    border: { display: false },
                },
            },
            animation: { duration: 2000, easing: "easeInOutQuart" },
        };

        chartInstanceRef.current = new ChartJS(ctx, { type: "line", data: chartData, options: chartOptions });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [width, height]);

    return (
        <div className="card shadow-sm">
            <div className="px-3 pt-3 text-center">
                <div className="d-flex align-items-center justify-content-between px-2">
                    <h6 className="mb-0 d-flex align-items-start justify-content-start dashboard-chart-heading">Patient Dropout Rate</h6>

                    <InputSelect
                        className="dashboard-chart-dropdown1 p-0 "
                        name="ivf"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            handleChange(e);
                        }}
                        onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                        required={false}
                        disabled={false}
                        placeholder="IVF"
                        options={[

                            { id: "1", value: "1", label: "IVF1" },
                            { id: "2", value: "2", label: "IVF2" },
                            { id: "3", value: "3", label: "IVF3" },
                        ]}
                    />
                </div>

            </div>

            <div className="card-body px-4">
                <div style={{ height: `${height}px`, width: "100%" }}>
                    <canvas ref={chartRef} className="dashboard-chart-canvas" />
                </div>

                {/* IVF Stages below chart */}
                <div
                    className="d-flex justify-content-between flex-wrap mt-3 patient-journey-chart-details"

                >
                    {ivfStages.map((stage, idx) => (
                        <span key={idx} className="text-center flex-fill patient-journey-charts" >
                            {stage}
                        </span>
                    ))}
                </div>
            </div>


        </div>
    );
};

// ---------- Dashboard Component ----------
const Dashboard: React.FC = () => {
    const [formData, setFormData] = useState<FormData>();
    const initialData = {
        appointments: 18,
        appointmentsChange: 40,
        activePatients: 131,
        activePatientsChange: 25,
        newPatients: 32,
        newPatientsChange: 55,
        noShowRate: 24,
        noShowRateChange: -10,
        patientOverview: { male: 45, female: 55 },
        appointmentData: {
            months: ["Jan", "Feb", "Mar", "Apr"],
            ivfTreatment: [3800, 2600, 3300, 3500],
            kitTreatment: [1900, 3200, 2200, 1600],
            icsiTreatment: [3200, 2400, 1400, 2400],
            gametefreezing: [800, 1200, 800, 1000],
            pgtTesting: [600, 800, 400, 800],
        },
        dropoutData: {
            labels: [
                "Fertility Assessment ",
                "Stimulation",
                "Egg Retrieval",
                "Fertilisation",
                "IVF",
                "Embryo Culture",
                "Embryo Transfer",
                "Pregnancy Test",
            ],
            values: [20, 35, 25, 45, 40, 35, 30, 25],
        },
    };

    const [data, setData] = useState<DashboardData | any>(initialData);


    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev: DashboardData | any) => ({
                ...prev,
                appointments: Math.floor(Math.random() * 50) + 10,
                activePatients: Math.floor(Math.random() * 200) + 100,
                newPatients: Math.floor(Math.random() * 60) + 20,
                noShowRate: Math.floor(Math.random() * 40) + 10,
                appointmentsChange: Math.floor(Math.random() * 100) - 50,
                activePatientsChange: Math.floor(Math.random() * 60) - 30,
                newPatientsChange: Math.floor(Math.random() * 80) - 40,
                noShowRateChange: Math.floor(Math.random() * 40) - 20,
            }));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const formatChange = (change: number) => {
        const isPositive = change >= 0;
        const color = isPositive ? "dashboard-card-green" : "dashboard-card-orange";
        const icon = isPositive ? "↗" : "↘";
        return (
            <span className={color}>
                {icon} {Math.abs(change)}% <span className="dashboard-card-subtitle">last month</span>
            </span>
        );
    };

    const appointmentChartData = {
        labels: data.appointmentData.months,
        datasets: [
            { label: "IVF Treatment", data: data.appointmentData.ivfTreatment, backgroundColor: "#D45F35" },
            { label: "Kit Treatment", data: data.appointmentData.kitTreatment, backgroundColor: "#DB7A57" },
            { label: "ICSI Treatment", data: data.appointmentData.icsiTreatment, backgroundColor: "#E29578" },
            { label: "Gamete Freezing", data: data.appointmentData.gametefreezing, backgroundColor: "#EAAF9A" },
            { label: "PGT Testing", data: data.appointmentData.pgtTesting, backgroundColor: "#F1CABB" },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom", // ✅ this is allowed
                labels: {
                    padding: 30,
                    boxHeight: 10,
                    boxWidth: 10,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            title: {
                display: true,
                // text: "Appointment Overview",
                align: "start", // ✅ "start" | "center" | "end"
            },
        },
    };

    const patientChartData = {
        labels: ["Female", "Male"],
        datasets: [
            {
                data: [data.patientOverview.female, data.patientOverview.male],
                backgroundColor: ["#E29578", "#2B4360"],
                cutout: "70%",
            },
        ],
    };


    const treatmentData: TreatmentData[] = [
        {
            id: 'ivf',
            name: 'IVF',
            patients: 650,
            successRate: 55,
            color: '#5A94D9',
            iconColor: '#5A94D9'
        },
        {
            id: 'gamete',
            name: 'Gamete Freezing',
            patients: 300,
            successRate: 87,
            color: '#F4C47E',
            iconColor: '#F4C47E'
        },
        {
            id: 'icsi',
            name: 'ICSI',
            patients: 450,
            successRate: 66,
            color: '#869BB5',
            iconColor: '#869BB5'
        },
        {
            id: 'pgt',
            name: 'PGT Testing',
            patients: 280,
            successRate: 96,
            color: '#1CB384',
            iconColor: '#1CB384'
        }
    ];

    // 🔹 Instead of patients, now based on successRate
    const totalSuccessRate = treatmentData.reduce((sum, treatment) => sum + treatment.successRate, 0);

    const generateProgressSegments = () => {
        return treatmentData.map((treatment) => {
            const percentage = (treatment.successRate / totalSuccessRate) * 100;
            return {
                ...treatment,
                percentage
            };
        });
    };

    const progressSegments = generateProgressSegments();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    const consultations = [
        {
            name: "Anicka Jain",
            date: "12 May 2024",
            time: "10:00 AM – 10:30 AM",
            tags: ["Fertility Support", "IVF", "IUI"],
            image: Profiledoctor,
            type: "upcoming",
        },
        {
            name: "Arjun Sharma",
            date: "12 May 2024",
            time: "11:00 AM – 11:30 AM",
            tags: ["Fertility Support", "IVF", "IUI"],
            image: Profiledoctor,
            type: "upcoming",
        },
    ];

    const requests = [
        {
            name: "Anicka Jain",
            date: "12 May 2024",
            time: "10:00 AM – 10:30 AM",
            tags: ["Fertility Support", "IVF", "IUI"],
            image: Profiledoctor,
        },
        {
            name: "Arjun Sharma",
            date: "12 May 2024",
            time: "11:00 AM – 11:30 AM",
            tags: ["Fertility Support", "IVF", "IUI"],
            image: Profiledoctor,
        },
    ];


    return (
        <>
            <div className="py-2">
                {/* Top Stats */}
                <Row className="mb-3">

                    <Col md={4}>
                        <Card className="">
                            <Card.Body>
                                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={Appointments} alt="Active Patients" width={38} height={38} className="me-3"></Image>Total Consultations</Card.Title>
                                <h2 className="dashboard-subheader mt-3 mb-0">{data.activePatients}</h2>
                                {formatChange(data.activePatientsChange)}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="">
                            <Card.Body>
                                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={ActivePatients} alt="New Patients" width={38} height={38} className="me-3"></Image>Free Consultations</Card.Title>
                                <h2 className="dashboard-subheader mt-3 mb-0">{data.newPatients}</h2>
                                {formatChange(data.newPatientsChange)}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="">
                            <Card.Body>
                                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={NewPatients} alt="No Show Rate" width={38} height={38} className="me-3"></Image>Paid Consultations</Card.Title>
                                <h2 className="dashboard-subheader mt-3 mb-0">{data.noShowRate}%</h2>
                                {formatChange(data.noShowRateChange)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row className="mb-3">
                    {/* Upcoming Section */}

                    <Col lg={6}>
                        <ContentContainer>
                            <div className="">
                                {/* <h6 className="fw-semibold mb-3">Upcoming Consultations</h6> */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title className="Upcoming-Consultations">Upcoming Consultations</Card.Title>
                                    <div className="patient-journey-up-icon1 border p-2 rounded" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                        </svg>
                                    </div>
                                </div>
                                {consultations.map((item, i) => (

                                    <div className="border p-3 mt-2 rounded-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={item.image.src} width={90} height={90} className="rounded-3" />

                                            <div className="flex-grow-1">
                                                <div className="d-flex consultation-icon-image">
                                                    <div className="mb-1">
                                                        <span className="Upcoming-Consultations-title">{item.name}</span>
                                                    </div>
                                                    <div className="patient-journey-up-icon1 border p-1 rounded" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* <div className="small text-muted">
                  📅 {item.date} &nbsp; | &nbsp; 🕒 {item.time}
                </div> */}

                                                <div className="profile-sub-title mb-1">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 18" fill="none">
                                                            <path d="M12.375 1.1875C12.5076 1.1875 12.6347 1.24022 12.7285 1.33398C12.8223 1.42775 12.875 1.55489 12.875 1.6875V2.3125H14.625C14.9068 2.3125 15.1767 2.42477 15.376 2.62402C15.5752 2.82328 15.6875 3.09321 15.6875 3.375V14.625C15.6875 14.9068 15.5752 15.1767 15.376 15.376C15.1767 15.5752 14.9068 15.6875 14.625 15.6875H3.375C3.09321 15.6875 2.82328 15.5752 2.62402 15.376C2.42477 15.1767 2.3125 14.9068 2.3125 14.625V3.375C2.3125 3.09321 2.42477 2.82328 2.62402 2.62402C2.82328 2.42477 3.09321 2.3125 3.375 2.3125H5.125V1.6875C5.125 1.55489 5.17772 1.42775 5.27148 1.33398C5.36525 1.24022 5.49239 1.1875 5.625 1.1875C5.75761 1.1875 5.88475 1.24022 5.97852 1.33398C6.07228 1.42775 6.125 1.55489 6.125 1.6875V2.3125H11.875V1.6875C11.875 1.55489 11.9277 1.42775 12.0215 1.33398C12.1153 1.24022 12.2424 1.1875 12.375 1.1875ZM3.3125 14.6875H14.6875V6.6875H3.3125V14.6875ZM3.3125 5.6875H14.6875V3.3125H12.875V3.9375C12.875 4.07011 12.8223 4.19725 12.7285 4.29102C12.6347 4.38478 12.5076 4.4375 12.375 4.4375C12.2424 4.4375 12.1153 4.38478 12.0215 4.29102C11.9277 4.19725 11.875 4.07011 11.875 3.9375V3.3125H6.125V3.9375C6.125 4.07011 6.07228 4.19725 5.97852 4.29102C5.88475 4.38478 5.75761 4.4375 5.625 4.4375C5.49239 4.4375 5.36525 4.38478 5.27148 4.29102C5.17772 4.19725 5.125 4.07011 5.125 3.9375V3.3125H3.3125V5.6875Z" fill="#8A8D93" stroke="#8A8D93" stroke-width="0.125" />
                                                        </svg>
                                                        {item.date}</span>
                                                    <span className='ms-2'>
                                                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" className='me-1' xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.5 6.24992C12.5 5.04044 12.149 3.85695 11.4897 2.84297C10.8304 1.82899 9.89103 1.0281 8.78555 0.537431C7.68007 0.0467583 6.45597 -0.112616 5.2617 0.0786373C4.06743 0.269891 2.95432 0.803554 2.05734 1.61491C1.16037 2.42626 0.518085 3.48044 0.208378 4.6496C-0.101328 5.81875 -0.0651477 7.05266 0.312532 8.20166C0.690211 9.35066 1.39316 10.3654 2.33613 11.1228C3.2791 11.8802 4.42158 12.3477 5.625 12.4687V16.2499C5.625 16.4157 5.69085 16.5747 5.80806 16.6919C5.92527 16.8091 6.08424 16.8749 6.25 16.8749C6.41576 16.8749 6.57473 16.8091 6.69194 16.6919C6.80915 16.5747 6.875 16.4157 6.875 16.2499V12.4687C8.4159 12.3119 9.84393 11.5893 10.8829 10.4406C11.9219 9.29192 12.4981 7.79879 12.5 6.24992ZM6.25 11.2499C5.26109 11.2499 4.29439 10.9567 3.47215 10.4073C2.6499 9.85787 2.00904 9.07697 1.6306 8.16334C1.25216 7.24971 1.15315 6.24438 1.34607 5.27447C1.539 4.30457 2.0152 3.41365 2.71447 2.71439C3.41373 2.01513 4.30464 1.53892 5.27455 1.346C6.24445 1.15307 7.24979 1.25209 8.16342 1.63053C9.07705 2.00897 9.85794 2.64983 10.4073 3.47207C10.9568 4.29432 11.25 5.26102 11.25 6.24992C11.2486 7.57556 10.7213 8.84649 9.78394 9.78386C8.84657 10.7212 7.57564 11.2485 6.25 11.2499Z" fill="#8A8D93" />
                                                        </svg>
                                                        {item.time}</span>
                                                </div>

                                                <div className="mt-2 d-flex gap-2 flex-wrap ">
                                                    {item.tags.map((t, index) => (
                                                        <span key={index} className="badge rounded-pill box-border-orange border-box-orange-font">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex mt-3 gap-2">
                                            {/* <button className="btn btn-outline-secondary rounded-pill w-50">Reschedule</button>
              <button className="btn btn-primary rounded-pill w-50">Start Consultation</button> */}
                                            <Button className="w-50" variant="outline" disabled={false}>
                                                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                    <path d="M9.375 4.06253V7.28206L12.0445 8.88362C12.1525 8.94572 12.247 9.02871 12.3225 9.12774C12.398 9.22677 12.453 9.33986 12.4844 9.46039C12.5157 9.58093 12.5227 9.7065 12.505 9.82977C12.4872 9.95303 12.4451 10.0715 12.3811 10.1783C12.317 10.2852 12.2323 10.3781 12.132 10.4519C12.0316 10.5256 11.9175 10.5786 11.7964 10.6077C11.6754 10.6368 11.5497 10.6416 11.4268 10.6216C11.3038 10.6017 11.1861 10.5574 11.0805 10.4914L7.95547 8.61643C7.81659 8.53318 7.70164 8.41537 7.62182 8.27449C7.542 8.1336 7.50003 7.97445 7.5 7.81253V4.06253C7.5 3.81389 7.59877 3.57543 7.77459 3.39961C7.9504 3.2238 8.18886 3.12503 8.4375 3.12503C8.68614 3.12503 8.9246 3.2238 9.10041 3.39961C9.27623 3.57543 9.375 3.81389 9.375 4.06253ZM8.4375 2.57408e-05C7.41023 -0.00261939 6.39265 0.198622 5.44371 0.592089C4.49478 0.985555 3.63336 1.56342 2.90938 2.29221C2.54297 2.66253 2.20625 3.02424 1.875 3.38596V2.81253C1.875 2.56389 1.77623 2.32543 1.60041 2.14961C1.4246 1.9738 1.18614 1.87503 0.9375 1.87503C0.68886 1.87503 0.450403 1.9738 0.274587 2.14961C0.0987721 2.32543 0 2.56389 0 2.81253V5.93753C0 6.18617 0.0987721 6.42462 0.274587 6.60044C0.450403 6.77625 0.68886 6.87503 0.9375 6.87503H4.0625C4.31114 6.87503 4.5496 6.77625 4.72541 6.60044C4.90123 6.42462 5 6.18617 5 5.93753C5 5.68889 4.90123 5.45043 4.72541 5.27461C4.5496 5.0988 4.31114 5.00003 4.0625 5.00003H2.95078C3.35938 4.53128 3.77891 4.07971 4.23906 3.61409C5.06419 2.78873 6.11425 2.22483 7.25804 1.99288C8.40183 1.76092 9.58862 1.87119 10.6701 2.30991C11.7516 2.74862 12.6798 3.49633 13.3387 4.45958C13.9976 5.42284 14.3581 6.55892 14.375 7.72587C14.3919 8.89282 14.0645 10.0389 13.4338 11.0208C12.8031 12.0028 11.8969 12.7771 10.8286 13.2469C9.76032 13.7168 8.57723 13.8614 7.4272 13.6627C6.27717 13.464 5.2112 12.9308 4.3625 12.1297C4.18161 11.959 3.94031 11.8671 3.69168 11.8743C3.44305 11.8815 3.20745 11.9871 3.03672 12.168C2.86599 12.3489 2.7741 12.5902 2.78128 12.8388C2.78846 13.0874 2.89411 13.323 3.075 13.4938C4.00236 14.3691 5.12992 15.0042 6.35921 15.3435C7.5885 15.6827 8.88216 15.7159 10.1272 15.4401C11.3723 15.1644 12.5309 14.588 13.502 13.7613C14.473 12.9347 15.2269 11.8829 15.6979 10.6978C16.1689 9.51268 16.3426 8.2303 16.2038 6.96262C16.0651 5.69493 15.6182 4.48048 14.902 3.42529C14.1859 2.37011 13.2223 1.50627 12.0955 0.909204C10.9686 0.312137 9.71275 -6.95695e-06 8.4375 2.57408e-05Z" fill="#2B4360" />
                                                </svg>
                                                Reschedule
                                            </Button>
                                            <Button className="w-50" variant="default" disabled={false} type="submit">
                                                Start Consultation
                                            </Button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </ContentContainer>
                    </Col>

                    {/* Request Section */}
                    <Col lg={6}>
                        <ContentContainer className="">
                            {/* <h6 className=" mb-3 Upcoming-Consultations">Consultations Request</h6> */}
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title className="Upcoming-Consultations">Consultations Request</Card.Title>
                                <div className="patient-journey-up-icon1 border p-2 rounded" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                    </svg>
                                </div>
                            </div>
                            {requests.map((item, i) => (
                                <div className="" key={i}>
                                    <div className="border p-3 mt-2 rounded-3">
                                        <div className="d-flex align-items-center gap-3">
                                            {/* <img src={item.image} width={55} height={55} className="rounded" /> */}
                                            <img src={item.image.src} width={90} height={90} className="rounded-3" />
                                            <div className="flex-grow-1">
                                                {/* <h6 className="fw-semibold mb-1">{item.name}</h6> */}
                                                <div className="d-flex consultation-icon-image">
                                                    <div className="mb-1">
                                                        <span className="Upcoming-Consultations-title">{item.name}</span>
                                                    </div>
                                                    <div className="patient-journey-up-icon1 border p-1 rounded" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* <div className="small text-muted">
                                                    📅 {item.date} &nbsp; | &nbsp; 🕒 {item.time}
                                                </div> */}

                                                <div className="profile-sub-title mb-1">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 18" fill="none">
                                                            <path d="M12.375 1.1875C12.5076 1.1875 12.6347 1.24022 12.7285 1.33398C12.8223 1.42775 12.875 1.55489 12.875 1.6875V2.3125H14.625C14.9068 2.3125 15.1767 2.42477 15.376 2.62402C15.5752 2.82328 15.6875 3.09321 15.6875 3.375V14.625C15.6875 14.9068 15.5752 15.1767 15.376 15.376C15.1767 15.5752 14.9068 15.6875 14.625 15.6875H3.375C3.09321 15.6875 2.82328 15.5752 2.62402 15.376C2.42477 15.1767 2.3125 14.9068 2.3125 14.625V3.375C2.3125 3.09321 2.42477 2.82328 2.62402 2.62402C2.82328 2.42477 3.09321 2.3125 3.375 2.3125H5.125V1.6875C5.125 1.55489 5.17772 1.42775 5.27148 1.33398C5.36525 1.24022 5.49239 1.1875 5.625 1.1875C5.75761 1.1875 5.88475 1.24022 5.97852 1.33398C6.07228 1.42775 6.125 1.55489 6.125 1.6875V2.3125H11.875V1.6875C11.875 1.55489 11.9277 1.42775 12.0215 1.33398C12.1153 1.24022 12.2424 1.1875 12.375 1.1875ZM3.3125 14.6875H14.6875V6.6875H3.3125V14.6875ZM3.3125 5.6875H14.6875V3.3125H12.875V3.9375C12.875 4.07011 12.8223 4.19725 12.7285 4.29102C12.6347 4.38478 12.5076 4.4375 12.375 4.4375C12.2424 4.4375 12.1153 4.38478 12.0215 4.29102C11.9277 4.19725 11.875 4.07011 11.875 3.9375V3.3125H6.125V3.9375C6.125 4.07011 6.07228 4.19725 5.97852 4.29102C5.88475 4.38478 5.75761 4.4375 5.625 4.4375C5.49239 4.4375 5.36525 4.38478 5.27148 4.29102C5.17772 4.19725 5.125 4.07011 5.125 3.9375V3.3125H3.3125V5.6875Z" fill="#8A8D93" stroke="#8A8D93" stroke-width="0.125" />
                                                        </svg>
                                                        {item.date}</span>
                                                    <span className='ms-2'>
                                                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" className='me-1' xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.5 6.24992C12.5 5.04044 12.149 3.85695 11.4897 2.84297C10.8304 1.82899 9.89103 1.0281 8.78555 0.537431C7.68007 0.0467583 6.45597 -0.112616 5.2617 0.0786373C4.06743 0.269891 2.95432 0.803554 2.05734 1.61491C1.16037 2.42626 0.518085 3.48044 0.208378 4.6496C-0.101328 5.81875 -0.0651477 7.05266 0.312532 8.20166C0.690211 9.35066 1.39316 10.3654 2.33613 11.1228C3.2791 11.8802 4.42158 12.3477 5.625 12.4687V16.2499C5.625 16.4157 5.69085 16.5747 5.80806 16.6919C5.92527 16.8091 6.08424 16.8749 6.25 16.8749C6.41576 16.8749 6.57473 16.8091 6.69194 16.6919C6.80915 16.5747 6.875 16.4157 6.875 16.2499V12.4687C8.4159 12.3119 9.84393 11.5893 10.8829 10.4406C11.9219 9.29192 12.4981 7.79879 12.5 6.24992ZM6.25 11.2499C5.26109 11.2499 4.29439 10.9567 3.47215 10.4073C2.6499 9.85787 2.00904 9.07697 1.6306 8.16334C1.25216 7.24971 1.15315 6.24438 1.34607 5.27447C1.539 4.30457 2.0152 3.41365 2.71447 2.71439C3.41373 2.01513 4.30464 1.53892 5.27455 1.346C6.24445 1.15307 7.24979 1.25209 8.16342 1.63053C9.07705 2.00897 9.85794 2.64983 10.4073 3.47207C10.9568 4.29432 11.25 5.26102 11.25 6.24992C11.2486 7.57556 10.7213 8.84649 9.78394 9.78386C8.84657 10.7212 7.57564 11.2485 6.25 11.2499Z" fill="#8A8D93" />
                                                        </svg>
                                                        {item.time}</span>
                                                </div>

                                                <div className="mt-2 d-flex gap-2 flex-wrap ">
                                                    {item.tags.map((t, index) => (
                                                        <span key={index} className="badge rounded-pill box-border-orange border-box-orange-font">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex mt-3 gap-2">
                                            <button className="btn btn-outline-danger  w-50">
                                                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 11 11" fill="none">
                                                    <path d="M10.2826 9.22193C10.4234 9.36282 10.5026 9.55392 10.5026 9.75318C10.5026 9.95243 10.4234 10.1435 10.2826 10.2844C10.1417 10.4253 9.95056 10.5045 9.7513 10.5045C9.55204 10.5045 9.36095 10.4253 9.22005 10.2844L5.25193 6.31505L1.28255 10.2832C1.14165 10.4241 0.950558 10.5032 0.751301 10.5032C0.552044 10.5032 0.360947 10.4241 0.220051 10.2832C0.0791548 10.1423 2.96917e-09 9.95118 0 9.75193C-2.96917e-09 9.55267 0.0791548 9.36157 0.220051 9.22068L4.18943 5.25255L0.221301 1.28318C0.0804046 1.14228 0.00125003 0.951183 0.00125003 0.751926C0.00125003 0.552669 0.0804046 0.361572 0.221301 0.220676C0.362197 0.0797797 0.553293 0.000624897 0.752551 0.000624895C0.951808 0.000624893 1.1429 0.0797797 1.2838 0.220676L5.25193 4.19005L9.2213 0.220051C9.3622 0.0791546 9.55329 -3.31963e-09 9.75255 0C9.95181 3.31963e-09 10.1429 0.0791546 10.2838 0.220051C10.4247 0.360947 10.5039 0.552043 10.5039 0.751301C10.5039 0.950558 10.4247 1.14165 10.2838 1.28255L6.31443 5.25255L10.2826 9.22193Z" fill="#E85966" />
                                                </svg>
                                                Decline</button>
                                            <button className="btn btn-outline-success   w-50">
                                                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                                    <path d="M14.5306 5.03057L6.5306 13.0306C6.46092 13.1005 6.37813 13.156 6.28696 13.1938C6.1958 13.2317 6.09806 13.2512 5.99935 13.2512C5.90064 13.2512 5.8029 13.2317 5.71173 13.1938C5.62057 13.156 5.53778 13.1005 5.4681 13.0306L1.9681 9.53057C1.89833 9.4608 1.84299 9.37798 1.80524 9.28683C1.76748 9.19568 1.74805 9.09798 1.74805 8.99932C1.74805 8.90066 1.76748 8.80296 1.80524 8.71181C1.84299 8.62066 1.89833 8.53783 1.9681 8.46807C2.03786 8.3983 2.12069 8.34296 2.21184 8.30521C2.30299 8.26745 2.40069 8.24802 2.49935 8.24802C2.59801 8.24802 2.69571 8.26745 2.78686 8.30521C2.87801 8.34296 2.96083 8.3983 3.0306 8.46807L5.99997 11.4374L13.4693 3.96932C13.6102 3.82842 13.8013 3.74927 14.0006 3.74927C14.1999 3.74927 14.391 3.82842 14.5318 3.96932C14.6727 4.11021 14.7519 4.30131 14.7519 4.50057C14.7519 4.69983 14.6727 4.89092 14.5318 5.03182L14.5306 5.03057Z" fill="#2ECF98" />
                                                </svg>
                                                Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ContentContainer>
                    </Col>
                </Row>


                {/* Charts */}
                <Row className="mb-4">

                    <Col lg={4}>
                        <Card className="h-100 ">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title className="dashboard-chart-heading">Patient Overview</Card.Title>
                                    <div className="patient-journey-up-icon1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                        </svg>
                                    </div>
                                </div>
                                <div >
                                    <DoughnutChart data={patientChartData} options={{ responsive: true }} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col lg={8}>
                        <WaveChart height={400} />
                        
                    </Col> */}

                    <Col lg={8}>
                        <Card
                            className="h-100 border-0 shadow-sm"
                            style={{
                                borderRadius: "16px",
                                backgroundColor: "#FFFFFF",
                            }}
                        >
                            <Card.Body className="p-4">
                                {/* Title and Expand Icon */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Card.Title
                                        className="fw-semibold mb-0"
                                        style={{ color: "#1F2937" }}
                                    >
                                        Patient Age Distribution
                                    </Card.Title>
                                    <div className="patient-journey-up-icon1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="d-flex align-items-center gap-4 mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <span
                                            className="rounded-circle d-inline-block"
                                            style={{ width: 10, height: 10, backgroundColor: "#70AAA4" }}
                                        ></span>
                                        <span className="text-muted small" style={{ fontSize: "13px" }}>
                                            Male
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span
                                            className="rounded-circle d-inline-block"
                                            style={{ width: 10, height: 10, backgroundColor: "#E29578" }}
                                        ></span>
                                        <span className="text-muted small" style={{ fontSize: "13px" }}>
                                            Female
                                        </span>
                                    </div>
                                </div>

                                {/* Chart */}
                                <div style={{ width: "100%", height: "320px" }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { age: "25 - 29", male: 85, female: 0 },
                                                { age: "30 - 34", male: 20, female: 60 },
                                                { age: "35 - 39", male: 60, female: 90 },
                                                { age: "40 - 44", male: 80, female: 40 },
                                                { age: "45 - 49", male: 75, female: 80 },
                                                { age: "50+", male: 20, female: 50 },
                                            ]}
                                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                        >
                                            {/* Gradient Fill */}
                                            <defs>
                                                <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#70AAA4" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#70AAA4" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#E29578" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#E29578" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            {/* Background Grid */}
                                            <CartesianGrid
                                                stroke="#E5E7EB"
                                                strokeDasharray="0"
                                                horizontal={true}
                                                vertical={false}
                                            />

                                            {/* X and Y Axis */}
                                            <XAxis
                                                dataKey="age"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                                                padding={{ left: 30, }}
                                            />
                                            <YAxis
                                                ticks={[0, 15, 30, 45, 60, 75, 90, 105]}
                                                domain={[0, 105]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                                            />

                                            {/* Tooltip */}
                                            <Tooltip
                                                cursor={false}
                                                contentStyle={{
                                                    backgroundColor: "#FFFFFF",
                                                    border: "1px solid #E5E7EB",
                                                    borderRadius: "8px",
                                                    fontSize: "12px",
                                                }}
                                            />

                                            {/* Area Lines */}
                                            <Area
                                                type="monotone"
                                                dataKey="male"
                                                stroke="#70AAA4"
                                                fill="url(#colorMale)"
                                                fillOpacity={1}
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="female"
                                                stroke="#E29578"
                                                fill="url(#colorFemale)"
                                                fillOpacity={1}
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* <Row>
                    <Col lg={8}>
                        <Card>
                            <Card.Body>

                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title className="dashboard-chart-heading">Appointment Overview</Card.Title>
                                    <div className="patient-journey-up-icon1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="appointment-overview-charts">
                                    <Bar data={appointmentChartData} options={options} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                  
                </Row> */}
            </div>






        </>
    );
};

export default Dashboard;
