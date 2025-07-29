import React from 'react'
import { Form } from 'react-bootstrap'

export const InputFieldGroup = ({
    label="",
    name,
    type="text",
    value,
    onChange=()=>{},
    onBlur=()=>{},
    onClick=()=>{},
    placeholder="",
    required=false,
    disabled=false,
    readOnly=false,
    error="",
    helperText="",
    className=""    
}: {
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
}) => {
    return (
  <div className={`maiacare-input-field-container ${className}`}>
    <InputFieldLabel label={label} required={required} />
    <InputField name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} onClick={onClick} placeholder={placeholder} required={required} disabled={disabled} readOnly={readOnly} />
    {error && <InputFieldError error={error} />}
    {helperText && <InputFieldHelperText helperText={helperText} />}
  </div> 
    )   
}

export const InputFieldLabel = ({label="", required=false, className=""}: {label?: string; required?: boolean, className?: string}) => {
    return (
        <Form.Label className={`maiacare-input-field-label ${className}`}>{label} {required && <span className="text-danger">*</span>}</Form.Label>
    )
}

export const InputField = ({
    name,
    type="text",
    value,
    onChange=()=>{},
    onBlur=()=>{},
    onClick=()=>{},
    placeholder="",
    required=false,
    disabled=false,
    readOnly=false,
    className=""
    
}: {
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;   
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
}) => {
    return (
        <Form.Control className={`maiacare-input-field ${className}`} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} onClick={onClick} placeholder={placeholder} required={required} disabled={disabled} readOnly={readOnly} />
    )
}

export const InputFieldError = ({error="", className=""}: {error?: string, className?: string}) => {
    return (
        <div className={`${className}`}>
            <Form.Text className="text-danger maiacare-input-field-error">{error}</Form.Text>
        </div>
    )
}


export const InputFieldHelperText = ({helperText="", className=""}: {helperText?: string, className?: string}) => {
    return (
        <div className={`${className}`}>
            <Form.Text className="maiacare-input-field-helper-text">{helperText}</Form.Text>
        </div>
    )
}
