import React from 'react'
import { Form } from 'react-bootstrap'

export const InputFieldGroup = ({
    label,
    name,
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    disabled,
    readOnly,
    error,
    helperText,
    
}: {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    readOnly: boolean;
    error: string;
    helperText: string;
}) => {
    return (
  <div className="maiacare-input-field-container">
    <InputFieldLabel label={label} required={required} />
    <InputField name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} required={required} disabled={disabled} readOnly={readOnly} />
    {helperText && <InputFieldHelperText helperText={helperText} />}
    {error && <InputFieldError error={error} />}
  </div> 
    )   
}

export const InputFieldLabel = ({label, required}: {label: string; required: boolean}) => {
    return (
        <Form.Label className="maiacare-input-field-label">{label} {required && <span className="text-danger">*</span>}</Form.Label>
    )
}

export const InputField = ({
    name,
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    disabled,
    readOnly
    
}: {
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    readOnly: boolean;
}) => {
    return (
        <Form.Control className="maiacare-input-field" name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} required={required} disabled={disabled} readOnly={readOnly} />
    )
}

export const InputFieldError = ({error}: {error: string}) => {
    return (
        <div className="maiacare-input-field-error">
            <Form.Text className="text-danger">{error}</Form.Text>
        </div>
    )
}


export const InputFieldHelperText = ({helperText}: {helperText: string}) => {
    return (
        <div className="maiacare-input-field-helper-text">
            <Form.Text className="text-muted">{helperText}</Form.Text>
        </div>
    )
}

