"use client";
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
export default function Button({
    children,
    className="",
    variant="default",
    disabled=false,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    disabled?: boolean;
    onClick?: () => void;
}) {
    return (
        <BootstrapButton
            className={`maiacare-button ${variant == "default" ? "default-layout" : variant == "outline" ? "outline-layout" : ""} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </BootstrapButton>
    );
}