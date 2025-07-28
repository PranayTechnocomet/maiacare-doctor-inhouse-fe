"use client";
import React from 'react';
import { Modal as BootstrapModal, ModalProps } from 'react-bootstrap';

export default function Modal({
  show = false,
  onHide = () => {},
  size = "lg",
  children,
  className = "",
  centered = true,
  ...props
}: {
  show: boolean;
  onHide?: () => void;
  size?: ModalProps['size'];
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
} & ModalProps) {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      centered={centered}
      size={size}
      className={`maiacare-modal ${className}`}
      {...props}
    >
      {children}
    </BootstrapModal>
  );
}
