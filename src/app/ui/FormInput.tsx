import React from 'react';
import { useForm } from 'react-hook-form';

interface FormItemProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
}

const FormInput: React.FC<FormItemProps> = ({
  label,
  type,
  placeholder,
  id,
  required,
  minLength,
  maxLength,
  pattern,
  errorMessage,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Custom validation function for the input field
  const validateField = (value: string) => {
    if (required && !value.trim()) {
      return 'This field is required';
    }
    if (minLength && value.length < minLength) {
      return `Minimum ${minLength} characters`;
    }
    if (maxLength && value.length > maxLength) {
      return `Maximum ${maxLength} characters`;
    }
    if (pattern && !pattern.test(value)) {
      return 'Invalid input';
    }
    return undefined; // Indicates validation passed
  };

  return (
    <div className="form-item">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id, { validate: validateField })}
      />
      {/* Display error message if validation fails */}
      {errors[id] && typeof errors[id].message === 'string' && (
        <span className="error-message">{errors[id].message}</span>
      )}
    </div>
  );
};

export default FormInput;
