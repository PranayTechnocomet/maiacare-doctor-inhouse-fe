"use client";
import React from 'react'
import { Form } from 'react-bootstrap'
import { InputFieldLabel, InputFieldError, InputFieldHelperText } from './InputField';

export default function InputSelect({
    label="",
    name,
    defaultValue,
    value,
    onChange,
    onBlur,
    onClick,
    required,
    disabled,
    error,
    helperText,
    className,
    options = [],
    placeholder="Select",
    ...rest
}: {
    label?: string;
    name?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLSelectElement>) => void;   
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    options?: { id: string, value: string, label: string }[];
    [key: string]: any;
    placeholder?: string;
}) {
  return (
    <div className={`maiacare-input-field-container ${className}`}>
      {label && <InputFieldLabel label={label} required={required} />}
      <Form.Select
        name={name}
        value={value || defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        // required={required}
        disabled={disabled}
        className={`maiacare-input-field`}
        {...rest}
      >
        <option value={""}>{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>
        ))}
      </Form.Select>
      {error && <InputFieldError error={error} />}
      {helperText && <InputFieldHelperText helperText={helperText} />}
    </div>
  )
}
