"use client";
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
export default function Button({
    children,
    className="",
    variant="default",
    disabled=false,
    onClick,
    type="button",
    contentSize="large",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    [key: string]: any;
    contentSize?: "small" | "medium" | "large";
}) {
    return (
        <BootstrapButton
            className={`maiacare-button ${contentSize == "small" ? "maiacare-button-small" : contentSize == "medium" ? "maiacare-button-medium" : "maiacare-button-large"} ${variant == "default" ? "default-layout" : variant == "outline" ? "outline-layout" : ""} ${className}`}
            disabled={disabled}
            onClick={onClick}
            type={type}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
}