"use client";
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
export default function Button({
    children,
    className="",
    variant="default",
    disabled=false,
    onClick,
    type="button"
}: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}) {
    return (
        <BootstrapButton
            className={`maiacare-button ${variant == "default" ? "default-layout" : variant == "outline" ? "outline-layout" : ""} ${className}`}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {children}
        </BootstrapButton>
    );
}