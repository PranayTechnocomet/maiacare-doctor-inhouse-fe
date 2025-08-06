"use client";
import React from 'react';
import { Modal as BootstrapModal, ModalProps } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';

export default function Modal({
  show = false,
  onHide = () => {},
  size = "lg",
  children,
  className = "",
  header="",
  closeButton = true,
  centered = true,
  ...props
}: {
  show: boolean;
  onHide?: () => void;
  size?: 'sm' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  header?: React.ReactNode;
  closeButton?: boolean;
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
      <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3 mb-lg-4">
        <div className="modal-custom-header">
          {header}
        </div>
        {closeButton && (
        <div className='modal-close-icon' onClick={onHide}>
        <IoCloseOutline className="cursor-pointer" size={20} />
        </div>
        )}
      </div>
      {children}
    </BootstrapModal>
  );
}
